// Remove.bg API কী (সতর্কতা: এটি সরাসরি ফ্রন্টএন্ডে ব্যবহার করবেন না)
const API_KEY = "QvY6bpH9SYD6rWrpxJQxFjRe"; // বাস্তবে .env ফাইলে রাখুন

document.getElementById('fileInput').addEventListener('change', handleImageUpload);
document.getElementById('dropZone').addEventListener('click', () => document.getElementById('fileInput').click());
document.getElementById('dropZone').addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
});

document.getElementById('dropZone').addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.background = "";
});

document.getElementById('dropZone').addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.background = "";
    if (e.dataTransfer.files.length) {
        document.getElementById('fileInput').files = e.dataTransfer.files;
        handleImageUpload({ target: document.getElementById('fileInput') });
    }
});

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const dropZone = document.getElementById('dropZone');
    dropZone.innerHTML = '<p>প্রসেসিং হচ্ছে... ⏳</p>';

    try {
        const resultUrl = await removeBackground(file);
        document.getElementById('resultArea').innerHTML = `
            <h3>রেজাল্ট:</h3>
            <img src="${resultUrl}" alt="Result" style="max-width: 100%; border: 2px solid white; border-radius: 5px;">
            <a href="${resultUrl}" download="removed-bg.png" class="download-btn">ডাউনলোড করুন ⬇️</a>
        `;
        dropZone.innerHTML = '<p>আরেকটি ইমেজ আপলোড করুন</p>';
    } catch (error) {
        dropZone.innerHTML = '<p>ত্রুটি হয়েছে! আবার চেষ্টা করুন</p>';
        console.error(error);
    }
}

async function removeBackground(imageFile) {
    const formData = new FormData();
    formData.append("image_file", imageFile);
    
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": JVaiZTy9HoppFQhNjaPx3LNN },
        body: formData,
    });
    
    if (!response.ok) throw new Error("API রেসপন্স ফেইলড");
    
    const resultBlob = await response.blob();
    return URL.createObjectURL(resultBlob);
}
