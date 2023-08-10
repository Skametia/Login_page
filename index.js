const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
let result = []; // Store submitted messages in an array
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  // Join all stored messages and display them
  const messageHtml = result.map((message) => `<p>${message}</p>`).join("");
  res.send(
    `<html><body>${messageHtml}<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body></html>`
  );
});
app.post("/message", (req, res) => {
  try {
    const data = req.body.message;
    const filePath = "message.txt";
    result.push(data); // Store the submitted message

    // Append data to the file asynchronously
    fs.appendFile(filePath, data + "\n", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Error writing file.");
      } else {
        console.log("Message written to file successfully.");
        res.redirect("/"); // Redirect back to the main page
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error handling request.");
  }
});

app.listen(3000, () => {
  console.log("connected...");
});
