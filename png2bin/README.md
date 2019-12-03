# png2bin

For more information, please look at [**the project page**](https://github.com/lovasoa/bin2png#bin2png).

## Usage

You first need to encode a file with [bin2png](https://www.npmjs.com/package/bin2png).
Then, you can inline it as a [base64 data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs), in an HTML file like this:

```html
<img id="myfile"
    decoding="async" loading="eager"
    style="display:none"
    src="data:image/png;base64,..." />
```

In your code, you can then decode the image and get back the original file data:

```js
import { png2bin } from "png2bin";

var img = document.getElementById("myfile");
var mydata = await png2bin(img);
// mydata is an Uint8Array with the contents of the original file
```

## API


### (async) png2bin(img) → `{Uint8Array}`
Decodes an image encoded with png2bin and returns the decoded file as an Uint8Array

#### Parameters

Name   | Type   | Description
-------|--------|-------------
img    | [`HTMLImageElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) | An image that has been encoded with png2bin
