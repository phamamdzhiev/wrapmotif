<template>
  <div>
   <h1>TESVAI KUCHE</h1>
  </div>
</template>

<script>
//DEPRICATED COMPONENT
export default {
  name: "StipeCheckoutCustom",
  props: ['totalAmount'],
  data() {
    return {
      pk: process.env.STRIPE_PUBLISHABLE_KEY,
      sessionId: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getSession();
    })
  },
  methods: {
    async getSession() {
      console.log('total amount from stripe cystom ---///---', this.totalAmount)
      try {
        const res =
          await this.$axios.get(`/getSession?c=${this.$store.state.currency.selectedCurrency}&t=${this.totalAmount}&q=${1}`);
        this.sessionId = res.data.id;
      } catch (e) {
        console.log('----- GET SESSION DATA ERROR RESPONSE ----', e.response);
      }
    },
    submit() {
      return this.$refs.checkoutElement.redirectToCheckout();
    },
  }
}
</script>

<style scoped>

</style>
