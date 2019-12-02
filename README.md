# bin2png
Embed binary data inside an HTML file in an efficient way.

## How to use

### Step 1: convert your binary files to png

Use [bin2png](./bin2png/)

```
npx bin2png file.bin encoded.png
```

### Step 2: Use the png file

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