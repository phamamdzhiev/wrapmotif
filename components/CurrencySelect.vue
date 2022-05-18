<template>
  <div>
    <select
      v-model="selectedCurrency"
      class="currency-select no-caret font-semibold text-lg mb-1"
      @change="handleChange"
      :style="{ color: showText ? '#919191 !important': ''}"
    >
      <option value="EUR">€ <span v-if="showText">EUR</span></option>
      <option value="USD">$ <span v-if="showText">USD</span></option>
    </select>
  </div>
</template>

<script>
export default {
  props:{
    showText:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      selectedCurrency: null
    };
  },
  methods: {
    handleChange() {
      this.$store.dispatch(
        "currency/setSelectedCurrency",
        this.selectedCurrency
      );
    }
  },
  mounted() {
    this.$store.dispatch("currency/setCurrency");
    // Set the currency from store
    this.selectedCurrency = this.$store.state.currency.selectedCurrency;
  }
};
</script>

<style lang="scss">

.currency-select {
  background: transparent;
  border: none;
  outline: none;

  option {
    color: #343a40;
  }
}

.currency-select {
  appearance: none;
  padding: 5px;
  color: white;
  border: none;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  //color: #343a40;
}
</style>
