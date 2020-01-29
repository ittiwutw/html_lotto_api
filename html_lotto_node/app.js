const http = require("http");
var express = require("express");
var app = express();
var masterRepo = require("./repo/masterRepo");

const hostname = "127.0.0.1";
const port = 8080;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const curl = require("curl");
const url_lottovip = "https://www.lottovip.com/login";
const url_jetsadabet = "https://www.jetsadabet.com/login";
const url_mawinbet = "https://mawinbet.com";
const url_choke77 = "http://choke77.com";
const url_huay = "https://www.huay.com/login#/lottery/result";

app.listen(port, () => {
  console.log("Server running on port" + port);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
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

app.get("/huay_vip", (req, res, next) => {
  var result;
  curl.get(url_huay, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
      result = huay_vip(body);
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

app.get("/huay1", (req, res, next) => {
  getHuay1().then(val => {
    res.json(val);
  });
  
  //   res.json(result);
});

async function getHuay1() {
  var data = await masterRepo.getHuay1();

  // callback("", { response_code: "0000", response_description: "SUCCESS" , data});
  return data;
}

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
    };

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
  var card = $(items).children("tbody");
  // console.log(card)
  var result = [];
  // for (var i = 0; i < card.length; i++) {
  var innerInfo = $(card[4]).children("tr");
  for (var i = 0; i < innerInfo.length; i++) {
    var box1 = $($(innerInfo[i]).find("td")[0])
      .html()
      .trim();
    var box2 = $($(innerInfo[i]).find("td")[1])
      .html()
      .trim();

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
  console.log(items);
  var card = $(items).children("tbody");
  // console.log(card)
  var result = [];
  // for (var i = 0; i < card.length; i++) {
  var innerInfo = $(card[5]).children("tr");
  for (var i = 0; i < innerInfo.length; i++) {
    var box1 = $($(innerInfo[i]).find("td")[0])
      .html()
      .trim();
    var box2 = $($(innerInfo[i]).find("td")[1])
      .html()
      .trim();

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
  console.log(items);
  var card = $(items).children("tbody");
  // console.log(card)
  var result = [];
  // for (var i = 0; i < card.length; i++) {
  var innerInfo = $(card[6]).children("tr");
  for (var i = 0; i < innerInfo.length; i++) {
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
    .children("tbody")
    .children("tr");

  var result = [];
  console.log(card.length);
  for (var i = 0; i < card.length; i++) {
    var innerInfo = $(card[i]);
    var res1 = $($(innerInfo).find("td")[1]).html();
    var res2 = $($(innerInfo).find("td")[2]).html();
    let getRes = {
      res1: res1,
      res2: res2
    };

    result.push(getRes);
  }

  return result;
}

function huay_vip(html) {
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
    .children(".card-body");
  // .children(".mb-2")
  console.log(card.length);

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
  var card2 = card.html();
  card2 = card2.substring(
    card2.lastIndexOf(`<template`),
    card2.lastIndexOf(`</template>`) + 11
  );
  card2 = card2.replace(/template/g, "html");

  const dom3 = new JSDOM(card2);
  const $d2 = require("jquery")(dom3.window);

  var card3 = $d2("p[class='number text-center m-0']");

  for (var i = 0; i <= card3.length; i = i + 2) {
    if (i == card3.length) {
      break;
    }

    let getRes = {
      // res: innerInfo,
      box1: $d2(card3[i])
        .html()
        .trim(),
      box2: 0
      // box2: ]box2
    };

    if (i + 1 >= card3.length) {
      break;
    } else {
      getRes.box2 = $d2(card3[i + 1])
        .html()
        .trim();
      result.push(getRes);
    }
  }

  // let getRes = {
  //   // res: innerInfo,
  //   box1: card3.html(),
  //   // box2: ]box2
  // };
  // result.push(getRes);
  //   var box2 = $($(innerInfo[i]).find("p")[1]).html();

  // }
  // }

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
    .children(".card-body");
  // .children(".mb-2")
  console.log(card.length);

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
  var card2 = card.html();
  card2 = card2.substring(
    card2.lastIndexOf(`<template v-if="result_type == 1">`),
    card2.lastIndexOf(`<template v-if="result_type == 2">`)
  );
  card2 = card2.replace(/template/g, "html");

  const dom3 = new JSDOM(card2);
  const $d2 = require("jquery")(dom3.window);

  var card3 = $d2("p[class='number text-center m-0']");

  for (var i = 0; i <= card3.length; i = i + 2) {
    if (i == card3.length) {
      break;
    }

    let getRes = {
      // res: innerInfo,
      box1: $d2(card3[i])
        .html()
        .trim(),
      box2: 0
      // box2: ]box2
    };

    if (i + 1 >= card3.length) {
      break;
    } else {
      getRes.box2 = $d2(card3[i + 1])
        .html()
        .trim();
      result.push(getRes);
    }
  }

  // let getRes = {
  //   // res: innerInfo,
  //   box1: card3.html(),
  //   // box2: ]box2
  // };
  // result.push(getRes);
  //   var box2 = $($(innerInfo[i]).find("p")[1]).html();

  // }
  // }

  return result;
}
// }
