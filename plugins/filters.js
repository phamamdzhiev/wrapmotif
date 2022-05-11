import Vue from "vue";

Vue.filter("currency", function(value, currency, exchangeRate) {
  if (currency == "EUR") {
    return "€ " + Math.ceil(value);
  } else {
    return "$ " + Math.ceil(parseFloat(value) * parseFloat(exchangeRate));
  }
});

Vue.filter("currencyCart", function(value, currency, exchangeRate) {
  if (currency == "EUR") {
    // return "€ " + Math.ceil(value);
    return "€ " + parseFloat(value.toFixed(2));
  } else {
    // return "$ " + Math.ceil(parseFloat(value) * parseFloat(exchangeRate));
    return "$ " + roundToTwo((parseFloat(value) * parseFloat(exchangeRate)).toFixed(2));
  }
});

Vue.filter("currencySymbol", function(value, currency) {
  if (currency == "EUR") {
    // return "€ " + Math.ceil(value);
    return "€ " + parseFloat(value.toFixed(2));
  } else {
    // return "$ " + Math.ceil(value);
    return "$ " + parseFloat(value.toFixed(2));
  }
});

// Round float to decimal
function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

Vue.filter("truncate", function(value, size) {
  if (!value) return "";
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) + "...";
});
