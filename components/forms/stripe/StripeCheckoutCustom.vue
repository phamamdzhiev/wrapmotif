<template>
  <div>
    <stripe-checkout :pk="pk"
                     ref="checkoutElement"
                     :session-id="sessionId"
    />
    <button class="btn btn-primary text-nowrap" @click="submit">Pay Now</button>
  </div>
</template>

<script>
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
