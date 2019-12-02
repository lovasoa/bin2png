# bin2png integration example

This is an example app that demonstrates the use of bin2png. You can see it running at https://bin2png-example.netlify.com

### Build

The build is handled by [parcel](https://parceljs.org/).

At build time, [bin2png](https://www.npmjs.com/package/bin2png) is used to convert a `.wasm` file to a png image.
(See [posthtml.config.js](https://github.com/lovasoa/bin2png/blob/master/example/posthtml.config.js))

This image is then inlined as base64 inside an HTML file,
and all the dependencies are bundled in a single HTML file using [parcel-plugin-inliner](https://www.npmjs.com/package/parcel-plugin-inliner).

### Runtime

At runtime, [`script.js`](./script.js) loads [png2bin](https://www.npmjs.com/package/png2bin)
to recreate the original `.wasm` file, and uses it to load [sql.js](https://github.com/kripken/sql.js).
