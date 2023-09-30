const fs = require("fs");
const _path_ = `./data.st.json`;
function readJson(fileLoc) {
    const data = fs.readFileSync(fileLoc, { encoding: "utf-8" });
    return JSON.parse(data);
}

const main = () => {
    (() => {
        console.clear();
        console.log(`Last Run : ${new Date().toLocaleTimeString()}`);
    })();
    const data = readJson(_path_);
    const limit = 10;
    const start = 9;
    const item = "TesLa".toUpperCase();

    let myData = data.filter((v) => v.name.toUpperCase().includes(item));

    console.log(myData);
};

main();
