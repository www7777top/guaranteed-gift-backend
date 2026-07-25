const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Логин/пароль для админ-панели — задай свои через переменные окружения на Render!
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'change-me-123';

// Токен бота (получи у @BotFather) и секрет для проверки вебхука Telegram
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'change-me-webhook-secret';
const GIFT_CATEGORY = process.env.GIFT_CATEGORY || 'NFT-подарки';

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'products.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

function readProducts() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
  catch (e) { return []; }
}
function writeProducts(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}
function addProduct(product) {
  const products = readProducts();
  products.push(product);
  writeProducts(products);
  return product;
}

// Получить прямую ссылку на файл, который прислал Telegram (по file_id)
async function tgFileUrl(fileId) {
  if (!fileId || !BOT_TOKEN) return null;
  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
    const data = await r.json();
    if (!data.ok) return null;
    return `https://api.telegram.org/file/bot${BOT_TOKEN}/${data.result.file_path}`;
  } catch (e) {
    console.error('tgFileUrl error:', e.message);
    return null;
  }
}

// rarity_per_mille (промилле, 1000 = 100%) -> проценты
function toPercent(permille) {
  return permille === undefined || permille === null ? undefined : Math.round((permille / 10) * 10) / 10;
}

app.use(cors()); // разрешаем запросы из мини-аппа (любой источник)
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/admin-assets', express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, crypto.randomUUID() + path.extname(file.originalname || '')),
});
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

// Простая HTTP Basic Auth для админки — браузер сам покажет окно логина/пароля
function checkAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="admin"');
    return res.status(401).send('Требуется авторизация');
  }
  const decoded = Buffer.from(auth.slice(6), 'base64').toString();
  const idx = decoded.indexOf(':');
  const user = decoded.slice(0, idx);
  const pass = decoded.slice(idx + 1);
  if (user === ADMIN_USER && pass === ADMIN_PASS) return next();
  res.set('WWW-Authenticate', 'Basic realm="admin"');
  return res.status(401).send('Неверный логин или пароль');
}

// ---------- ПУБЛИЧНОЕ API (его использует мини-апп) ----------

app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

// ---------- АДМИН API (защищено логином/паролем) ----------

app.get('/api/admin/products', checkAuth, (req, res) => {
  res.json(readProducts());
});

app.post('/api/products', checkAuth, upload.single('photo'), (req, res) => {
  const products = readProducts();
  const b = req.body;

  const photoUrl = req.file
    ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    : (b.photoUrl || '');

  const num = (v) => (v === undefined || v === '' ? undefined : Number(v));

  const product = {
    id: crypto.randomUUID(),
    name: b.name || 'Без названия',
    description: b.description || '',
    category: b.category || '',
    price: num(b.price) || 0,
    photoUrl,
    createdAt: new Date().toISOString(),
    status: b.status === 'nft' ? 'nft' : 'regular',
  };

  if (product.status === 'nft') {
    if (b.giftNumber) product.giftNumber = num(b.giftNumber);
    if (b.issuedNumber) product.issuedNumber = num(b.issuedNumber);
    if (b.totalIssued) product.totalIssued = num(b.totalIssued);
    if (b.modelName) product.model = { name: b.modelName, rarity: num(b.modelRarity) };
    if (b.backdropName) product.backdrop = { name: b.backdropName, rarity: num(b.backdropRarity) };
    if (b.symbolName) product.symbol = { name: b.symbolName, rarity: num(b.symbolRarity) };
    if (b.marketPrice) product.marketPrice = num(b.marketPrice);
    if (b.giftedBy) product.giftedBy = b.giftedBy;
    if (b.giftedDate) product.giftedDate = b.giftedDate;
    if (b.giftComment) product.giftComment = b.giftComment;
  }

  products.push(product);
  writeProducts(products);
  res.json(product);
});

app.put('/api/products/:id', checkAuth, upload.single('photo'), (req, res) => {
  const products = readProducts();
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });

  const b = req.body;
  const num = (v) => (v === undefined || v === '' ? undefined : Number(v));
  const existing = products[idx];

  const photoUrl = req.file
    ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    : (b.photoUrl || existing.photoUrl);

  const updated = {
    ...existing,
    name: b.name || existing.name,
    description: b.description ?? existing.description,
    category: b.category ?? existing.category,
    price: num(b.price) ?? existing.price,
    photoUrl,
    status: b.status === 'nft' ? 'nft' : 'regular',
  };

  if (updated.status === 'nft') {
    updated.giftNumber = num(b.giftNumber) ?? existing.giftNumber;
    updated.issuedNumber = num(b.issuedNumber) ?? existing.issuedNumber;
    updated.totalIssued = num(b.totalIssued) ?? existing.totalIssued;
    updated.model = b.modelName ? { name: b.modelName, rarity: num(b.modelRarity) } : existing.model;
    updated.backdrop = b.backdropName ? { name: b.backdropName, rarity: num(b.backdropRarity) } : existing.backdrop;
    updated.symbol = b.symbolName ? { name: b.symbolName, rarity: num(b.symbolRarity) } : existing.symbol;
    updated.marketPrice = num(b.marketPrice) ?? existing.marketPrice;
    updated.giftedBy = b.giftedBy ?? existing.giftedBy;
    updated.giftedDate = b.giftedDate ?? existing.giftedDate;
    updated.giftComment = b.giftComment ?? existing.giftComment;
  } else {
    delete updated.giftNumber; delete updated.issuedNumber; delete updated.totalIssued;
    delete updated.model; delete updated.backdrop; delete updated.symbol;
    delete updated.marketPrice; delete updated.giftedBy; delete updated.giftedDate; delete updated.giftComment;
  }

  products[idx] = updated;
  writeProducts(products);
  res.json(updated);
});

app.delete('/api/products/:id', checkAuth, (req, res) => {
  let products = readProducts();
  products = products.filter(p => p.id !== req.params.id);
  writeProducts(products);
  res.json({ ok: true });
});

// ---------- Автоприём NFT-подарков из Telegram-канала ----------
//
// Как это работает: когда ты передаёшь (Transfer) свой уникальный подарок
// в чат/канал, где состоит бот, Telegram присылает боту служебное
// сообщение с полем `unique_gift`, где уже лежат все характеристики:
// модель, фон, символ (с редкостью), номер экземпляра и т.д.
// Ничего распознавать вручную не нужно — мы просто читаем эти поля.

app.post('/telegram-webhook', async (req, res) => {
  // сразу отвечаем Telegram 200, чтобы не было повторных попыток доставки
  res.sendStatus(200);

  const secretHeader = req.headers['x-telegram-bot-api-secret-token'];
  if (secretHeader !== WEBHOOK_SECRET) {
    console.warn('⚠️ Вебхук: неверный секретный токен — запрос проигнорирован');
    return;
  }

  const update = req.body || {};
  console.log('📩 Обновление от Telegram:', JSON.stringify(update).slice(0, 3000));

  const msg = update.channel_post || update.message;
  if (!msg || !msg.unique_gift) return; // это сообщение не про уникальный подарок — пропускаем

  try {
    const info = msg.unique_gift;      // UniqueGiftInfo
    const gift = info.gift;            // UniqueGift
    if (!gift) return;

    const thumbFileId =
      gift.model?.sticker?.thumbnail?.file_id ||
      gift.symbol?.sticker?.thumbnail?.file_id ||
      null;
    const photoUrl = thumbFileId ? await tgFileUrl(thumbFileId) : null;

    const product = {
      id: crypto.randomUUID(),
      name: `${gift.base_name || gift.name || 'Подарок'}${gift.number ? ' #' + gift.number : ''}`.trim(),
      description: 'Автоматически добавлено из Telegram-канала.',
      category: GIFT_CATEGORY,
      price: info.last_resale_star_count || 0,
      photoUrl: photoUrl || '',
      createdAt: new Date().toISOString(),
      status: 'nft',
      giftNumber: gift.number,
      model: gift.model ? { name: gift.model.name, rarity: toPercent(gift.model.rarity_per_mille) } : undefined,
      backdrop: gift.backdrop ? { name: gift.backdrop.name, rarity: toPercent(gift.backdrop.rarity_per_mille) } : undefined,
      symbol: gift.symbol ? { name: gift.symbol.name, rarity: toPercent(gift.symbol.rarity_per_mille) } : undefined,
      marketPrice: info.last_resale_star_count || undefined,
      giftedDate: new Date().toISOString().slice(0, 10),
    };

    addProduct(product);
    console.log('✅ Товар автоматически добавлен в маркетплейс:', product.name);
  } catch (e) {
    console.error('Ошибка обработки подарка из вебхука:', e);
  }
});

// Одноразовая настройка: открой этот адрес в браузере (спросит логин/пароль
// от админки), чтобы сообщить Telegram, куда слать обновления.
app.get('/setup-webhook', checkAuth, async (req, res) => {
  if (!BOT_TOKEN) return res.status(400).json({ error: 'Не задан BOT_TOKEN в переменных окружения' });
  const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
  const url = `${appUrl}/telegram-webhook`;
  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        secret_token: WEBHOOK_SECRET,
        allowed_updates: ['channel_post', 'message'],
      }),
    });
    const data = await r.json();
    res.json({ webhookUrl: url, telegramResponse: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Проверка текущего статуса вебхука
app.get('/webhook-info', checkAuth, async (req, res) => {
  if (!BOT_TOKEN) return res.status(400).json({ error: 'Не задан BOT_TOKEN в переменных окружения' });
  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ---------- Страница админки ----------

app.get('/admin', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/', (req, res) => {
  res.send('Guaranteed Gift Market backend is running. See /admin for the admin panel.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
