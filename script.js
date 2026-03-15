const API_URL = "https://w.mbbstore.my.id/";  
// GANTI SAMA URL PANEL LU + PORT !!!

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "bajiguromega123"  // GANTI PASSWORD INI JADI MILIK LU SENDIRI !!!
};

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const status = document.getElementById('loginStatus');

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInAt', Date.now());

    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    status.innerHTML = '';
  } else {
    status.innerHTML = "Username atau password salah bro! Coba lagi 🔥";
  }
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loggedInAt');
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'block';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function checkLogin() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
  }
}

function generateApiKey() {
  const newKey = 'omega_' + Math.random().toString(36).substr(2, 10) + '_' + Date.now();
  document.getElementById('apiKeyDisplay').innerHTML = `API Key baru: <strong>${newKey}</strong><br>Copy & simpan baik-baik bro!`;
  document.getElementById('apikey').value = newKey;
}

async function kirim(type) {
  const target = document.getElementById('target').value.trim();
  const apikey = document.getElementById('apikey').value.trim();
  const status = document.getElementById('status');

  if (!target || target.length < 10 || !target.startsWith('62')) {
    status.innerHTML = "Nomor target salah bro! Harus 628xxxxxxxxxx 🔥";
    return;
  }

  if (!apikey) {
    status.innerHTML = "API Key kosong! Generate dulu atau isi manual Ω";
    return;
  }

  status.innerHTML = "Sedang kirim " + type + " ... 🔥";

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: apikey,
        target: target,
        type: type
      })
    });

    const data = await response.json();

    if (data.success) {
      status.innerHTML = "SUKSES! Bug " + type + " terkirim ke " + target + " 🔥🌌";
    } else {
      status.innerHTML = "GAGAL: " + (data.error || "Cek koneksi / panel lu bro");
    }
  } catch (err) {
    status.innerHTML = "ERROR: " + err.message + " (cek URL panel atau internet)";
  }
}

// Cek login saat halaman dibuka
window.onload = checkLogin;
