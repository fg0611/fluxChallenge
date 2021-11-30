export default function toCsv(txt) {
  let data = txt.map((e) => e[0]);
  let len = data.length;
  // "H07092021"
  let date =
    data[0].slice(1, 3) + "/" + data[0].slice(3, 5) + "/" + data[0].slice(5);
  let innerData = data.slice(1, len - 1);
  let content = [
    [
      "type",
      "amount",
      "date",
      "time",
      "externalId",
      "authorization",
      "store",
      "terminal",
      "cashback",
      "cashout"
    ]
  ];

  for (let line of innerData) {
    let toPush = "";
    /* TYPE */
    let type = line.slice(1, 3);
    if (type === "PA") {
      toPush = toPush.concat("payment");
    }
    if (type === "RV") {
      toPush = toPush.concat("reversal");
    }
    if (type === "RE") {
      toPush = toPush.concat("refund");
    }

    /* AMOUNT */
    let rawAmount = Number(line.slice(3, 15)).toString();
    let amount =
      rawAmount.slice(0, rawAmount.length - 2) +
      "." +
      rawAmount.slice(rawAmount.length - 2);
    toPush = toPush.concat("," + amount);
    /* DATE */
    let rawDate = line.slice(15, 23);
    let date =
      rawDate.slice(0, 2) + "/" + rawDate.slice(2, 4) + "/" + rawDate.slice(4);
    toPush = toPush.concat("," + date);
    /* TIME */
    let rawTime = line.slice(23, 29);
    let time =
      rawTime.slice(0, 2) + ":" + rawTime.slice(2, 4) + ":" + rawTime.slice(4);
    toPush = toPush.concat("," + time);
    /* ID */
    let id = Number(line.slice(29, 65)).toString();
    toPush = toPush.concat("," + id);
    /* AUTH */
    let auth = Number(line.slice(65, 77)).toString();
    toPush = toPush.concat("," + auth);
    /* STORE */
    let store = line.slice(77, 83);
    toPush = toPush.concat("," + store);
    /* TERMINAL */
    let terminal = line.slice(83, 87);
    toPush = toPush.concat("," + terminal);
    /* CASHBACK */
    let rawCashback = Number(line.slice(87, 97)).toString();
    let cashback;
    if (rawCashback !== 0) {
      cashback =
        rawCashback.slice(0, rawCashback.length - 2) +
        "." +
        rawCashback.slice(rawCashback.length - 2);
      toPush = toPush.concat("," + cashback);
    } else {
      toPush = toPush.concat(",0");
    }
    /* CASHOUT */
    let rawCashout = Number(line.slice(97, 109)).toString();
    let cashout;
    if (rawCashout !== 0) {
      cashout =
        rawCashout.slice(0, rawCashout.length - 2) +
        "." +
        rawCashout.slice(rawCashout.length - 2);
      toPush = toPush.concat("," + cashout);
    } else {
      toPush = toPush.concat(",0");
    }
    /* Push Line */
    content.push(toPush.split(","));
    // console.log(toPush);
  }
  let result = {
    date,
    content
  };
  return result;
}
