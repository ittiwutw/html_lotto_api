const http = require("http");
var express = require("express");
var app = express();

const hostname = "127.0.0.1";
const port = 8082;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const curl = require("curl");
const url_lottovip = "https://www.lottovip.com/login"  
const url_jetsadabet = "https://www.jetsadabet.com/login"
const url_mawinbet = "https://mawinbet.com"
const url_choke77 = "http://choke77.com"
const url_huay = "https://www.huay.com/login#/lottery/result"


app.listen(8082, () => {
  console.log("Server running on port 8082");
});

app.get("/jetsadabet", (req, res, next) => {
  var result;
  curl.get(url_jetsadabet, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
      result = jetsadabet(body);
      res.json(result);
    } else {
      //some error handling
      console.log("error while fetching url");
    }
  });
//   res.json(result);
});

app.get("/jetsadabetvip", (req, res, next) => {
  var result;
  curl.get(url_jetsadabet, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
      result = jetsadabetvip(body);
      res.json(result);
    } else {
      //some error handling
      console.log("error while fetching url");
    }
  });
//   res.json(result);
});

app.get("/lottovip", (req, res, next) => {
    var result;
  curl.get(url_lottovip, null, (err, resp, body) => {
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

app.get("/huay", (req, res, next) => {
  var result;
curl.get(url_huay, null, (err, resp, body) => {
  if (resp.statusCode == 200) {
    result = huay(body);
    res.json(result);
  } else {
    //some error handling
    console.log("error while fetching url");
  }
});
//   res.json(result);
});

app.get("/mawinbet", (req, res, next) => {
  var result;
curl.get(url_mawinbet, null, (err, resp, body) => {
  if (resp.statusCode == 200) {
    result = mawinbet(body);
    res.json(result);
  } else {
    //some error handling
    console.log("error while fetching url");
  }
});
//   res.json(result);
});

app.get("/choke77", (req, res, next) => {
  var result;
  curl.get(url_choke77, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
      result = choke77(body);
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

function jetsadabet(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  //let's start extracting the data
  var items = $(".lotto-result");
  // console.log(items)
  var card = $(items)
      .children("tbody");
  // console.log(card)
  var result = [];
  // for (var i = 0; i < card.length; i++) {
    var innerInfo = $(card[4])
        .children("tr")
        ;

  for(var i = 0; i < innerInfo.length; i++){
    var box1 = $($(innerInfo[i]).find("td")[0]).html().trim();
    var box2 = $($(innerInfo[i]).find("td")[1]).html().trim();

    let getRes = {
      // res: innerInfo,
      box1: box1,
      box2: box2
    };
    result.push(getRes);

  }
  // }

  return result;
}

function jetsadabetvip(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  //let's start extracting the data
  var items = $(".lotto-result");
  console.log(items)
  var card = $(items)
      .children("tbody");
  // console.log(card)
  var result = [];
  // for (var i = 0; i < card.length; i++) {
    var innerInfo = $(card[5])
        .children("tr")
        ;

  for(var i = 0; i < innerInfo.length; i++){
    var box1 = $($(innerInfo[i]).find("td")[0]).html().trim();
    var box2 = $($(innerInfo[i]).find("td")[1]).html().trim();

    let getRes = {
      // res: innerInfo,
      box1: box1,
      box2: box2
    };
    result.push(getRes);

  }
  // }

  return result;
}

function mawinbet(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  //let's start extracting the data
  var items = $(".table-bordered");
      // .children("aaa");
  console.log(items)
  var card = $(items)
      .children("tbody");
  // console.log(card)
  var result = [];
  // for (var i = 0; i < card.length; i++) {
    var innerInfo = $(card[6])
        .children("tr")
        ;

  for(var i = 0; i < innerInfo.length; i++){
    var box1 = $($(innerInfo[i]).find("span")[0]).html();
    var box2 = $($(innerInfo[i]).find("span")[1]).html();

    let getRes = {
      // res: innerInfo,
      box1: box1,
      box2: box2
    };
    result.push(getRes);

  }
  // }

  return result;
}

function choke77(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  //let's start extracting the data
  var items = $("#pingpon-results");
  var card = $(items)
      .children("tbody").children("tr");

  var result = [];
  console.log(card.length)
  for (var i = 0; i < card.length; i++) {
    var innerInfo = $(card[i]);
    var res1 = $($(innerInfo).find("td")[1]).html();
    var res2 = $($(innerInfo).find("td")[2]).html();
    let getRes = {
      res1: res1,
      res2: res2
    }

    result.push(getRes);
  }

  return result;
}


function huay(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  //let's start extracting the data
  var items = $("#yeekee");
      // .children("aaa");
  // console.log(items.length)
  var card = $(items)
      .children(".col-12")
      .children(".background-card")
      .children(".card-body")
      // .children(".mb-2")
  console.log(card.length)

  const dom2 = new JSDOM(card.html());
  const $d = require("jquery")(dom2.window);
  var item2 = $d().html();

  var result = [];
  // for (var i = 0; i < card.length; i++) {
  //   var innerInfo = $(card[i])
  //       .children(".col-6")
  //       ;
  // console.log(innerInfo.length)
  // console.log(innerInfo)
  for(var i = 0; i < 1; i++){
    var box1 = $($(card[i]).find(".yeekee_last_result")).html();
  //   var box2 = $($(innerInfo[i]).find("p")[1]).html();

    let getRes = {
      // res: innerInfo,
      box1: card.html(),
      // box2: ]box2
    };
    result.push(getRes);

  }
  // }

  return result;
}
// }