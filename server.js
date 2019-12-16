const express = require("express");
const fs = require("fs");
const path = require('path');
// const DB = require("./db/db.json")

// =============== Initialize Server =================
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

// ================API Routes ========================
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
});

app.post("/api/notes", (req, res) => {
    
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        if (err) return err;

        const note = req.body
        const items = JSON.parse(data)

        const len = items.length
        let id = 0
        if(len > 0){
            id = items[items.length-1].id 
        }

        note.id = id + 1
        items.push(note)

        fs.writeFile('./db/db.json', JSON.stringify(items), function (err) {
            if (err) return err;
        });

    });

    res.sendFile(path.join(__dirname, './db/db.json'))
});

app.delete("/api/notes/:id", (req,res) => {
    let deleteId = req.params.id

    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        if (err) return err;

        let items = JSON.parse(data)
        newList = items.filter(function(item){
            return item.id != deleteId
        })

        fs.writeFile('./db/db.json', JSON.stringify(newList), function (err) {
			if (err) throw err;
		});

    });

    res.sendFile(path.join(__dirname, './db/db.json'))
});

// ============= HTML Routes =======================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// ============== Run Server =====================
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});