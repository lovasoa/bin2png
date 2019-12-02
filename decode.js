async function loadFile(img) {
    var canvas = document.createElement("canvas");
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

if (typeof module !== "undefined") module.exports = { loadFile }