<template>
  <footer class="bg-black">
    <div class="container">
      <div class="row">
        <div class="col-md-12 offset-md-0 col-lg-10 offset-lg-1">
          <div class="row pt-5 pl-5 pr-5">
            <div class="col-md-3 col-6 pt-3">
              <h4 class="text-white font-semibold text-xl text-nowrap footer-header">Categories</h4>
              <ul>
                <li>
                  <nuxt-link
                    to="/about-us"
                    title="Wrapmotif About us"
                    class="text-footer-links text-nowrap"
                  >About us
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    to="/designs"
                    title="Wrapmotif designs"
                    class="text-footer-links text-nowrap"
                  >Universal designs
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    to="/custom-design"
                    title="Custom design"
                    class="text-footer-links text-nowrap"
                  >Custom design
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    to="/wrapping-companies"
                    title="Wrap your car"
                    class="text-footer-links text-nowrap"
                  >Wrap your car
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    to="/how-it-works"
                    title="How it works"
                    class="text-footer-links text-nowrap"
                  >How it works
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div class="col-md-3 col-6 pt-3">
              <h4
                class="text-white font-semibold text-xl text-nowrap footer-header"
              >Partnership</h4>
              <ul>
                <li>
                  <nuxt-link
                    to="/partner"
                    title="Wrapping companies"
                    class="text-footer-links text-nowrap"
                  >Become a partner
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    to="/partner/become-partner"
                    title="Printing companies"
                    class="text-footer-links text-nowrap"
                  >Sign up as a partner
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div class="col-md-3 col-6 pt-3">
              <h4
                class="text-white font-semibold text-xl text-nowrap footer-header text-nowrap"
              >Terms</h4>
              <ul>
                <li>
                  <nuxt-link
                    to="/terms-conditions#general-terms"
                    title="General Terms"
                    class="text-footer-links text-nowrap"
                  >General Terms
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    to="/terms-conditions#special-conditions"
                    title="Special Conditions"
                    class="text-footer-links text-nowrap"
                  >Special Conditions
                  </nuxt-link>
                </li>

                <li>
                  <nuxt-link
                    to="/terms-conditions#licence"
                    title="License"
                    class="text-footer-links text-nowrap"
                  >License
                  </nuxt-link>
                </li>

                <li>
                  <nuxt-link
                    to="/terms-conditions#privacy-policy"
                    title="Privacy Policy"
                    class="text-footer-links text-nowrap"
                  >Privacy Policy
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div class="col-md-3 col-6 pt-3">
              <h4
                class="text-white font-semibold text-xl text-nowrap footer-header text-nowrap"
              >Support</h4>
              <ul>
                <li>
                  <nuxt-link
                    to="/faq"
                    title="FAQ - Frequently Asked Questions"
                    class="text-footer-links text-nowrap"
                  >FAQ
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    to="/contact"
                    title="Contact"
                    class="text-footer-links text-nowrap"
                  >Contact
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="mt-5 mb-4 white-line"/>

    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-md-12 offset-lg-1 offset-md-0">
          <div class="d-flex justify-content-between pb-5 pl-5 pr-5 row ">

            <div class="pt-3 order-sm-1">
              <h4 class="pb-2 font-semibold text-xl footer-header blue-gradient">Follow us</h4>
              <a
                target="_blank"
                href="https://www.instagram.com/wrapmotif/"
                title="Instagram"
                class="pr-2"
              >
                <span class="social-btn social-insta"></span>
              </a>
              <!-- <a href="#" title="Facebook" class="pr-2"
                ><span class="social-btn social-fb"></span
              ></a>-->
              <a
                href="https://nl.pinterest.com/wrapmotif/_saved/"
                target="_blank"
                title="Pinterest"
                class="pr-2"
              >
                <span class="social-btn social-pinterest"></span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCD7bjVm5rnqXtod0vBgiwUQ"
                target="_blank"
                title="YouTube"
                class="pr-2"
              >
                <span class="social-btn social-yt"></span>
              </a>
            </div>

            <div class="pt-3 order-sm-2">
              <h4
                class="pb-2 font-semibold text-xl footer-header blue-gradient"
                style="color: #30d5c8"
              >Join our mailing list!</h4>
              <p class="text-footer-links">Get updates on new designs, special promotions and more.</p>
              <form @submit.prevent="subscribe">
                <div class="input-group input-group-newsletter my-3">
                  <input
                    type="email"
                    v-model="subscriptionEmail"
                    class="form-control px-3 border-0 rounded-pill bg-transparent"
                    placeholder="Email"
                  />
                  <div class="input-group-append h-100">
                    <button
                      type="submit"
                      class="btn btn-subs sub-btn rounded-pill py-2 px-4 btn-blue"
                    >Subscribe
                    </button>
                  </div>
                </div>
                <error
                  v-if="validationErrors.subscriptionEmail"
                  :messages="validationErrors.subscriptionEmail"
                ></error>
              </form>
            </div>

            <div class="pt-3 order-sm-0">
              <img
                class="logo"
                :src="
                  getWebsiteSettings
                    ? getWebsiteSettings.primaryMediaUrl
                    : null
                "
                alt="logo"
              />

              <p class="mt-3 text-footer-links">
                © 2021 WRAPMOTIF.
                <span class="ml-1">All rights reserved.</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row pb-5 ">
        <div class="col-lg-10 col-md-12 offset-lg-1 offset-md-0">
          <div class="text-center">
            <img
              src="/images/cart/footer_payment_providers.png"
              alt="Payment Providers"
              style="width: 1000px; margin: auto"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ["bgWhite"],

  computed: {
    ...mapGetters({
      validationErrors: "validation/validationErrors",
      getWebsiteSettings: "config/getWebsiteSettings"
    })
  },
  data() {
    return {
      subscriptionEmail: null
    };
  },
  methods: {
    subscribe() {
      this.$axios
        .post("/subscribe", {
          subscriptionEmail: this.subscriptionEmail
        })
        .then(response => {
          this.subscriptionEmail = null;
          this.$toast.success("Subscribed successfully");
        })
        .catch(err => {
          if (err.response.status === 403) {
            this.$toast.error("Already subscribed");
          } else if (err.response.status !== 422) {
            this.$toast.error("Subscription failed");
          } else {
            console.error(err);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>

@media only screen and (min-width: 500px) {
  .order-sm-2 {
    order: 2;
  }

  .order-sm-0 {
    order: 0;
  }

  .order-sm-1 {
    order: 1;
  }
}

.white-line {
  background: #505050;
}

.blue-gradient {
  background: linear-gradient(#33A49B 0%, #00FFEB 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-blue {
  background: linear-gradient(#33A49B 0%, #00FFEB 75%);
  border: 1px solid #2dafa5;

}

.text-footer-links {
  color: #b0b0b0 !important;
}

a {
  text-decoration: none;
  background-color: transparent;
}

footer ul {
  list-style-type: none;
  padding: 0;
}

.social-btn {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-size: 32px;
}

.social-insta {
  background-image: url(/images/social/insta-grey.png);
}

.social-insta:hover {
  background-image: url(/images/social/insta-color.png);
}

.social-fb {
  background-image: url(/images/social/fb-grey.png);
}

.social-fb:hover {
  background-image: url(/images/social/fb-color.png);
}

.social-pinterest {
  background-image: url(/images/social/pinterest-grey.png);
}

.social-pinterest:hover {
  background-image: url(/images/social/pinterest-color.png);
}

.social-yt {
  background-image: url(/images/social/yt-grey.png);
}

.social-yt:hover {
  background-image: url(/images/social/yt-color.png);
}

.input-group-newsletter {
  width: 80%;
  border-radius: 40px;
  //border: 1px solid #e7e8ea;
  background-color: #fff;
  margin-left: 0;
  padding-left: 5px;
  height: 46px;
  display: flex;
  align-items: center;
}

.sub-btn {
  border-radius: 50px;
  font-size: 1rem;
}

.logo {
  height: 50px;

  @media only screen and (max-width: 992px) {
    height: 40px;
  }
  @media only screen and (max-width: 500px) {
    height: 35px;
  }
}

.footer-header {
  @media only screen and (max-width: 500px) {
    font-size: 1.1rem;
  }
}

.input-group-newsletter {
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
}

.btn-subs {
  background-color: #30d5c8;
  color: white;
}

.btn-subs:hover {
  background-color: #25c7bb;
}
</style>
