// لايك ❤️
function toggleLike(dev, index) {
  const key = `likes_${dev}_${index}`;
  let likes = parseInt(localStorage.getItem(key)) || 0;

  likes++;
  localStorage.setItem(key, likes);
  document.getElementById(`like_${dev}_${index}`).innerText = likes;
}

// تعليق 💬
function toggleComment(dev, index) {
  const key = `comments_${dev}_${index}`;
  let comments = JSON.parse(localStorage.getItem(key)) || [];

  const text = prompt("📝 اكتب تعليقك:");

  if (text && text.trim() !== '') {
    comments.push({
      text: text.trim(),
      time: new Date().toLocaleString()
    });

    localStorage.setItem(key, JSON.stringify(comments));

    // تحديث الرقم في الزر
    const span = document.getElementById(`comment_${dev}_${index}`);
    if (span) span.innerText = comments.length;
  }
}
