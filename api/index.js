const express = require("express");
const multer = require("multer");
const cors = require("cors");
const User = require("./models/User")
const Post = require("./models/Post")
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
require("dotenv").config();

const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, deleteObject, getDownloadURL} = require("firebase/storage");
const firebaseConfig = require("./firebase.config");
const firebaseApp  = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
async function uploadToFirebase(file, docId) {
  if(!file) return "";

  const { originalname, buffer } = file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const fileRef = ref(storage, `posts/${docId}.${ext}`);

  await uploadBytes(fileRef, buffer);

  return await getDownloadURL(fileRef);
}

async function deleteCover(docId) {
  const postDoc = await Post.findById(docId);
  const fileRef = ref(storage, `posts/${docId}.png`);
  await deleteObject(fileRef);
}

const app = express();
const upload = multer();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use(cors({credentials: true, origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));


app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const {username, password} = req.body;
  try {

    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    })
    res.json(userDoc);
  } catch(e) {
    res.status(400).json(e);
  }

});


app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  if(!userDoc) {
    return res.status(400).json("not username found");
  }
  const passOk = bcrypt.compareSync(password , userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
      if(err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if(err) throw err;
    res.json(info);
  })
});


app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});


app.post("/post", upload.single('file'), async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const {token} = req.cookies;
  const {title, summary, content} = req.body;

  const docId = new mongoose.Types.ObjectId();


  const url = await uploadToFirebase(req.file, docId);

  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const postDoc = await Post.create({
      _id: docId,
      title,
      summary,
      content,
      author: info.id,
      cover: url,
    })

    res.json(postDoc);
  })
});

app.get("/post", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({createdAt: -1})
    .limit(20);
  res.json(posts);
})


app.get("/post/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});


app.put("/post", upload.single('file'), async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const {id, title, summary, content } = req.body;

  const url = await uploadToFirebase(req.file, id);

  const { token } = req.cookies; //
  jwt.verify(token, secret, {}, async (err, info) => {
    if(err) throw err;

    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if(!isAuthor) {
      return res.status(400).json("you are not the author");
    }

    // Update the properties of postDoc
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    postDoc.cover = url ? url  : postDoc.cover;

    // Save the updated document
    await postDoc.save();

    res.json(postDoc);
  });

});

app.delete("/post", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const { id } = req.body;
  await deleteCover(id);

  await Post.findByIdAndDelete(id);
  res.json("ok");
})

app.listen(4000);



