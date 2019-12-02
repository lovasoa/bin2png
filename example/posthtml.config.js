var bin2png = require("bin2png").bin2png;
var fs = require("fs");

module.exports = {
    "plugins": [async function (tree) {
        var toDo = [];
        tree.walk((node) => {
            if (node.tag === "img" &&
                'data-filename' in node.attrs &&
                !node.attrs.src.endsWith(".png")) {
                var raw = fs.readFileSync(node.attrs.src);
                var task = bin2png(raw).then(encoded => {
                    var b64 = Buffer.from(encoded).toString('base64')
                    node.attrs.src = "data:image/png;base64," + b64;
                });
                toDo.push(task);
            }
            return node;
        });
        await Promise.all(toDo);
        return tree;
    }]
}