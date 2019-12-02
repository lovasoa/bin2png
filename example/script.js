import { png2bin } from "png2bin";
import initSqlJs from "sql.js";

console.log(performance.now(), "Start script execution");

async function main() {
    console.log(performance.now(), "Start loading");
    let fileImgs = Array.from(document.querySelectorAll("[data-filename]"));
    let fileNames = fileImgs.map(i => "" + i.dataset.filename);
    let fileContents = await Promise.all(fileImgs.map(async f => await png2bin(f)));
    console.log(performance.now(), "Loaded all inline files");
    let fileBlobs = fileContents.map((x, i) => URL.createObjectURL(new Blob([x], fileImgs[i].dataset)));
    let SQL = await initSqlJs({
        locateFile: f => fileBlobs[fileNames.indexOf(f)] || f
    });
    console.log(performance.now(), "Loaded SQLite");
    var result = new SQL.Database().prepare("select sqlite_version()").getAsObject({});
    console.log(performance.now(), "Executed first query");
    document.getElementById("result").textContent = JSON.stringify(result, 0, "\t");
}

window.addEventListener('DOMContentLoaded', main);