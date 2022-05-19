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
        <div @click="scrollDown" class="btn bottom"><span class="down-icon"></span></div>

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
    this.setWith();
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
        this.videoSrc = this.getHeroSection.videoMobileMediaUrl ? this.getHeroSection.videoMobileMediaUrl : (this.getHeroSection.primaryMediaUrl ? this.getHeroSection.primaryMediaUrl : null);
        this.posterSrc = this.getHeroSection.posterMobileMediaUrl ? this.getHeroSection.posterMobileMediaUrl : (this.getHeroSection.secondaryMediaUrl ? this.getHeroSection.secondaryMediaUrl : null);
      }else{
        this.videoSrc = this.getHeroSection.primaryMediaUrl ? this.getHeroSection.primaryMediaUrl : null;
        this.posterSrc = this.getHeroSection.secondaryMediaUrl ? this.getHeroSection.secondaryMediaUrl : null;
      }
    }
  },

};
</script>

<style lang="scss">

.down-icon{

  display: inline-block;
  width: 2.5em;
  height: 2.5em;
  vertical-align: middle;
  content: "";
  background: no-repeat 50%;
  background-size: 100% 100%;

  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA+wAAAPsAHpfpy9AAAE7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYTg3MzFiOSwgMjAyMS8wOS8wOS0wMDozNzozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNS0xOFQyMzo0NzowNCswNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDUtMThUMjM6NTE6MTErMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDUtMThUMjM6NTE6MTErMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyZDU0MTk0LTc1NzgtNjk0MS1iYTllLWE3YjJlODlkOGJhNSIgeG1wTU06RG9jdW1lbnRJRD0i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");
}
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
    transform: translateY(-50px);

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
