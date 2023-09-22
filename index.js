const express = require("express");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib"); // Import the zlib library

const app = express();

// Serve your Unity WebGL build with custom middleware
app.use((req, res, next) => {
  const filePath = path.join(__dirname, "Build", req.url);
  console.log("filename:" + req.url);
  // Check if the requested file exists
  if (req.url == "/") {
    // File not found, serve index.html instead
    const indexPath = path.join(__dirname, "Build", "index.html");

    if (fs.existsSync(indexPath)) {
      // Set the Content-Type header to HTML
      res.setHeader("Content-Type", "text/html");

      // Serve the index.html file
      fs.createReadStream(indexPath).pipe(res);
    } else {
      // If index.html is not found, return a 404 response
      res.status(404).send("Not Found");
    }
  } else if (fs.existsSync(filePath)) {
    // Check if the file has a .gz extension
    if (req.url.endsWith(".gz")) {
      // Set the Content-Encoding header to gzip
      res.setHeader("Content-Encoding", "gzip");

      // Set the MIME type for .wasm.gz files to application/wasm
      if (req.url.endsWith(".wasm.gz")) {
        res.setHeader("Content-Type", "application/wasm");
      }
    }

    // Serve the file
    fs.createReadStream(filePath).pipe(res);
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
