const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fileSize: 100000 } })

const getColors = require('get-image-colors')
const sizeOf = require('buffer-image-size')
const getPixels = require('get-pixels')

const hex_keys = {
    "0000": "0", "0001": "1", "0010": "2", "0011": "3", "0100": "4", "0101": "5", "0110": "6",
    "0111": "7", "1000": "8", "1001": "9", "1010": "A", "1011": "B", "1100": "C", "1101": "D",
    "1110": "E", "1111": "F"
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
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

        let binary = ""
        for (let letter in word) {
            let b_letter = word[letter].charCodeAt(0).toString(2)
            while (b_letter.length < 8) {
                b_letter = "0" + b_letter
            }
            binary += b_letter
            console.log("WORD BINARY LETTER: " + b_letter)
        }
        console.log("WORD BINARY: " + binary)
        let hex_groups = binary.match(/.{1,4}/g)
        console.log("WORD HEX GROUPS: " + hex_groups)
        let hex = ""
        for (let group in hex_groups) {
            hex += hex_keys[hex_groups[group]]
        }
        console.log("WORD HEX: " + hex)
        hex_groups = hex.match(/.{1,6}/g)
        console.log(hex_groups)
        return hex_groups
    }
    return false
}

async function analyze_image(image_buffer) {
    let color_list = []
    await getColors(image_buffer, 'image/png').then(colors => {
        for (let color of colors) {
            // console.log("COLOR: " + color)
            color_list.push(color.hex().replace("#",""))
        }
    })
    return color_list
    // console.log(color_list)
    // let test = convert_color(color_list)
    // console.log(test)
    // return true
}

app.post('/words', (req, res) => {
    console.log(req.body)
    let hex_groups = convert_word(req.body.word)
    res.send({ "hex_groups": hex_groups })
})

app.post('/colors', (req, res) => {
    console.log(req.body)
    let word = convert_color(req.body.colors)
    res.send({ "word": word })
})

// app.post("/upload", upload, async function (req, res) {
//     console.log(req.body)
//     console.log(req.file)
//     // analyze_image(req.file.buffer)
//     res.sendStatus(200)
//   })

app.post("/upload", upload.single("image"), async function (req, res) {
    console.log(req.file);
    console.log(req.body.extra);
    let colors = await analyze_image(req.file.buffer)
    colors.push(req.body.extra)
    console.log("COLORS: ", colors)
    let word = convert_color(colors)
    // res.sendStatus(200);
    res.send({ "word": word })
  });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})