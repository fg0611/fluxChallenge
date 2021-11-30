export default function toTxt(csv) {
  // Doubts:
  // Should i check if DATES are the same in all the Objects?
  let total = 0;
  let csvData = csv.filter((e) => e.type !== "");
  csvData = csvData.sort(
    (a, b) => a.time.replace(/[:]/g, "") - b.time.replace(/[:]/g, "")
  );
  let firstLine = csvData?.length
    ? "H" + csvData[0].date.replace(/[/]/g, "")
    : null;
  let result = [firstLine];
  for (let obj of csvData) {
    let str = "";
    /* TOTAL */

    /* TYPE */
    if (obj.type === "payment") {
      str = str.concat("RPA");
      total += parseFloat(obj.amount);
    }
    if (obj.type === "reversal") {
      str = str.concat("RRV");
      total -= parseFloat(obj.amount);
    }
    if (obj.type === "refund") {
      str = str.concat("RRE");
      total -= parseFloat(obj.amount);
    }
    /* AMOUNT */
    let amount = obj.amount.replace(/[.]/g, "");
    let zerosBeforeAmount = "";
    let amountSize = 12 - amount.length;
    for (let i = 0; i < amountSize; i++) {
      zerosBeforeAmount += "0";
    }
    str = str.concat(zerosBeforeAmount + amount);

    /* DATE */
    let date = obj.date.replace(/[/]/g, "");
    str = str.concat(date);
    /* TIME */
    let time = obj.time.replace(/[:]/g, "");
    str = str.concat(time);
    /* ID */
    let id = obj.externalId;
    let zerosBeforeID = "";
    let idSize = 36 - obj.externalId.length;
    for (let i = 0; i < idSize; i++) {
      zerosBeforeID += "0";
    }
    str = str.concat(zerosBeforeID + id);
    /* AUTH */
    let auth = obj.authorization;
    let zerosBeforeAuth = "";
    let authSize = 12 - obj.authorization.length;
    for (let i = 0; i < authSize; i++) {
      zerosBeforeAuth += "0";
    }
    str = str.concat(zerosBeforeAuth + auth);
    /* STORE */
    str = str.concat(obj.store);
    /* TERMINAL */
    str = str.concat(obj.terminal);
    /* CASHBACK */
    let cashback = obj.cashback.replace(".", "");
    let zerosBeforeCashback = "";
    let cashbackSize = 10 - cashback.length;
    for (let i = 0; i < cashbackSize; i++) {
      zerosBeforeCashback += "0";
    }
    str = str.concat(zerosBeforeCashback + cashback);
    /* CASHOUT */
    let cashout = obj.cashout.replace(".", "");
    let zerosBeforeCashout = "";
    let cashoutSize = 12 - cashout.length;
    for (let i = 0; i < cashoutSize; i++) {
      zerosBeforeCashout += "0";
    }
    str = str.concat(zerosBeforeCashout + cashout);
    result.push(str);
  }
  let nOps =
    "".padStart(6 - csvData.length.toString().length, 0) + csvData.length;
  let totalStr = total.toFixed(2).toString().replace(".", "");
  let qty = "".padStart(15 - totalStr.length, 0) + totalStr;
  let lastLine = "F" + nOps + qty;
  result.push(lastLine);
  return result;
}
