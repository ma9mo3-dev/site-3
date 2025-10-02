// جلب اسم المستخدم الحالي
const currentUser = localStorage.getItem('current_user');
if (!currentUser) {
  alert('يجب تسجيل الدخول');
  window.location.href = 'index.html';
}

// العناصر
const myReposContainer = document.getElementById('myRepos');

// تحميل المستودعات الخاصة بالمطور
function loadRepos() {
  myReposContainer.innerHTML = '';
  const repos = JSON.parse(localStorage.getItem(`repos_${currentUser}`)) || [];

  repos.forEach((repo, index) => {
    const item = document.createElement('div');
    item.className = 'repo-item';
    item.innerHTML = `
      <span class="options-btn" onclick="toggleOptions(${index})"><i class="fas fa-ellipsis-h"></i></span>
      <div class="repo-options" id="options_${index}">
        <button onclick="editRepo(${index})">✏️ تعديل</button>
        <button onclick="deleteRepo(${index})">🗑 حذف</button>
      </div>
      <h3>${repo.name}</h3>
      <p>${repo.desc}</p>
      <p><strong>API:</strong> ${repo.api}</p>
    `;
    myReposContainer.appendChild(item);
  });
}

// القائمة الجانبية
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

// خيارات كل مستودع
function toggleOptions(index) {
  const el = document.getElementById(`options_${index}`);
  if (el.style.display === 'block') el.style.display = 'none';
  else el.style.display = 'block';
}

// إنشاء مستودع جديد
function createRepo() {
  const name = prompt("اسم المستودع:");
  if (!name) return;

  const desc = prompt("وصف المستودع:");
  if (!desc) return;

  const api = prompt("API الخاص بك:");
  if (!api) return;

  const repos = JSON.parse(localStorage.getItem(`repos_${currentUser}`)) || [];
  repos.push({ name, desc, api });
  localStorage.setItem(`repos_${currentUser}`, JSON.stringify(repos));

  alert('تم إنشاء المستودع بنجاح!');
  loadRepos();
}

// تعديل مستودع
function editRepo(index) {
  const repos = JSON.parse(localStorage.getItem(`repos_${currentUser}`)) || [];
  const repo = repos[index];

  const name = prompt("تعديل اسم المستودع:", repo.name);
  if (!name) return;

  const desc = prompt("تعديل الوصف:", repo.desc);
  if (!desc) return;

  const api = prompt("تعديل API:", repo.api);
  if (!api) return;

  repos[index] = { name, desc, api };
  localStorage.setItem(`repos_${currentUser}`, JSON.stringify(repos));

  alert('تم تعديل المستودع!');
  loadRepos();
}

// حذف مستودع
function deleteRepo(index) {
  if (!confirm("هل أنت متأكد من حذف هذا المستودع؟")) return;

  const repos = JSON.parse(localStorage.getItem(`repos_${currentUser}`)) || [];
  repos.splice(index, 1);
  localStorage.setItem(`repos_${currentUser}`, JSON.stringify(repos));

  alert('تم حذف المستودع!');
  loadRepos();
}

// تسجيل الخروج
function logout() {
  localStorage.removeItem('current_user');
  localStorage.removeItem('current_role');
  window.location.href = 'index.html';
}

// تحميل المستودعات عند فتح الصفحة
window.onload = loadRepos;
