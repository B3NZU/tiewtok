const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require('ejs');
const path = require('path');
const mysql = require('mysql');

app.set('view engine', 'ejs');

// ระบุโฟลเดอร์ที่ใช้สำหรับเก็บไฟล์มุมมอง
app.set('views', path.join(__dirname, 'views'));

const admin = require("firebase-admin");
const credentials = require("./key.json");
const exp = require("constants");

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    storageBucket: "gs://tourist-attraction-80139.appspot.com"
});

app.use(express.static('public'))

// ที่เที่ยวตาก
app.get('/Travel_Tak', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Tak_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["wtrs_1.jpg", "wtrs_2.jpg", "rgd.jpg", "rgd2.jpg", "caveus1.jpeg", "caveus2.jpeg",
                          "chaodoi.jpg", "chaodoi2.jpeg", "doi_bbt.jpg", "doi_bbt2.jpg", "blue.jpeg", "blue1.jpeg",
                          "boo.jpeg", "boo2.jpeg", "bri.jpeg", "bri2.jpeg", "mon.jpeg", "mon2.jpeg"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }

    }

    data.imageUrls = imageUrls;
    res.render('travel_Tak.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// ที่เที่ยวกาญจนบุรี
app.get('/Travel_Kan', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Kan_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["_Kplace1.1.jpeg", "_Kplace1.2.jpeg", "_Kplace2.1.jpeg", "_Kplace2.2.jpeg",
      "_Kplace3.1.jpeg", "_Kplace3.2.jpeg", "_Kplace4.1.jpg", "_Kplace4.2.jpeg", "_Kplace5.1.jpg", "_Kplace5.2.jpeg",
      "_Kplace6.1.jpeg", "_Kplace6.2.jpeg", "_Kplace7.1.jpeg", "_Kplace7.2.jpeg", "_Kplace8.1.png", "_Kplace8.2.jpeg",
      "_Kplace9.1.jpeg", "_Kplace9.2.jpeg", "_Kplace10.1.jpeg", "_Kplace10.2.jpeg"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`Kan/${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }

    }

    data.imageUrls = imageUrls;
    res.render('travel_Kan.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// ที่เที่ยวราชบุรี
app.get('/Travel_Rat', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Rat_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["_Rplace1.1.jpeg", "_Rplace1.2.jpeg", "_Rplace2.1.jpeg", "_Rplace2.2.jpeg",
      "_Rplace3.1.jpeg", "_Rplace3.2.jpeg", "_Rplace4.1.jpeg", "_Rplace4.2.jpeg", "_Rplace5.1.jpeg", "_Rplace5.2.jpeg",
      "_Rplace6.1.jpeg", "_Rplace6.2.jpeg", "_Rplace7.1.jpeg", "_Rplace7.2.jpeg", "_Rplace8.1.jpeg", "_Rplace8.2.jpeg",
      "_Rplace9.1.jpeg", "_Rplace9.2.jpeg", "_Rplace10.1.jpeg", "_Rplace10.2.png"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`Rat/${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }

    }

    data.imageUrls = imageUrls;
    res.render('travel_Rat.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// ที่เที่ยวเพชรบุรี
app.get('/Travel_Phet', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Phet_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["_PHplace1.1.jpeg", "_PHplace1.2.jpeg", "_PHplace2.1.jpeg", "_PHplace2.2.jpeg",
      "_PHplace3.1.jpeg", "_PHplace3.2.jpeg", "_PHplace4.1.jpeg", "_PHplace4.2.jpeg", "_PHplace5.1.jpeg", "_PHplace5.2.jpeg",
      "_PHplace6.1.jpeg", "_PHplace6.2.jpeg", "_PHplace7.1.jpeg", "_PHplace7.2.jpeg", "_PHplace8.1.jpeg", "_PHplace8.2.jpeg",
      "_PHplace9.1.jpeg", "_PHplace9.2.jpeg", "_PHplace10.1.jpg", "_PHplace10.2.jpeg"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`Phet/${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }

    }

    data.imageUrls = imageUrls;
    res.render('travel_Phet.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// ที่เที่ยวประจวบคีรีขันธ์
app.get('/Travel_Prac', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Prac_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["_PRplace1.1.jpeg", "_PRplace1.2.jpeg", "_PRplace2.1.jpeg", "_PRplace2.2.jpeg",
      "_PRplace3.1.jpeg", "_PRplace3.2.jpeg", "_PRplace4.1.jpeg", "_PRplace4.2.jpeg", "_PRplace5.1.jpeg", "_PRplace5.2.jpeg",
      "_PRplace6.1.jpeg", "_PRplace6.2.jpeg", "_PRplace7.1.jpeg", "_PRplace7.2.jpeg", "_PRplace8.1.jpeg", "_PRplace8.2.jpeg",
      "_PRplace9.1.jpeg", "_PRplace9.2.jpeg", "_PRplace10.1.jpeg", "_PRplace10.2.jpeg"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`Prac/${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }

    }

    data.imageUrls = imageUrls;
    res.render('travel_Prac.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// Home
app.get("/home", function(request, response) {
  response.sendFile(path.join(__dirname + "/home.html"));
});

// ------------------------------------------------------------------------------------------

const mysql2 = require('mysql2');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'travel_history'
});

// ประวัติจังหวัดตาก
app.get('/History_Tak', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Tak.ejs', { row: rows[0] });
  });
});

// ประวัติจังหวัดกาญจนบุรี
app.get('/History_Kan', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Kan.ejs', { row: rows[1] });
  });
});

// ประวัติจังหวัดกาญราชบุรี
app.get('/History_Rat', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Rat.ejs', { row: rows[2] });
  });
});

// ประวัติจังหวัดเพชรบุรี
app.get('/History_Phet', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Phet.ejs', { row: rows[3] });
  });
});

// ประวัติจังหวัดประจวบคีรีขันธ์
app.get('/History_Prac', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Prac.ejs', { row: rows[4] });
  });
});

// ------------------------------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// fb_data
app.get("/access", function(request, response) {
  response.sendFile(path.join(__dirname + "/feedback_data.html"));
});

app.post('/feedback_data', async (req, res) => {
  const username = req.body.user;
  const password = req.body.pass;
  
  const sql = `SELECT * FROM data_access WHERE user = '${username}' AND pass = '${password}'`;

  connection.query(sql, async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      try {
        const snapshotT = await db.collection('FeedbackTak').get();
        const feedbackDataT = [];
        const snapshotK = await db.collection('FeedbackKan').get();
        const feedbackDataK = [];
        const snapshotPr = await db.collection('FeedbackPrac').get();
        const feedbackDataPr = [];
        const snapshotPh = await db.collection('FeedbackPhet').get();
        const feedbackDataPh = [];
        const snapshotR = await db.collection('FeedbackRat').get();
        const feedbackDataR = [];

        snapshotT.forEach((doc) => {
          feedbackDataT.push(doc.data());
        });
        snapshotK.forEach((doc) => {
          feedbackDataK.push(doc.data());
        });
        snapshotPr.forEach((doc) => {
          feedbackDataPr.push(doc.data());
        });
        snapshotPh.forEach((doc) => {
          feedbackDataPh.push(doc.data());
        });
        snapshotR.forEach((doc) => {
          feedbackDataR.push(doc.data());
        });

        res.render('fb.ejs', { feedbackDataT, feedbackDataK, feedbackDataPr, feedbackDataPh, feedbackDataR });
      } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).send('Error fetching feedback');
      }
    } else {
      res.send('Invalid username or password!');
    }
  });
});

// ------------------------------------------------------------------------------------------

const db = admin.firestore();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

