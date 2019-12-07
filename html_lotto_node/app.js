const http = require("http");
var express = require("express");
var app = express();

const hostname = "127.0.0.1";
const port = 8082;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const curl = require("curl");
const url = "https://www.lottovip.com/login";

app.listen(8082, () => {
  console.log("Server running on port 8082");
});

// const server = http.createServer((req, res) => {
//   curl.get(url, null, (err, resp, body) => {
//     if (resp.statusCode == 200) {
//       parseData(body);
//     } else {
//       //some error handling
//       console.log("error while fetching url");
//     }
//   });

//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World\n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

app.get("/lottovip", (req, res, next) => {
    var result;
  curl.get(url, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
      result = parseData(body);
      res.json(result);
    } else {
      //some error handling
      console.log("error while fetching url");
    }
  });
//   res.json(result);
});

function parseData(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  //let's start extracting the data
  var items = $("#yeekee");
  var card = $(items)
    .children(".pc-view")
    .children(".px-0")
    .children(".px-1");

    var result = [];
  for (var i = 0; i < card.length; i++) {
    var innerInfo = $(card[i])
      .children(".mb-2")
      .children(".p-0")
      .children(".d-flex")
      .children(".card");
    var treeup = $($(innerInfo).find("p")[0]).html();
    var twolow = $($(innerInfo).find("p")[1]).html();
    console.log(
      "งวดที่ " + (i + 1) + " -> 3 ตัวบน " + treeup + " : 2 ตัวล่าง : " + twolow
    );
    let getRes = {
        tree: treeup,
        two: twolow
    }

    result.push(getRes);
  }

  return result;
}
