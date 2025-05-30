require('dotenv').config(); // تحميل المتغيرات من ملف .env
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; // استخدام المنفذ من المتغيرات البيئية أو 3000 كخيار افتراضي

app.use(cors()); // تمكين CORS
app.use(express.json()); // تمكين تحليل JSON
app.use(express.static(path.join(__dirname, 'public'))); // تقديم الملفات الثابتة

// نقطة النهاية لجلب الردود من OpenAI
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const botMessage = response.data.choices[0].message.content;
        res.json({ message: botMessage });
    } catch (error) {
        console.error('Error fetching data from OpenAI:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء التواصل مع OpenAI' });
    }
});

// نقطة النهاية لجلب الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
