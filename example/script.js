import { initSqlJs } from "sql.js";
import { png2bin } from "png2bin";

async function main() {
    console.log(performance.now(), "Start loading");
    let fileImgs = Array.from(document.querySelectorAll("[data-filename]"));
    let fileNames = fileImgs.map(i => i.dataset.filename);
    let fileContents = await Promise.all(fileImgs.map(async f => await png2bin(f)));
    console.log(performance.now(), "Loaded all inline files");
    let fileBlobs = fileContents.map((x, i) => URL.createObjectURL(new Blob([x], fileImgs[i].dataset)));
    let SQL = await initSqlJs({
        locateFile: f => fileBlobs[fileNames.indexOf(f)] || f
    });
    console.log(performance.now(), "Loaded SQLite");
    console.log(new SQL.Database().prepare("select sqlite_version()").getAsObject({}));
    console.log(performance.now(), "Executed first query");
}

window.addEventListener('DOMContentLoaded', main);