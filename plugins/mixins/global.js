import Vue from "vue";

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

Vue.mixin({
  methods: {
    // Convert the currency
    /*convertCurrency(value) {
      if (this.$store.state.currency.selectedCurrency == "EUR") {
        return Math.ceil(value);
      } else {
        return Math.ceil(
          parseFloat(value) *
          parseFloat(this.$store.state.currency.exchangeRate)
        );
      }
    },*/

    convertCurrency(value) {
      if (this.$store.state.currency.selectedCurrency === "EUR") {
        return roundToTwo(value);
      } else {
        return roundToTwo(
          parseFloat(value) *
          parseFloat(this.$store.state.currency.exchangeRate)
        );
      }
    },

    checkLength(obj) {
      return Object.keys(obj).length;
    }
  }
});
