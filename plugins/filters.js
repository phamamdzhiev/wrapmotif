import Vue from "vue";

Vue.filter("currency", function(value, currency, exchangeRate) {
  if (currency === "EUR") {
    return "€ " + Math.ceil(value);
  } else {
    return "$ " + Math.ceil(parseFloat(value) * parseFloat(exchangeRate));
  }
});

Vue.filter("currencyCart", function(value, currency, exchangeRate) {
  if (currency === "EUR") {
    // return "€ " + Math.ceil(value);
    return "€ " + formatNumber(value);
  } else {
    // return "$ " + Math.ceil(parseFloat(value) * parseFloat(exchangeRate));
    return "$ " + formatNumber(parseFloat(value) * parseFloat(exchangeRate));
  }
});

Vue.filter("currencySymbol", function(value, currency) {
  if (currency === "EUR") {
    // return "€ " + Math.ceil(value);
    return "€ " + formatNumber(value);
  } else {
    // return "$ " + Math.ceil(value);
    return "$ " + formatNumber(value);
  }
});

function formatNumber(number)
{
  number = number.toFixed(2) + '';
  let x = number.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
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
