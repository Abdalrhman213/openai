document.getElementById('sendButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value;
    const chatDiv = document.getElementById('chat');
    
    // إضافة الرسالة إلى واجهة المستخدم
    chatDiv.innerHTML += `<p>أنت: ${userInput}</p>`;
    
    // إرسال الرسالة إلى الخادم
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        chatDiv.innerHTML += `<p>البوت: ${data.message}</p>`;
        document.getElementById('userInput').value = ''; // مسح حقل الإدخال
    })
    .catch(error => {
        console.error('حدث خطأ:', error);
    });
});
