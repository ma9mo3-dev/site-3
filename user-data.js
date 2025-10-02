// تحميل المستودعات من localStorage
window.onload = () => {
  const container = document.getElementById('repos-container');
  container.innerHTML = '';

  for (let key in localStorage) {
    if (key.startsWith('repos_')) {
      try {
        const repos = JSON.parse(localStorage.getItem(key));
        const developer = key.replace('repos_', '');

        repos.forEach((repo, index) => {
          const likeKey = `likes_${developer}_${index}`;
          const commentKey = `comments_${developer}_${index}`;

          const likes = parseInt(localStorage.getItem(likeKey)) || 0;
          const comments = JSON.parse(localStorage.getItem(commentKey)) || [];

          const item = document.createElement('div');
          item.className = 'repo-item';
          item.innerHTML = `
            <h3>${repo.name}</h3>
            <p class="desc">${repo.desc}</p>
            <p><strong>المطور:</strong> ${developer}</p>

            <div class="repo-actions">
              <button onclick="toggleLike('${developer}', ${index})">❤️ <span id="like_${developer}_${index}">${likes}</span></button>
              <button onclick="toggleComment('${developer}', ${index})">💬 <span id="comment_${developer}_${index}">${comments.length}</span></button>
            </div>
          `;

          container.appendChild(item);
        });
      } catch (e) {
        console.warn(`خطأ في قراءة البيانات من المفتاح: ${key}`);
      }
    }
  }
};
