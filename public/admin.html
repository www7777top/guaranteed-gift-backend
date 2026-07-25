<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Gift Market — Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#0f0b14; --surface:#1c1524; --surface-2:#241b2e;
    --line:rgba(245,240,230,0.09);
    --gold:#c9a227; --gold-soft:#e6c76a; --violet:#7b5fff;
    --text:#f5f0e6; --muted:#9a8fa8;
  }
  *{box-sizing:border-box;}
  body{
    margin:0; background:var(--bg); color:var(--text);
    font-family:'Manrope', system-ui, sans-serif;
    min-height:100vh; padding:20px 16px 60px;
  }
  h1{font-family:'Fraunces', serif; font-size:22px; font-weight:600; margin:0 0 4px;}
  .sub{color:var(--muted); font-size:13px; margin-bottom:20px;}

  .card{
    background:var(--surface); border:1px solid var(--line);
    border-radius:16px; padding:18px; margin-bottom:16px;
  }
  label{display:block; font-size:12px; color:var(--muted); margin:12px 0 6px; text-transform:uppercase; letter-spacing:.4px;}
  label:first-child{margin-top:0;}
  input, textarea, select{
    width:100%; padding:11px 12px; border-radius:10px;
    background:var(--surface-2); border:1px solid var(--line);
    color:var(--text); font-family:'Manrope'; font-size:14px;
  }
  textarea{resize:vertical; min-height:64px;}
  input:focus, textarea:focus, select:focus{outline:none; border-color:var(--violet);}
  input[type=file]{padding:9px;}

  .row2{display:grid; grid-template-columns:1fr 1fr; gap:10px;}

  .nft-block{
    margin-top:18px; padding-top:14px; border-top:1px dashed var(--line);
    display:none;
  }
  .nft-block.show{display:block;}
  .nft-block .hint{font-size:11.5px; color:var(--muted); margin-bottom:10px; line-height:1.5;}

  .btn{
    margin-top:16px; width:100%; padding:14px; border:none; border-radius:12px;
    font-family:'Manrope'; font-weight:700; font-size:14px; cursor:pointer;
  }
  .btn-primary{background:linear-gradient(135deg, var(--violet), #5a3fe0); color:#fff;}
  .btn-primary:disabled{opacity:.5;}
  .btn-danger{background:rgba(220,60,60,0.15); color:#ff7b7b; border:1px solid rgba(220,60,60,0.3); padding:8px 12px; width:auto; margin:0;}

  .status{font-size:13px; margin-top:10px; min-height:16px;}
  .status.ok{color:#7ee6a0;}
  .status.err{color:#ff7b7b;}

  .list-item{
    display:flex; align-items:center; gap:12px;
    padding:10px; border-bottom:1px solid var(--line);
  }
  .list-item:last-child{border-bottom:none;}
  .list-item img{width:46px; height:46px; border-radius:8px; object-fit:cover; background:var(--surface-2);}
  .list-item .ph{width:46px; height:46px; border-radius:8px; background:var(--surface-2); display:flex; align-items:center; justify-content:center;}
  .list-item .info{flex:1; min-width:0;}
  .list-item .info b{font-size:13.5px; display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
  .list-item .info span{font-size:12px; color:var(--gold-soft);}
  .badge-nft{
    font-size:9.5px; font-weight:800; color:#b6a5ff;
    background:rgba(123,95,255,0.16); border:1px solid rgba(123,95,255,0.4);
    padding:2px 6px; border-radius:100px; margin-left:6px; text-transform:uppercase;
  }

  #lockScreen{max-width:340px; margin:80px auto 0;}
</style>
</head>
<body>

<div id="lockScreen">
  <h1>🔐 Вход в админку</h1>
  <div class="sub">Введите admin-ключ, заданный на сервере</div>
  <div class="card">
    <label>Admin key</label>
    <input id="keyInput" type="password" placeholder="••••••••">
    <button class="btn btn-primary" id="loginBtn">Войти</button>
    <div class="status" id="loginStatus"></div>
  </div>
</div>

<div id="adminScreen" style="display:none;">
  <h1>🎁 Gift Market — Admin</h1>
  <div class="sub">Добавляйте и удаляйте товары витрины</div>

  <div class="card">
    <label>Название</label>
    <input id="fName" type="text" placeholder="Plush Pepe">

    <div class="row2">
      <div>
        <label>Цена, ⭐</label>
        <input id="fPrice" type="number" placeholder="1990">
      </div>
      <div>
        <label>Статус</label>
        <select id="fStatus">
          <option value="regular">Обычный подарок</option>
          <option value="nft">NFT / Коллекционный</option>
        </select>
      </div>
    </div>

    <label>Категория</label>
    <input id="fCategory" type="text" placeholder="Цветы">
    <label>Описание</label>
    <textarea id="fDesc" placeholder="Короткое описание товара"></textarea>
    <label>Фото</label>
    <input id="fPhoto" type="file" accept="image/*">

    <div class="nft-block" id="nftBlock">
      <div class="hint">
        Заполни, глядя на карточку своего подарка в Telegram (Профиль → Подарки → открой подарок).
        Сам подарок никуда передавать не нужно — это просто информация для витрины.
      </div>

      <div class="row2">
        <div><label>Номер экземпляра</label><input id="fGiftNumber" type="number" placeholder="5475"></div>
        <div><label>Рыночная цена, ⭐</label><input id="fMarketPrice" type="number" placeholder="1200"></div>
      </div>
      <div class="row2">
        <div><label>Выпущено (номер)</label><input id="fIssuedNumber" type="number" placeholder="6030"></div>
        <div><label>Выпущено (всего)</label><input id="fTotalIssued" type="number" placeholder="6962"></div>
      </div>

      <label>Модель</label>
      <div class="row2">
        <input id="fModelName" placeholder="Название модели">
        <input id="fModelRarity" type="number" step="0.1" placeholder="% редкости">
      </div>
      <label>Фон (Backdrop)</label>
      <div class="row2">
        <input id="fBackdropName" placeholder="Название фона">
        <input id="fBackdropRarity" type="number" step="0.1" placeholder="% редкости">
      </div>
      <label>Символ</label>
      <div class="row2">
        <input id="fSymbolName" placeholder="Название символа">
        <input id="fSymbolRarity" type="number" step="0.1" placeholder="% редкости">
      </div>

      <label>Подарено кем</label>
      <input id="fGiftedBy" placeholder="Имя отправителя (необязательно)">
      <label>Дата вручения</label>
      <input id="fGiftedDate" type="date">
      <label>Комментарий к подарку</label>
      <input id="fGiftComment" placeholder="С днём рождения! (необязательно)">
    </div>

    <button class="btn btn-primary" id="addBtn">Добавить товар</button>
    <div class="status" id="addStatus"></div>
  </div>

  <div class="card">
    <div class="sub" style="margin-bottom:8px;">Товары в каталоге</div>
    <div id="list"></div>
  </div>
</div>

<script>
  const API_BASE = 'https://guaranteed-gift-backend.onrender.com';
  let ADMIN_KEY = sessionStorage.getItem('adminKey') || '';

  const lockScreen = document.getElementById('lockScreen');
  const adminScreen = document.getElementById('adminScreen');
  const nftBlock = document.getElementById('nftBlock');
  const fStatus = document.getElementById('fStatus');

  fStatus.addEventListener('change', () => {
    nftBlock.classList.toggle('show', fStatus.value === 'nft');
  });

  async function tryLogin(key){
    const status = document.getElementById('loginStatus');
    status.textContent = 'Проверка...';
    status.className = 'status';
    try {
      const res = await fetch(`${API_BASE}/api/admin/check`, { headers: { 'x-admin-key': key } });
      if (res.ok){
        ADMIN_KEY = key;
        sessionStorage.setItem('adminKey', key);
        lockScreen.style.display = 'none';
        adminScreen.style.display = 'block';
        loadList();
      } else {
        status.textContent = 'Неверный ключ';
        status.className = 'status err';
      }
    } catch (e) {
      status.textContent = 'Сервер недоступен';
      status.className = 'status err';
    }
  }

  document.getElementById('loginBtn').addEventListener('click', () => {
    tryLogin(document.getElementById('keyInput').value.trim());
  });

  if (ADMIN_KEY) tryLogin(ADMIN_KEY);

  async function loadList(){
    const list = document.getElementById('list');
    list.innerHTML = 'Загрузка...';
    const res = await fetch(`${API_BASE}/api/products`);
    const products = await res.json();
    if (!products.length){
      list.innerHTML = '<div class="sub">Пока нет товаров</div>';
      return;
    }
    list.innerHTML = products.map(p => `
      <div class="list-item">
        ${p.photoUrl ? `<img src="${p.photoUrl}">` : `<div class="ph">🎁</div>`}
        <div class="info">
          <b>${p.name}${p.status === 'nft' ? '<span class="badge-nft">NFT</span>' : ''}</b>
          <span>${new Intl.NumberFormat('ru-RU').format(p.price)} ⭐</span>
        </div>
        <button class="btn btn-danger" data-id="${p.id}">Удалить</button>
      </div>
    `).join('');
    list.querySelectorAll('.btn-danger').forEach(btn => {
      btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
    });
  }

  async function deleteProduct(id){
    if (!confirm('Удалить товар?')) return;
    await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': ADMIN_KEY }
    });
    loadList();
  }

  document.getElementById('addBtn').addEventListener('click', async () => {
    const name = document.getElementById('fName').value.trim();
    const price = document.getElementById('fPrice').value;
    const status = document.getElementById('addStatus');
    const btn = document.getElementById('addBtn');

    if (!name || !price){
      status.textContent = 'Укажите название и цену';
      status.className = 'status err';
      return;
    }

    const fd = new FormData();
    fd.append('name', name);
    fd.append('price', price);
    fd.append('category', document.getElementById('fCategory').value.trim());
    fd.append('description', document.getElementById('fDesc').value.trim());
    fd.append('status', fStatus.value);

    const photoFile = document.getElementById('fPhoto').files[0];
    if (photoFile) fd.append('photo', photoFile);

    if (fStatus.value === 'nft') {
      fd.append('giftNumber', document.getElementById('fGiftNumber').value);
      fd.append('marketPrice', document.getElementById('fMarketPrice').value);
      fd.append('issuedNumber', document.getElementById('fIssuedNumber').value);
      fd.append('totalIssued', document.getElementById('fTotalIssued').value);
      fd.append('modelName', document.getElementById('fModelName').value.trim());
      fd.append('modelRarity', document.getElementById('fModelRarity').value);
      fd.append('backdropName', document.getElementById('fBackdropName').value.trim());
      fd.append('backdropRarity', document.getElementById('fBackdropRarity').value);
      fd.append('symbolName', document.getElementById('fSymbolName').value.trim());
      fd.append('symbolRarity', document.getElementById('fSymbolRarity').value);
      fd.append('giftedBy', document.getElementById('fGiftedBy').value.trim());
      fd.append('giftedDate', document.getElementById('fGiftedDate').value);
      fd.append('giftComment', document.getElementById('fGiftComment').value.trim());
    }

    btn.disabled = true;
    status.textContent = 'Сохраняем...';
    status.className = 'status';

    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'x-admin-key': ADMIN_KEY },
        body: fd
      });
      if (res.ok){
        status.textContent = 'Товар добавлен ✓';
        status.className = 'status ok';
        ['fName','fPrice','fCategory','fDesc','fGiftNumber','fMarketPrice','fIssuedNumber',
         'fTotalIssued','fModelName','fModelRarity','fBackdropName','fBackdropRarity',
         'fSymbolName','fSymbolRarity','fGiftedBy','fGiftedDate','fGiftComment']
          .forEach(id => document.getElementById(id).value = '');
        document.getElementById('fPhoto').value = '';
        fStatus.value = 'regular';
        nftBlock.classList.remove('show');
        loadList();
      } else {
        const err = await res.json();
        status.textContent = err.error || 'Ошибка сохранения';
        status.className = 'status err';
      }
    } catch (e) {
      status.textContent = 'Сервер недоступен';
      status.className = 'status err';
    } finally {
      btn.disabled = false;
    }
  });
</script>
</body>
</html>
