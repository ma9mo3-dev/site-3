// التحقق من تسجيل الدخول
const currentRole = localStorage.getItem('current_role');
const currentUser = localStorage.getItem('current_user');

if (!currentUser || currentUser !== 'amine' || currentRole !== 'master') {
  alert('يجب تسجيل الدخول كمطور أساسي');
  window.location.href = 'index.html';
}

// عناصر الصفحة
const userListDiv = document.getElementById('userList');

// جلب كل الحسابات
function loadUsers() {
  userListDiv.innerHTML = '';

  // حسابات المستخدمين
  const users = JSON.parse(localStorage.getItem('user_accounts')) || [];
  users.forEach((u, i) => {
    const item = document.createElement('div');
    item.className = 'user-item';
    item.innerHTML = `
      <span>👤 ${u.username} (مستخدم)</span>
      <button onclick="deleteUser('user', ${i})">حذف</button>
    `;
    userListDiv.appendChild(item);
  });

  // حسابات المطورين
  const devs = JSON.parse(localStorage.getItem('dev_accounts')) || [];
  devs.forEach((d, i) => {
    const item = document.createElement('div');
    item.className = 'user-item';
    item.innerHTML = `
      <span>👨‍💻 ${d.username} (مطور)</span>
      <button onclick="deleteUser('dev', ${i})">حذف</button>
    `;
    userListDiv.appendChild(item);
  });
}

// حذف حساب
function deleteUser(type, index) {
  if (!confirm('هل أنت متأكد من حذف هذا الحساب؟')) return;

  if (type === 'user') {
    const users = JSON.parse(localStorage.getItem('user_accounts')) || [];
    users.splice(index, 1);
    localStorage.setItem('user_accounts', JSON.stringify(users));
  } else if (type === 'dev') {
    const devs = JSON.parse(localStorage.getItem('dev_accounts')) || [];
    devs.splice(index, 1);
    localStorage.setItem('dev_accounts', JSON.stringify(devs));
  }

  loadUsers();
}

// إضافة مطور جديد
function addDeveloper() {
  const username = prompt("اسم المستخدم للمطور الجديد:");
  if (!username) return;

  const password = prompt("كلمة المرور للمطور الجديد:");
  if (!password) return;

  const devs = JSON.parse(localStorage.getItem('dev_accounts')) || [];
  const exists = devs.some(d => d.username === username);
  if (exists) {
    alert('اسم المستخدم موجود بالفعل');
    return;
  }

  devs.push({ username, password });
  localStorage.setItem('dev_accounts', JSON.stringify(devs));
  alert('تم إضافة المطور الجديد بنجاح!');
  loadUsers();
}

// تسجيل الخروج
function logout() {
  localStorage.removeItem('current_user');
  localStorage.removeItem('current_role');
  window.location.href = 'index.html';
}

// تحميل الحسابات عند فتح الصفحة
window.onload = loadUsers;
