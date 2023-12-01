// navbar
var menuHolder = document.getElementById('menuHolder')
var siteBrand = document.getElementById('siteBrand')
function menuToggle(){
  if(menuHolder.className === "drawMenu") menuHolder.className = ""
  else menuHolder.className = "drawMenu"
}
if(window.innerWidth < 426) siteBrand.innerHTML = "MAS"
window.onresize = function(){
  if(window.innerWidth < 420) siteBrand.innerHTML = "MAS"
  else siteBrand.innerHTML = "TIEWTOK"
}

// ------------------------------------------------------------------------------------------

// 3D Box
const nodes = [].slice.call(document.querySelectorAll('li'), 0);
const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
const classNames = ['in', 'out'].map(p => Object.values(directions).map(d => `${p}-${d}`)).reduce((a, b) => a.concat(b));

const getDirectionKey = (ev, node) => {
  const { width, height, top, left } = node.getBoundingClientRect();
  const l = ev.pageX - (left + window.pageXOffset);
  const t = ev.pageY - (top + window.pageYOffset);
  const x = l - width / 2 * (width > height ? height / width : 1);
  const y = t - height / 2 * (height > width ? width / height : 1);
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
};

class Item {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('mouseover', ev => this.update(ev, 'in'));
    this.element.addEventListener('mouseout', ev => this.update(ev, 'out'));
  }

  update(ev, prefix) {
    this.element.classList.remove(...classNames);
    this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
  }}


nodes.forEach(node => new Item(node));

// ------------------------------------------------------------------------------------------

// Map
const card = document.querySelector('.map-card-container');
const cardBody = card.querySelector('.card-body');

card.addEventListener('click', () => {
  cardBody.classList.toggle('closed')
})

// ------------------------------------------------------------------------------------------

// Video
console.clear();

var videoEl = document.querySelector("video");
document.querySelector(".video-button").addEventListener("click", function () {
  if (this.dataset.aperture === "open") {
    this.dataset.aperture = "closed";
    videoEl.pause();
    videoEl.progress = 0;
  } else {
    this.dataset.aperture = "open";
    videoEl.play();
  }
});

// ------------------------------------------------------------------------------------------

// Bookmark
function bookmarkSection(sectionName) {
  // รับ URL ปัจจุบันของส่วนนี้
  var sectionURL = window.location.href;

  // บันทึก URL ของส่วนนี้ลงใน localStorage
  localStorage.setItem(sectionName, sectionURL);

  // แสดงรายการ bookmark ที่บันทึกไว้ (คุณสามารถแสดงในส่วนอื่นได้)
  displayBookmarks();
}

function displayBookmarks() {
  // ดึงข้อมูล bookmark จาก localStorage
  var bookmarks = {};

  for (var i = 0; i < localStorage.length; i++) {
      var sectionName = localStorage.key(i);
      var sectionURL = localStorage.getItem(sectionName);
      bookmarks[sectionName] = sectionURL;
  }

  // แสดงรายการ bookmark ในส่วนที่คุณต้องการ
  var bookmarksContainer = document.getElementById('bookmarks-container'); // แท็กหรือส่วนที่คุณต้องการแสดงรายการ bookmark
  bookmarksContainer.innerHTML = '';

  for (var sectionName in bookmarks) {
      var bookmarkURL = bookmarks[sectionName];
      var listItem = document.createElement('li');
      listItem.innerHTML = `<a href="${bookmarkURL}">${sectionName}</a>`;
      bookmarksContainer.appendChild(listItem);
  }
}

// ------------------------------------------------------------------------------------------

// Feedback Form 
  // connect Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

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

// Form each Province
function submitForm(formId, collectionName) {

  const currentURL = window.location.pathname;

  // กำหนด formId และ collectionName ตาม URL
  if (currentURL === '/Travel_Tak') {
    formId = 'addFormTak';
    collectionName = 'FeedbackTak';
  } else if (currentURL === '/Travel_Kan') {
    formId = 'addFormKan';
    collectionName = 'FeedbackKan';
  } else if (currentURL === '/Travel_Rat') {
    formId = 'addFormRat';
    collectionName = 'FeedbackRat';
  } else if (currentURL === '/Travel_Prac') {
    formId = 'addFormPrac';
    collectionName = 'FeedbackPrac';
  } else if (currentURL === '/Travel_Phet') {
    formId = 'addFormPhet';
    collectionName = 'FeedbackPhet';
  }
  console.log(formId, collectionName)

  const form = document.getElementById(formId);
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = form.fb.value.trim();
    const selectedOption = document.querySelector('input[name="options"]:checked');
    const selectedEmotion = selectedOption ? selectedOption.value : null;
    const currentTime = new Date();
    const timestamp = currentTime.toISOString();

    if (message === "") {
      alert("Please enter a message before submitting.");
    } else {
      addDoc(collection(db, collectionName), {
        message: message,
        emotion: selectedEmotion,
        time: timestamp
      });

      // reset after submit
      form.fb.value = "";
      if (selectedOption) {
        selectedOption.checked = false;
      }

    console.log(collectionName + ": ", message, selectedEmotion, timestamp);

      alert("Thank you for your feedback!!\nWe'll create more content soon.");
    }

  });
}
submitForm("", "");

// ------------------------------------------------------------------------------------------

// Reset Button (Feedback)
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function (event) {
  const selectedOption = document.querySelector('input[name="options"]:checked');
  if (selectedOption) {
    selectedOption.checked = false;
  }
});

