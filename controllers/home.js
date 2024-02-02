const express = require('express')
const User = require("../models/User");


module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getProfile: async (req, res) => {
    try {
      const currencies = await module.exports.getCurrencies(req, res);
      res.render("profile.ejs", {currencies });
    } catch (err) {
      console.log(err);
    }
  },
  getCurrencies: async (req, res) => {
        try {
          const currencyResponse = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
          const currencyData = await currencyResponse.json();

          const currencies = Object.keys(currencyData);

          return currencies
    } catch (err) {
      console.error(err);
    }
    
  },
  convertCurrency : async (req,res) => {
    try {
      const { amount, fromCurrency, toCurrency } = req.body;
      
      // Fetch exchange rates for conversion
      const exchangeRateResponse = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/${fromCurrency}-${toCurrency}`);
      const exchangeRateData = await exchangeRateResponse.json();
      
      // Calculate converted amount
      const convertedAmount = amount * exchangeRateData[toCurrency];

      // Render the result
      console.log(convertedAmount)
    } catch (err) {
      console.error(err);
    }
  }
};
