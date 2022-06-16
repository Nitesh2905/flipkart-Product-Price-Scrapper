const nightmare = require("nightmare")();
// https://www.flipkart.com/boat-airdopes-131-upto-15-hours-playback-13mm-drivers-iwp-technology-bluetooth-headset/p/itmf77ad6e8eecf1 url from flipkart
//("a-price-whole"); class of price

const args = process.argv.slice(2); // gives the arguments
//ex node parser.js url minPrice
//slice will give us url and minPrice only
const url = args[0];
const minPrice = args[1];

async function checkPrice() {
  const priceString = await nightmare
    .goto(url) //url of the product = https://www.amazon.in/Airdopes-141-Playtime-Resistance-Bluetooth/dp/B09N3ZNHTY
    .wait("._30jeq3._16Jk6d")
    .evaluate(() => document.querySelector("._30jeq3._16Jk6d").innerText)
    .end();

  let price = priceString.replaceAll("₹", "").replaceAll(",", "");

  const priceNumber = parseFloat(price);

  console.log(priceNumber);
  if (priceNumber < minPrice) {
    console.log("Current Price is cheap");
  } else {
    console.log("Its expensive right now!");
  }
}

checkPrice();
