// Require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var QRCode = require("qrcode");

// const fetch = require('node-fetch');
// Initialize express and define a port
const app = express();
const PORT = 3000;

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());

// Start express on the defined port
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.listen(PORT || 5000, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

app.post("/qr", cors(), async (req, res) => {
//   console.log(req.body);
  let innerData = req.body.innerData ? req.body.innerData : null;
  let light = req.body.light ? req.body.light : "#fff";
  let dark = req.body.dark ? req.body.dark : "#000";
  let width = req.body.width ? req.body.width : 250
  let opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 1,
    margin: 1,
    color: {
      dark: dark,
      light: light,
    },
    width : width
  };

  let qrcode = [];
  QRCode.toDataURL(innerData, opts, function (err, url) {
    //  console.log(url)
    console.log(err);
    qrcode.push(url);
    //  console.log(qrcode)

    res
      .status(200)
      .send({
        qr: qrcode,
      })
      .end();
  });
});
