const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/:date", (req, res) => {
  const date = req.params.date;
  let unix, now;
  //console.log("is Valid:", moment(date, "x").isValid());
  //console.log("momentOBJ", momentObj);
  //console.log("Moment utc", momentObj.format("MMMM DD, YYYY"));
  let isValid = moment(date).isValid();
  // console.log("Isvalid", isValid);
  if (isValid) {
    let momentObj = moment(date);
    now = momentObj.format("MMMM DD, YYYY");
    unix = momentObj.format("X");
  } else {
    unix = moment(date, "X").format("X");
    now = moment.unix(date).format("MMMM DD, YYYY");
    console.log("------------");
    console.log(unix);
    console.log("-----------");
    if (unix === "Invalid date") unix = null;

    if (now === "Invalid date") now = null;
  }

  res.json({ unix, natural: now });
});

app.listen(PORT, () => console.log(`Runing on port ${PORT}`));

module.exports = app;
