const fs = require("fs");
const XLSX = require("xlsx");
const request = require("request");

const downloadSheetsUrl =
  "https://docs.google.com/spreadsheets/d/1jixZAdc7uV2LSPhieUQaQUvyQdvwp4PogFdlwTqh8xA/export?format=xlsx";
const file = fs.createWriteStream(`${__dirname}/moneygone_locales.xlsx`);
function doRequest(options) {
  return new Promise((resolve, reject) => {
    console.log("options", options);
    let req = request(options);

    req.on("response", (response) => {
      console.log("response", response);
      response.pipe(file);
      resolve(response);
    });

    req.on("error", (err) => {
      console.log("err", err);
      reject(err);
    });
  });
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const init = async () => {
  await doRequest({ url: downloadSheetsUrl, method: "GET" });
  await sleep(2000);
  let workbook = XLSX.readFile(`${__dirname}/moneygone_locales.xlsx`);
  let { SheetNames, Sheets } = workbook;
  let localesMap = {};
  //let jsonSheet = XLSX.utils.sheet_to_json(Sheets[SheetNames[0]]);
  for (var i = 0; i < SheetNames.length; i++) {
    console.log("SheetNames[i]", SheetNames[i]);
    let jsonSheet = XLSX.utils.sheet_to_json(Sheets[SheetNames[i]], {
      raw: false,
    }); //raw:false 就算欄位是數值也會回 "1"

    jsonSheet.forEach(function (row) {
      let { key, ...trans } = row;
      for (let lang in trans) {
        localesMap[lang] = localesMap[lang] || {};
        localesMap[lang] = { ...localesMap[lang], [key]: trans[lang] };
      }
    });
    console.log("jsonSheet", jsonSheet);
    console.log("localesMap", localesMap);
  }

  let path = `${__dirname}/../locales`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  for (let lang in localesMap) {
    let locale = localesMap[lang];
    fs.writeFileSync(`${path}/${lang}.json`, JSON.stringify(locale));
  }
};
init();
