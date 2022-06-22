import Vue from "vue";
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { StripeElementCard } from "@vue-stripe/vue-stripe";

Vue.component("stripe-element-card", StripeElementCard);

// const options = {
//   pk: process.env.STRIPE_PUBLISHABLE_KEY,
//   stripeAccount: process.env.STRIPE_ACCOUNT,
//   apiVersion: process.env.API_VERSION,
//   locale: process.env.LOCALE
// };

export default () => {
  Vue.component('StripeCheckout', StripeCheckout)
}
