# bin2png
Embed binary data inside an HTML file in an efficient way.

Sometimes, your script requires some binary data that is available at compile time,
and that you would like to inline in order to reduce the number of network roundtrips.
You could inline this data directly inside your script, as a `new Uint8Array([...])`,
but this would greatly increase your script's parse time, and the amount of data transferred.
Here, we propose a better alternative: package the binary data as an inline PNG image. The browser can load the inline image without blocking the JavaScript code, and you benefit from the deflate compression provided by the PNG format.

[![CI status](https://github.com/lovasoa/bin2png/workflows/Node%20CI/badge.svg)](https://github.com/lovasoa/bin2png/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7f568d67-7de0-45c8-b308-f6f84261f884/deploy-status)](https://app.netlify.com/sites/bin2png-example/deploys)
[![png2bin minified bundle size](https://img.shields.io/bundlephobia/minzip/png2bin)](https://bundlephobia.com/result?p=png2bin)

## How to use

You can see a full example of how to use `bin2png` and `png2bin` with an external build tool (in this case, parcel) in the [`example/`](./example/) folder. 

### Step 1: convert your binary files to png

Install **bin2png** in your dev dependencies (you only need it to build your html file):
```
npm install --save-dev bin2png
```

#### Use the CLI tool

You can use the [bin2png](https://www.npmjs.com/package/bin2png) CLI tool that is provided with the npm package:

```
npx bin2png file.bin encoded.png
```

#### Use the API
From a build script, you can use:

```js
const bin2png = require("bin2png").bin2png;

// bin2png takes an Uint8Array and returns another Uint8Array
const pngData = await bin2png(binaryData);
```


### Step 2: Use the png file


Add **png2bin** to your normal dependencies:

```
npm install png2bin
```

Then use the `png2bin` function from the package to decode the image:

#### In your HTML
```html
<img id="myfile"
    decoding="async" loading="eager"
    style="display:none"
    src="data:image/png;base64,..." />
```

#### In your JavaScript
```js
import { png2bin } from "png2bin";
const img = document.getElementById("myfile");
const mydata = await png2bin(img);
// mydata is now an Uint8Array with the contents of the original file
```
