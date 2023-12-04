const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage, 
    limits: { fileSize: 15000 },
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png") {
    //         cb(null, true);
    //     } else {
    //         return cb(new Error('Invalid mime type'));
    //     }
    // }
});

const getColors = require('get-image-colors')

const hex_keys = {
    "0000": "0", "0001": "1", "0010": "2", "0011": "3", "0100": "4", "0101": "5", "0110": "6",
    "0111": "7", "1000": "8", "1001": "9", "1010": "A", "1011": "B", "1100": "C", "1101": "D",
    "1110": "E", "1111": "F"
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function convert_color(colors) {
    let hex = colors.join('')
    console.log("COLOR HEX: " + hex)
    let binary = ""
    for (let letter in hex) {
        console.log("COLOR LETTER: " + hex[letter])
        binary += getKeyByValue(hex_keys, hex[letter])
    }
    console.log("COLOR BINARY: " + binary)
    binary = binary.match(/.{1,8}/g)
    console.log("COLOR BINARY GROUPS: " + binary)
    let word = ""
    for (let group in binary) {
        let charInt = parseInt(binary[group], 2)
        let letter = String.fromCharCode(charInt)
        word += letter
    }
    return word
}

function convert_word(word) {
    if (word !== '') {
        let groups = []

        let binary = "";
        for (let letter in word) {
            let b_letter = word[letter].charCodeAt(0).toString(2);
            while (b_letter.length < 8) {
                b_letter = "0" + b_letter;
            }
            binary += b_letter
            console.log("WORD BINARY LETTER: " + b_letter);
        }
        console.log("WORD BINARY: " + binary);
        let hex_groups = binary.match(/.{1,4}/g)
        console.log("WORD HEX GROUPS: " + hex_groups);
        let hex = "";
        for (let group in hex_groups) {
            hex += hex_keys[hex_groups[group]];
        }
        console.log("WORD HEX: " + hex);
        hex_groups = hex.match(/.{1,6}/g);
        console.log(hex_groups)
        return hex_groups
    }
    return false
}

function analyze_image(image_buffer) {
    getColors(image_buffer, 'image/png').then(colors => {
        for (let color of colors) {
            console.log("COLOR: " + color)
        }
    })
}

app.post('/convert_word', (req, res) => {
    console.log(req.body)
    let hex_groups = convert_word(req.body.word)
    res.send({ "hex_groups": hex_groups })
})

app.post('/convert_color', (req, res) => {
    console.log(req.body)
    let word = convert_color(req.body.color)
    res.send({ "word": word })
})

const uploadSingleImage = upload.single('image');

app.post("/upload", function (req, res) {
    uploadSingleImage(req, res, function (err) {
        if (err) {
            return res.status(400).send({ message: err.message })
        }

        // // Everything went fine.
        // const file = req.file;
        // res.status(200).send({
        //     filename: file.filename,
        //     mimetype: file.mimetype,
        //     originalname: file.originalname,
        //     size: file.size,
        //     fieldname: file.fieldname
        // })
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})