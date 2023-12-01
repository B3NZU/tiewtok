import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyBaTvwRZqbFtxpSgBqCke1rK1elOxDodTM",
    authDomain: "tourist-attraction-80139.firebaseapp.com",
    projectId: "tourist-attraction-80139",
    storageBucket: "tourist-attraction-80139.appspot.com",
    messagingSenderId: "854932461956",
    appId: "1:854932461956:web:118182f225e73e7cc125d1",
    measurementId: "G-2S4YH9BYMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

// -----------------------------------------------------------------------------------------

// ฟังก์ชันสำหรับดึงข้อมูลและแสดงบน HTML (Info)
  // Tak Province
async function fetchDataAndDisplay(id, documentName) {
    const docRef = doc(db, "Tak_Province", documentName);
    const docSnap = await getDoc(docRef);

    const name = docSnap.data().name;
    const info_1 = docSnap.data().st_info;
    const info_2 = docSnap.data().nd_info;
    const info_3 = docSnap.data().rd_info;

    // แสดงข้อมูลบน HTML โดยอ้างถึง ID
    document.getElementById(id + "_name").textContent = name;
    document.getElementById(id + "_info_1").textContent = info_1;
    document.getElementById(id + "_info_2").textContent = info_2;
    document.getElementById(id + "_info_3").textContent = info_3;
        // sm display
    document.getElementById(id + "_2").textContent = info_2;
}

fetchDataAndDisplay("T", "1_Place");
fetchDataAndDisplay("T2", "2_Place");
fetchDataAndDisplay("T3", "3_Place");
fetchDataAndDisplay("T4", "4_Place");
fetchDataAndDisplay("T5", "5_Place");
fetchDataAndDisplay("T6", "6_Place");
fetchDataAndDisplay("T7", "7_Place");
fetchDataAndDisplay("T8", "8_Place");
fetchDataAndDisplay("T9", "9_Place");
fetchDataAndDisplay("T0", "10_Place");


  // Kan Province
  async function fetchDataAndDisplayK(id, documentName) {
    const docRef = doc(db, "Kan_Province", documentName);
    const docSnap = await getDoc(docRef);

    const name = docSnap.data().name;
    const info_1 = docSnap.data().st_info;
    const info_2 = docSnap.data().nd_info;
    const info_3 = docSnap.data().rd_info;

    // แสดงข้อมูลบน HTML โดยอ้างถึง ID
    document.getElementById(id + "_name").textContent = name;
    document.getElementById(id + "_info_1").textContent = info_1;
    document.getElementById(id + "_info_2").textContent = info_2;
    document.getElementById(id + "_info_3").textContent = info_3;
        // sm display
    document.getElementById(id + "_2").textContent = info_2;
}

fetchDataAndDisplayK("K", "1_Place");
fetchDataAndDisplayK("K2", "2_Place");
fetchDataAndDisplayK("K3", "3_Place");
fetchDataAndDisplayK("K4", "4_Place");
fetchDataAndDisplayK("K5", "5_Place");
fetchDataAndDisplayK("K6", "6_Place");
fetchDataAndDisplayK("K7", "7_Place");
fetchDataAndDisplayK("K8", "8_Place");
fetchDataAndDisplayK("K9", "9_Place");
fetchDataAndDisplayK("K0", "10_Place");

// -----------------------------------------------------------------------------------------

// ใช้ URL อ้างอิงเพื่อสร้าง Firebase Storage Reference (Image)
const fileLocations = {
  image1: 'gs://tourist-attraction-80139.appspot.com/ถ้ำแม่อุสุ.jpeg',
  image2: 'gs://tourist-attraction-80139.appspot.com/น้ำตกทีลอซู.jpeg',
};

// ดึง URL และแสดงรูปภาพในแต่ละ id
for (const key in fileLocations) {
  const storageRef = ref(storage, fileLocations[key]);
  getDownloadURL(storageRef)
    .then((url) => {
      const imgElement = document.getElementById(key);
      imgElement.src = url;
    })
    .catch((error) => {
      console.error('เกิดข้อผิดพลาดในการดึง URL:', error);
    });
}

// -----------------------------------------------------------------------------------------

// FormTak
const formT = document.getElementById("addForm");
formT.addEventListener('submit', (e) => {
  e.preventDefault()

  // trim() ตรวจสอบข้อความว่างเปล่า
  const message = formT.fb.value.trim();

  const selectedOption = document.querySelector('input[name="options"]:checked');
  const selectedEmotion = selectedOption ? selectedOption.value : null; // ตรวจสอบว่ามีเลือกหรือไม่
  
  const currentTime = new Date();
  const timestamp = currentTime.toISOString();

  if (message === "") {
    // ถ้าข้อความว่างเปล่า
    alert("Please enter a message before submitting.");
  } else {
  addDoc(collection(db,'FeedbackTak'),{
    message: message,
    emotion: selectedEmotion,
    time: timestamp
  });

  // reset after submit
  formT.fb.value = ""
  if (selectedOption) {
    selectedOption.checked = false;
  }

  alert("Thank you for your feedback!!\nWe'll create more content soon.")
  }

});

// Reset Button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function (event) {
  const selectedOption = document.querySelector('input[name="options"]:checked');
  if (selectedOption) {
    selectedOption.checked = false;
  }
});
