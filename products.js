// رابط الشيت الخاص بك
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQA1N5o-6wYiF-PzhHpuPowJNnAl_TATDAsdnV7weblohCpr8i9xnxbVsvm5EsO-HWo5dG748KuRgil/pub?gid=0&single=true&output=csv";

async function loadProducts() {
    try {
        const response = await fetch(SHEET_CSV_URL);
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        
        // تحويل البيانات من الشيت إلى قائمة منتجات
        const products = rows.map((row, index) => {
            const [name, price, category, description, image] = row.split(',');
            return { id: index, name: name?.trim(), price: parseFloat(price), category: category?.trim(), image: image?.trim() };
        }).filter(p => p.name);

        renderProducts(products);
    } catch (e) {
        console.error("خطأ في تحميل المنتجات", e);
    }
}

// تشغيل التحميل عند فتح الصفحة
loadProducts();
