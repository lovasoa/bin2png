# bin2png
Embed binary data inside an HTML file in an efficient way.

## How to use

### Step 1: convert your binary files to png

Install **bin2png** in your dev dependencies (you only need it to build your html file):
```
npm install --save-dev bin2png
```

Use [bin2png](https://www.npmjs.com/package/bin2png):

```
npx bin2png file.bin encoded.png
```

### Step 2: Use the png file


Add **png2bin** to your normal dependencies:

```
npm install png2bin
```

Then use the `png2bin` function from the package to decode the image:

```html
<img id="myfile"
    decoding="async" loading="eager"
    style="display:none"
    src="data:image/png;base64,..." />

<script>
    var img = document.getElementById("myfile");
    img.onload = async function(){
        var mydata = await png2bin(img);
        // mydata is an Uint8Array with the contents of the original file
    }
</script>
```
