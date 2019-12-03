var PNG = require('pngjs').PNG;

/**
 * Takes binary data in the form of an UInt8Array
 * and returns binary data representing a valid PNG file containing the original data.
 * The data can then be decoded with png2bin.
 * 
 * @param {Uint8Array} data 
 * @returns {Promise<Uint8Array>} pngData
 */
async function bin2png(data) {
    const width = 512;
    const height = Math.ceil((data.length + 4) / 3 / width);
    const png = new PNG({
        width: width,
        height: height,
        colorType: 2, // colortype 2 is RGB
        bitDepth: 8,
        bgColor: { red: 0xff, green: 0xff, blue: 0xff },
    });
    const surplus = (png.data.length / 4 | 0) * 3 - data.length;
    const inBuf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
    for (let i = 0; i < inBuf.length; i += 3) {
        let j = (i / 3 | 0) * 4;
        inBuf.copy(png.data, j, i, i + 3); // RGB
        png.data[j + 3] = 0xff;
    }
    png.data.writeUInt32LE(surplus, png.data.length - 4);
    png.data[png.data.length - 1] = 0xff;
    return streamToBuffer(png.pack());
}

function streamToBuffer(stream) {
    var bufs = [];
    stream.on("data", b => bufs.push(b));
    return new Promise(accept => {
        stream.on("end", () => accept(Buffer.concat(bufs)))
    });
}

if (typeof module !== "undefined") module.exports = { bin2png }