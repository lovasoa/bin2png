const assert = require("assert");
const fs = require("fs").promises;
const { spawn } = require('child_process');
const bin2png = require("./bin2png.js")

async function test_bin2png() {
    const raw = await fs.readFile("../tests/raw.txt");
    const encoded = await bin2png.bin2png(raw);
    const expected = await fs.readFile("../tests/encoded.txt.png");
    assert.deepEqual(encoded, expected);
}

test_bin2png().catch(e => {
    console.error(e);
    process.exit(1);
}).then(_ => {
    console.log("Success.");
})