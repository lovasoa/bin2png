# png2bin

## Usage

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