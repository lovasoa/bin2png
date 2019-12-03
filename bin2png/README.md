# bin2png

For more information, please look at [**the project page**](https://github.com/lovasoa/bin2png#bin2png).

## Usage

To convert a file at the path `file.bin` to a png that will be created at the path `encoded.png`:

```
npx bin2png file.bin encoded.png
```

## Programmatic API

### (async) bin2png(data) → `{Promise.<Uint8Array>}`
Takes binary data in the form of an UInt8Array and returns binary data representing a valid PNG file containing the original data. The data can then be decoded with [png2bin](https://www.npmjs.com/package/png2bin).

#### Parameters
  * data 	`Uint8Array` The raw input data to encode.

### (async) encode_file(binFileName, pngFileName) → `{Promise.<Uint8Array>}`
Encodes a file with bin2png and saves the result in another file.

#### Parameters
 * binFileName 	`string` 	A path to an existing file to encode
 * pngFileName 	`string` 	A path to a file that will be created with the contents
