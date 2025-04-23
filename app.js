require('dotenv').config(); // تحميل المتغيرات من ملف .env
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // استخدام المنفذ من المتغيرات البيئية أو 3000 كخيار افتراضي

app.use(cors()); // تمكين CORS
app.use(express.json()); // تمكين تحليل JSON
app.use(express.static(path.join(__dirname, 'public'))); // تقديم الملفات الثابتة

// نقطة النهاية لجلب المستخدمين (يمكنك تعديلها حسب الحاجة)
app.get('/api/users', (req, res) => {
    res.json({ message: 'Hello, users!' }); // مثال بسيط
});

// نقطة النهاية لجلب الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
