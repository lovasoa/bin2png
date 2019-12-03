var fs = require('fs').promises;
var bin2png = require('./encode.js').bin2png;

async function main(argv) {
    if (argv.length < 4) {
        process.stderr.write("Usage: bin2png binary-file png-file\n");
        process.exit(1);
    }

    var binFileName = argv[2];
    var pngFileName = argv[3];

    console.log(`Converting ${binFileName} to ${pngFileName}`);

    var binFile = await fs.readFile(binFileName);

    var encoded = await bin2png(binFile);
    await fs.writeFile(pngFileName, encoded);
    var ratio = (encoded.length - binFile.length) / binFile.length;
    console.log(`Success. File size difference: ${(100 * ratio).toFixed(0)}%`);
}

module.exports = { main, bin2png };

if (require.main === module) {
    main(process.argv);
}