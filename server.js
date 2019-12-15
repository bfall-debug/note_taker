const express = require("express");
const fs = require("fs");
const path = require('path');
const DB = require("./db/db.json")

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, './public')));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});