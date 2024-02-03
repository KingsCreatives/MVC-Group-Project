const fetch = require('node-fetch');
const User = require("../models/User");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getProfile: async (req, res) => {
    try {
      const currencies = await module.exports.getCurrencies(req,res)
      const conversionResult = req.query.conversionResult;
      res.render("profile.ejs", { currencies, conversionResult});
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },

  getCurrencies: async (req, res) => {
    try {
      const currencyResponse = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
      const currencyData = await currencyResponse.json();
      const currencies = Object.keys(currencyData);
      return currencies;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  convertCurrency: async (req, res) => {
    try {
      const { amount, fromCurrency, toCurrency } = req.body;
      const exchangeRate = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`);
      const currencyData = await exchangeRate.json();
      const exchangeValue = currencyData[fromCurrency][toCurrency];
      const convertedAmount = Number(amount * exchangeValue );
      const currencies = await module.exports.getCurrencies(req, res);

      res.render("profile.ejs", {amount, fromCurrency, toCurrency, conversionResult: convertedAmount, currencies})
    } catch (err) {
      console.error(err);
    }
  }
};
