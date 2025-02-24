const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
require("dotenv").config()

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

let files = [];
app.get("/", (req, res) => {
  res.send("<h1>Server from App Great started :)<h1/>");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  files.push(req.file);
  res.status(200).send("File uploaded successfully.");
});

app.get("/files", (req, res) => {
  res.status(200).json(files);
});

app.get("/files/:id", (req, res) => {
  const file = files.find((f) => f.filename === req.params.id);
  if (!file) {
    return res.status(404).send("File not found.");
  }
  res.status(200).sendFile(path.join(__dirname, "uploads", file.filename));
});

app.delete("/files/:id", (req, res) => {
  files = files.filter((f) => f.filename !== req.params.id);
  fs.unlink(path.join(__dirname, "uploads", req.params.id), (err) => {
    if (err) {
      return res.status(500).send("Failed to delete file.");
    }
    res.status(200).send("File deleted successfully.");
  });
});

app.get("/files/search", (req, res) => {
    const query = req.query.query;
    console.log("Search query:", query);
    const filteredFiles = files.filter((file) =>
      file.filename.includes(query)
    );
    console.log("Filtered files:", filteredFiles);
    res.status(200).json(filteredFiles);
  });
  

function loadExistingFiles() {
  const directoryPath = path.join(__dirname, "uploads");
  fs.readdir(directoryPath, (err, fileNames) => {
    if (err) {
      console.log("Failed to read the directory.");
      return;
    }
    fileNames.forEach((fileName) => {
      const filePath = path.join(directoryPath, fileName);
      const stats = fs.statSync(filePath);
      files.push({
        filename: fileName,
        path: filePath,
        size: stats.size,
        mimetype: "application/octet-stream",
      });
    });
  });
}

loadExistingFiles();

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
