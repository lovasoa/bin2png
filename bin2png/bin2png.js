var fs = require('fs').promises;
var bin2png = require('./encode.js').bin2png;

/**
 * Encodes a file with bin2png and saves the result in another file.
 * 
 * @param {string} binFileName A path to an existing file to encode
 * @param {string} pngFileName A path to a file that will be created with the contents
 * @returns {Promise<Uint8Array>} the encoded file
 */
async function encode_file(binFileName, pngFileName) {
    var binFile = await fs.readFile(binFileName);
    var encoded = await bin2png(binFile);
    await fs.writeFile(pngFileName, encoded);
    return encoded;
}

async function main(argv) {
    if (argv.length < 4) {
        process.stderr.write("Usage: bin2png binary-file png-file\n");
        process.exit(1);
    }
    console.log(`Converting ${binFileName} to ${pngFileName}`);
    var encoded = await encode_file(argv[2], argv[3])
    var ratio = (encoded.length - binFile.length) / binFile.length;
    console.log(`Success. File size difference: ${(100 * ratio).toFixed(0)}%`);
}

module.exports = { main, bin2png, encode_file };

if (require.main === module) {
    main(process.argv);
}