document.getElementById('sendButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value;
    const chatDiv = document.getElementById('chat');
    
    // إضافة الرسالة إلى واجهة المستخدم
    chatDiv.innerHTML += `<p>أنت: ${userInput}</p>`;
    
    // هنا يمكنك إضافة منطق لاستدعاء API
    // على سبيل المثال، يمكنك استخدام fetch لاستدعاء نقطة النهاية /api/users
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            chatDiv.innerHTML += `<p>البوت: ${data.message}</p>`;
        })
        .catch(error => {
            console.error('حدث خطأ:', error);
        });
});
