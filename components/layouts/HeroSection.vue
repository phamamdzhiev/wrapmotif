<template>
  <div class="hero" v-if="getHeroSection">
    <client-only>
      <video-background
        :src="videoSrc"
        :poster="posterSrc"
        class="hero__video"
        style=""
      >
        <div
          class="
            hero__overlay
            d-flex
            align-items-center
            justify-content-center
            flex-column
          "
        >
          <h4 class="text-uppercase text-truncate  ">
            {{ getHeroSection.data.title }}
          </h4>
          <h3 class="text-uppercase text-truncate  mt-1 ">
            {{ getHeroSection.data.subtitle }}
          </h3>
          <nuxt-link
            to="/designs"
            title="Market"
            class="
              hero__button
              btn btn-primary
              text-whie text-uppercase
              rounded-pill
              mt-3
              text-3xl

            "
          >{{ getHeroSection.data.button }}
          </nuxt-link
          >
        </div>
        <div @click="scrollDown" class="btn btn-primary bottom"><span class="fa fa-arrow-down "></span></div>

      </video-background>
    </client-only>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data(){
    return {
      width: '',
      videoSrc: '',
      posterSrc: '',
    };
  },
  computed: {
    ...mapGetters({
      getHeroSection: "config/getHeroSection"
    }),
  },
  mounted() {
    this.videoSrc = this.getHeroSection.primaryMediaUrl ? this.getHeroSection.primaryMediaUrl : null,
    this.posterSrc = this.getHeroSection.secondaryMediaUrl ? this.getHeroSection.secondaryMediaUrl : null,
    window.addEventListener('resize', this.setWith);
  },
  unmounted() {
    window.removeEventListener('resize', this.setWith);
  },
  methods: {
    scrollDown() {
      return window.scrollTo({
        top: document.querySelector('#feature').offsetTop,
        behavior: 'smooth'
      });
    },
    setWith() {
      this.width = document.documentElement.clientWidth;
      if(this.width < 600){
        const video = this.getHeroSection.media ? this.getHeroSection.media.find(element => element.collection_name === 'video_mobile') : null;
        const photo = this.getHeroSection.media ? this.getHeroSection.media.find(element => element.collection_name === 'poster_mobile') : null;
        this.videoSrc = video ? video.original_url : null;
        this.posterSrc = photo ? photo.original_url : null;
      }else{
        this.videoSrc = this.getHeroSection.primaryMediaUrl ? this.getHeroSection.primaryMediaUrl : null;
        this.posterSrc = this.getHeroSection.secondaryMediaUrl ? this.getHeroSection.secondaryMediaUrl : null;
      }
    }
  },

};
</script>

<style lang="scss">
.bottom {
  position: relative;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}

@media only screen and (max-width: 600px) {
  .bottom {
    bottom: 200px;
  }

}

.hero {
  &__video {
    @media only screen and (min-width: 992px) {
      max-height: 100vh;
      //max-height: 550px;
      height: 100vh;
    }
    @media only screen and (max-width: 991px) {
      min-height: 100vh;
    }
    @media only screen and (max-width: 500px) {
      min-height: 100vh;
    }
  }

  @media only screen and (min-width: 992px) {
    margin-top: -70px;
  }

  &__button {
    font-size: 16px;
    font-weight: 400;
    padding: 8px 1.8rem;

    @media only screen and (max-width: 992px) {
      font-size: 13px;
    }
    @media only screen and (max-width: 500px) {
      font-size: 10px;
    }
  }

  &__overlay {
    width: 100%;
    height: 100%;

    h4 {
      font-size: 4rem;
      color: #fff;
      margin-bottom: 0;
      padding-bottom: 0;
      line-height: 0.9;
      font-weight: bolder;

      @media only screen and (max-width: 992px) {
        font-size: 3.5rem;
      }
      @media only screen and (max-width: 680px) {
        font-size: 2.8rem;
      }
      @media only screen and (max-width: 500px) {
        font-size: 2rem;
      }
    }

    h3 {
      font-size: 4.5rem;
      color: #fff;
      margin-bottom: 0;
      padding-bottom: 0;
      line-height: 0.9;
      font-weight: bolder;

      @media only screen and (max-width: 992px) {
        font-size: 4rem;
      }
      @media only screen and (max-width: 680px) {
        font-size: 2.8rem;
      }
      @media only screen and (max-width: 500px) {
        font-size: 2rem;
      }
    }
  }
}
</style>
