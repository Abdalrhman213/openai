require('dotenv').config(); // تحميل المتغيرات من ملف .env
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; // استخدام المنفذ من المتغيرات البيئية أو 3000 كخيار افتراضي

app.use(cors()); // تمكين CORS
app.use(express.json()); // تمكين تحليل JSON

// نقطة النهاية لجلب المستخدمين
app.get('/api/users', async (req, res) => {
    try {
        // هنا يمكنك استدعاء API خارجي لجلب المستخدمين
        // على سبيل المثال، إذا كنت تستخدم OpenAI API:
        const response = await axios.get('https://api.example.com/users', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // استخدام مفتاح API
            }
        });

        res.json(response.data); // إرسال البيانات المستلمة كاستجابة
    } catch (error) {
        console.error('حدث خطأ أثناء جلب المستخدمين:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء جلب المستخدمين' });
    }
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
