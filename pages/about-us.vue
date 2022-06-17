<template>
  <div>
    <div class="page-wrapper">
      <!-- Header Image -->
      <div class="container-fluid header-image"
           :style="{ '--colour': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + getAboutUsPageContent.secondaryMediaUrl + ')' }"
      >
        <div class="container light-section" style="min-height: 530px; height: 100%">
          <div class="row justify-content-center align-items-center h-100">
            <div class="col-lg-4 text-center text-white">
              <h1 class="text-uppercase mb-3 text-6xl about-title">
                <b>{{ getAboutUsPageContent.data.title }}</b>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="container my-5">
        <!-- About us page content -->
        <div class="text-xl text-center" v-html="getAboutUsPageContent.data.content"></div>
      </div>
    </div>
    <img :src="getAboutUsPageContent.primaryMediaUrl" class="img-fluid" alt="About us secondary image">
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  head() {
    return {
      title: "About Us",
    };
  },
  computed: {
    ...mapGetters({
      getAboutUsPageContent: "config/getAboutUsPageContent"
    })
  },
  mounted() {
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.header-image {
  background-image: var(--colour);
  background-color: #000;
  background-repeat: no-repeat;
  height: 507px;
  background-position: 50%;
  background-size: cover;
}

.stepper-box {
  box-shadow: none;
}

@media only screen and (max-width: 600px) {
  .about-title {
    font-size: 2.5rem;
  }
}

@media only screen and (max-width: 414px) {
  .about-title {
    font-size: 2.2rem;
  }
}
</style>
