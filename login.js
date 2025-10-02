function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('يرجى إدخال اسم المستخدم وكلمة المرور');
    return;
  }

  // التحقق من المطور الأساسي
  if (username === 'amine' && password === 'amine') {
    localStorage.setItem('current_user', 'amine');
    localStorage.setItem('current_role', 'master');
    window.location.href = 'master.html';
    return;
  }

  // التحقق من المطور العادي
  const devs = JSON.parse(localStorage.getItem('dev_accounts')) || [];
  const foundDev = devs.find(d => d.username === username && d.password === password);

  if (foundDev) {
    localStorage.setItem('current_user', username);
    localStorage.setItem('current_role', 'dev');
    window.location.href = 'dev.html';
    return;
  }

  // التحقق من المستخدم العادي
  const users = JSON.parse(localStorage.getItem('user_accounts')) || [];
  const foundUser = users.find(u => u.username === username && u.password === password);

  if (foundUser) {
    localStorage.setItem('current_user', username);
    localStorage.setItem('current_role', 'user');
    window.location.href = 'user.html';
    return;
  }

  alert('بيانات الدخول غير صحيحة');
}

// دخول المطور الأساسي بزر خاص
function goToMaster() {
  const username = prompt("اسم المستخدم:");
  const password = prompt("كلمة المرور:");

  if (username === 'amine' && password === 'amine') {
    localStorage.setItem('current_user', 'amine');
    localStorage.setItem('current_role', 'master');
    window.location.href = 'master.html';
  } else {
    alert('بيانات المطور الأساسي غير صحيحة');
  }
                         }
