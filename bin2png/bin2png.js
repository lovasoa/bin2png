var fs = require('fs');
var encode = require('./encode.js');

if (process.argv.length < 4) {
    process.stderr.write("Usage: bin2png binary-file png-file");
    process.exit(1);
}

var binFileName = process.argv[2];
var pngFileName = process.argv[3];

console.log(`Converting ${binFileName} to ${pngFileName}`);

var binFile = fs.readFileSync(binFileName);

encode.encode(binFile).then(encoded => {
    fs.writeFileSync(pngFileName, encoded);
    var ratio = (encoded.length - binFile.length) / binFile.length;
    console.log(`Success. File size difference: ${(100 * ratio).toFixed(0)}%`);
});