const { JSDOM } = require("jsdom");
const { png2bin } = require("./png2bin.js");
const assert = require("assert");
const fs = require("fs").promises;

async function test_png2bin() {
    const { window } = new JSDOM(`<img id="i" src="../tests/encoded.txt.png" />`, {
        resources: "usable",
        url: "file://" + __filename
    });
    const img = window.document.getElementById("i");
    const [decoded, expected] = await Promise.all([
        png2bin(img),
        fs.readFile("../tests/raw.txt", "ascii")
    ]);
    const encodedTxt = Buffer.from(decoded.buffer).toString("ascii");
    assert.equal(encodedTxt, expected);
}

test_png2bin().catch(e => {
    console.error(e);
    process.exit(1);
}).then(_ => {
    console.log("Success.");
});