import Vue from "vue";
import { StripeElementCard, StripeCheckout, StripePlugin } from "@vue-stripe/vue-stripe";

// Vue.component("stripe-element-card", StripeElementCard);

// const options = {
//   pk: process.env.STRIPE_PUBLISHABLE_KEY,
//   stripeAccount: process.env.STRIPE_ACCOUNT,
//   apiVersion: process.env.API_VERSION,
//   locale: process.env.LOCALE
// };

export default () => {
  Vue.component('StripeCheckout', StripeCheckout);
  Vue.use(StripePlugin, {pk: process.env.STRIPE_PUBLISHABLE_KEY});
}
