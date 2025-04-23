let model;

// بناء النموذج
async function createModel() {
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
}

// تدريب النموذج
async function trainModel() {
    const xTrain = tf.randomNormal([1000, 10]); // 1000 عينة، 10 ميزات
    const yTrain = tf.randomUniform([1000, 1], 0, 2).round(); // تصنيفات ثنائية

    await model.fit(xTrain, yTrain, { epochs: 10 });
    document.getElementById('status').innerText = 'تم تدريب النموذج بنجاح.';
}

// تحديث النموذج ببيانات جديدة
async function updateModel() {
    const newData = tf.randomNormal([100, 10]); // 100 عينة جديدة
    const newLabels = tf.randomUniform([100, 1], 0, 2).round(); // تصنيفات جديدة

    await model.fit(newData, newLabels, { epochs: 5 });
    document.getElementById('status').innerText = 'تم تحديث النموذج ببيانات جديدة.';
}

// جلب المستخدمين من API
async function fetchUsers() {
    try {
        const response = await fetch('/api/users'); // استدعاء نقطة API الخاصة بك
        const users = await response.json(); // تحويل الاستجابة إلى JSON
        const userList = document.getElementById('users');
        userList.innerHTML = ''; // مسح القائمة السابقة

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name; // افترض أن كل مستخدم لديه خاصية "name"
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
    }
}

// إعداد النموذج عند تحميل الصفحة
window.onload = async () => {
    await createModel();
    await fetchUsers(); // جلب البيانات من API
};

// ربط الأزرار بالوظائف
document.getElementById('trainButton').onclick = trainModel;
document.getElementById('updateButton').onclick = updateModel;
