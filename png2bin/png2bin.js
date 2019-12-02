/**
 * Decodes an image encoded with png2bin
 * 
 * @param {HTMLImageElement} img An image that has been encoded with png2bin
 * @returns {Uint8Array} decoded file
 */
async function png2bin(img) {
    var canvas = document.createElement("canvas");
    var img = await imgLoad(img);
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (var i = 0; i < data.length; i += 4) { // Remove alpha bytes
        var j = (i / 4 | 0) * 3;
        data.copyWithin(j, i, i + 3);
    }
    data[data.length - 1] = 0x00;
    var surplus = new DataView(data.buffer, data.length - 4, 4).getUint32(0, true);
    var length = (data.length / 4 | 0) * 3 - surplus;
    return data.slice(0, length);
}

function imgLoad(img) {
    return new Promise(function (accept, reject) {
        if (img.complete) accept(img);
        img.onerror = reject;
        img.onload = accept.bind(null, img);
    });
}

if (typeof module !== "undefined") module.exports = { png2bin }