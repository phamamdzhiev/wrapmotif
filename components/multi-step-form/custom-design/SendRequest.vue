<template>
  <div class="col-lg-8 mx-auto">
    <p class="text-center">
      One more step to complete your order. As this request is binding, we ask for a deposit amount. This deposit is
      part of the final price. After we complete your customized car wrap design, we will send you a preview of the
      design with the remaining amount. Next, you can provide us with feedback which we will process in the final design
      and thereafter you can purchase the printing data inside your profile.
    </p>
    <h3 class="text-center mt-5 mb-3">Payment information</h3>

    <!-- Payment Info -->
    <div class="row">
      <div class="col-8 mx-auto">
        <div class="d-flex justify-content-between lead">
          <p>Custom design deposit Exc. VAT</p>
          <span>{{
              getDepositAmount
                | currency(
                $store.state.currency.selectedCurrency,
                $store.state.currency.exchangeRate
                )
            }}</span>
        </div>
        <div class="d-flex justify-content-between lead">
          <p>VAT</p>
          <span v-if="vatType == '%'">
            {{ vatAmount }}
            {{ vatType }}
          </span>
          <span v-else>
            {{
              vatAmount
                | currency(
                $store.state.currency.selectedCurrency,
                $store.state.currency.exchangeRate
                )
            }}
          </span>
        </div>
        <div class="d-flex justify-content-between font-weight-bold lead">
          <p>Custom design deposit total</p>
          <span>
            {{
              getCustomerGrandTotal
                | currencySymbol($store.state.currency.selectedCurrency)
            }}
          </span>
        </div>
      </div>
    </div>
    <!-- Payment Type -->
    <div class="d-flex flex-column align-items-center" v-if="getCustomerAmount > 0">
      <!--      <p class="text-center mt-5 mb-3">Payment type:</p>-->

      <div class="row w-100 mt-4">
        <!-- Terms and condition -->
        <div class="col-md-8 col-xl-6 mx-auto">
          <div class="form-group mb-1">
            <div class="custom-control custom-checkbox">
              <input v-model="termsAndCondition" id="agree1" type="checkbox" class="custom-control-input"/>
              <label for="agree1" class="custom-control-label">I have read and agree to the <a
                href="/terms-conditions#general-terms" target="_blank" class="text-primary"
                title="Wrapmotif Terms and Conditions">terms and conditions</a>.</label>
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input v-model="confirmDemand" id="agree2" type="checkbox" class="custom-control-input"/>
              <label for="agree2" class="custom-control-label">
                I confirm that the demand is binding.
              </label>
            </div>
          </div>

          <!-- Provider Buttons -->
          <div class="card-body p-0 mb-5 w-100" :class="{ disabledPayment: !termsAndCondition || disablePayButton }">

            <!-- Payment buttons -->
            <button class="btn-black w-100" type="button" v-if="getCustomerGrandTotal > 0 && !sessionId"
                    @click="getSession">
              <span v-if="loading">Loading ...</span>
              <span v-else>
                          Proceed to checkout
                        </span>
            </button>
            <button type="button" v-if="sessionId" id="pay-now-btn" class="btn btn-primary text-nowrap"
                    @click="submit">Pay Now
            </button>

            <div v-if="sessionId">
              <stripe-checkout :pk="pk"
                               ref="checkoutElement"
                               :session-id="sessionId"
              />
            </div>
            <payment-method-button v-if="sessionId" :buttons="paymentButtons" v-model="paymentMethod"/>
            <!-- Paypal -->

            <paypal v-show="paymentMethod === 'paypal'" :checkoutItems="this.checkoutItemsForPaypal"
                    @payment-complete="handlePaymentCompletePaypal"/>
          </div>
        </div>


        <!-- Stripe -->
        <!--            <stripe v-show="paymentMethod === 'stripe'" @onError="stripeError" @token-generated="handlePaymentCompleteStripe" @onSubmit="onStripeSubmit">-->
        <!--            </stripe>-->
      </div>
    </div>

    <!-- Pagination -->
    <step-pagination :decrement="decrement" :isNext="false"></step-pagination>
  </div>
</template>

<script>
import {sameAs} from "vuelidate/lib/validators";
import PaymentMethodButton from "~/components/forms/PaymentMethodButton.vue";
import {mapGetters} from "vuex";

export default {
  components: {
    PaymentMethodButton
  },
  data() {
    return {
      pk: process.env.STRIPE_PUBLISHABLE_KEY,
      sessionId: null,
      loading: false,
      vatType: "%",
      termsAndCondition: false,
      confirmDemand: false,
      paymentMethod: "",
      paymentButtons: [
        {
          src: "/images/cart/paypal.png",
          id: "payment_paypal",
          value: "paypal",
          name: "payment"
        },
        // {
        //   src: "/images/cart/gplogo.png",
        //   id: "payment_stripe",
        //   value: "stripe",
        //   name: "payment"
        // }
      ],
      disablePayButton: false
    };
  },
  methods: {
    async getSession() {
      try {
        this.loading = true;
        const formData = new FormData();
        for (const key in this.getCustomDesign) {
          formData.append(key, this.getCustomDesign[key]);
        }

        formData.append("vat", this.vatAmount);
        formData.append("vatType", this.vatType);
        formData.append("vatAmount", this.getVatAmount);
        formData.append("grandTotal", this.getGrandTotal);
        formData.append(
          "customerVatAmount",
          this.convertCurrency(this.getVatAmount)
        );

        const res = await this.$axios.post('create-session/custom', formData);
        console.log('----- GET SESSION DATA ERROR RESPONSE ----', res.data);
        this.loading = false;
        this.sessionId = res.data.id;
      } catch (e) {
        this.loading = false;
        console.log('----- GET SESSION DATA ERROR RESPONSE ----', e.response);
      }
    },
    submit() {
      return this.$refs.checkoutElement.redirectToCheckout();
    },


    // Handle order after payment complete
    async handlePaymentCompletePaypal() {
      const apiUrl = "/custom-orders";
      this.sendData(apiUrl);
    },

    // Handle stripe payment
    async handlePaymentCompleteStripe(token) {
      const apiUrl = "/payments/custom-orders/stripe";
      await this.sendData(apiUrl, token);
    },
    // Send Data to Backend
    async sendData(apiUrl, token = null) {
      const formData = new FormData();
      for (const key in this.getCustomDesign) {
        formData.append(key, this.getCustomDesign[key]);
      }

      if (token) formData.append("token", token.id);

      formData.append("vat", this.vatAmount);
      formData.append("vatType", this.vatType);
      formData.append("vatAmount", this.getVatAmount);
      formData.append("grandTotal", this.getGrandTotal);
      formData.append(
        "customerVatAmount",
        this.convertCurrency(this.getVatAmount)
      );

      try {
        await this.$axios.post(apiUrl, formData);
        this.$toast.success("Order Created successfully");
        this.$router.push("/custom-design/greeting");
      } catch (error) {
        console.log(error);
      } finally {
        this.disablePayButton = false;
      }
    },
    onStripeSubmit() {
      this.disablePayButton = true;
    },
    stripeError(err) {
      this.disablePayButton = false;
    }
  },
  computed: {
    ...mapGetters({
      getCustomerAmount: "customDesign/getCustomerAmount",
      getDepositAmount: "customDesign/getDepositAmount",
      getCustomDesign: "customDesign/getCustomDesign"
    }),
    // Get user vat amount
    vatAmount() {
      return this.$auth.loggedIn ? this.$auth.user.vat.amount : 0;
    },
    // Calcualte vat amomount
    getVatAmount() {
      let vatAmount;
      if (this.vatType == "%") {
        vatAmount = (this.vatAmount / 100) * this.getDepositAmount;
      } else {
        vatAmount = this.vatAmount;
      }

      return Math.ceil(vatAmount);
    },

    // Calculate grand total
    getGrandTotal() {
      return this.getDepositAmount + this.getVatAmount;
    },

    // Calculate customer grand total
    getCustomerGrandTotal() {
      return (
        this.convertCurrency(this.getDepositAmount) +
        this.convertCurrency(this.getVatAmount)
      );
    },
    // Prepare items for paypal checkout
    checkoutItemsForPaypal() {
      return [
        {
          description: "Custom Design",
          amount: {
            currency: this.$store.state.currency.selectedCurrency,
            value: this.getCustomerGrandTotal
          }
        }
      ];
    }
  },
  validations: {
    termsAndCondition: {sameAs: sameAs(() => true)},
    confirmDemand: {sameAs: sameAs(() => true)}
  },
  props: {
    decrement: {
      type: Function
    }
  }
};
</script>

<style lang="scss" scoped>
.disabledPayment {
  pointer-events: none;
  opacity: 0.6;
}
</style>
