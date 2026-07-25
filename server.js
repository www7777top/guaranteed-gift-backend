const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'change-me-please';

const DB_PATH = path.join(__dirname, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify([]));

function readProducts() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeProducts(products) {
  fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2));
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Только изображения'));
    cb(null, true);
  }
});

function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

app.get('/api/admin/check', requireAdmin, (req, res) => {
  res.json({ ok: true });
});

app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

app.post('/api/products', requireAdmin, upload.single('photo'), (req, res) => {
  const { name, description, price, category } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'name и price обязательны' });

  const product = {
    id: randomUUID(),
    name,
    description: description || '',
    price: Number(price),
    category: category || '',
    photoUrl: req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString()
  };

  const products = readProducts();
  products.push(product);
  writeProducts(products);
  res.status(201).json(product);
});

app.delete('/api/products/:id', requireAdmin, (req, res) => {
  const products = readProducts();
  const target = products.find(p => p.id === req.params.id);
  const filtered = products.filter(p => p.id !== req.params.id);
  writeProducts(filtered);

  if (target && target.photoUrl) {
    const filename = target.photoUrl.split('/uploads/')[1];
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
