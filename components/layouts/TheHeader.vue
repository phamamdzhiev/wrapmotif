<template>
  <div>
    <nav
      class="navbar shadow-sm bottom-shadow zindex d-flex align-items-center justify-content-between navbar-dark">
      <!-- brand -->
      <div class="brand">
        <nuxt-link to="/" class="logo">
          <slot name="logo">
            <Logo/>
          </slot>
        </nuxt-link>
      </div>

      <!-- items -->
      <ul class="navbar-menu d-none d-lg-flex flex-row ml-auto p-0 m-0">
        <li class="nav-item mx-lg-4 navi">
          <nuxt-link class="nav-link" to="/designs">UNIVERSAL DESIGNS</nuxt-link>
        </li>

        <li class="nav-item mx-lg-4 navi">
          <nuxt-link class="nav-link" to="/custom-design"
          >CUSTOM DESIGN
          </nuxt-link
          >
        </li>
        <li class="nav-item mx-lg-4 navi">
          <nuxt-link class="nav-link" to="/partner">BECOME A PARTNER</nuxt-link>
        </li>
      </ul>

      <!-- icons -->
      <div class="ml-auto d-flex align-items-center justify-content-end">
        <!-- Currency icon -->
        <div class="nav-icon mr-2 d-desktop " style="cursor: pointer;">
          <currency-select
            v-show="$route.name !== 'preview-designs-id-detail' && $route.name !== 'color-changes-id-detail' && $route.name !== 'custom-design' && $route.name !== 'cart'"/>
        </div>

        <!-- cart icon -->
        <nuxt-link class="nav-item mr-2" to="/cart">
          <div class="nav-icon position-relative">
            <i class="fas fa-shopping-cart"></i>
            <p class="cartDetails bg-primary text-white" v-if="getTotalItem">
              {{ getTotalItem }}
            </p>
          </div>
        </nuxt-link>

        <!-- Login -->
        <b-dropdown
          right
          variant="link"
          toggle-class="text-decoration-none p-0"
          no-caret
          v-if="$auth.loggedIn"
        >
          <template #button-content>
            <div
              class="nav-icon text-decoration-none"
              v-if="$auth.user.profilePhotoUrl"
              id="profile-photo"
            >
              <img :src="$auth.user.profilePhotoUrl" alt=""/>
            </div>
            <span v-else class="nav-icon">
              <i class="fas fa-user"></i>
            </span>
          </template>
          <li>
            <nuxt-link to="/profile" class="text-dark dropdown-item"
            >Profile
            </nuxt-link
            >
          </li>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-dropdown>

        <nuxt-link class="nav-icon" to="/login" v-else>
          <i class="fas fa-user"></i>
        </nuxt-link>
        <button class="btn primary d-lg-none"><span :class="'navbar-toggle-icon '" @click="showMenu"
                                                    id="mob-menu"></span></button>
      </div>
    </nav>

    <!-- Mobile Nav Items -->

    <div class="navbar bg-white  shadow-sm" style="height: 60px" v-show="false">
      <ul
        class="nav-menu d-flex p-0 mb-0 justify-content-around h-100 align-items-center w-100"
      >
        <li class=" mx-lg-4 navi">
          <nuxt-link class="nav-link text-nowrap font-semibold" to="/designs"
          >UNIVERSAL DESIGNS
          </nuxt-link
          >
        </li>
        <li class=" mx-lg-4 navi">
          <nuxt-link
            class="nav-link text-nowrap font-semibold"
            to="/custom-design"
          >CUSTOM DESIGN
          </nuxt-link
          >
        </li>
        <li class=" mx-lg-4 navi">
          <nuxt-link class="nav-link text-nowrap font-semibold" to="/partner">
            <span class="d-none d-sm-inline">BECOME A PARTNER </span>
            <span class="d-sm-none">PARTNERS </span>
          </nuxt-link>
        </li>
      </ul>
    </div>

    <!--  Dropdown menu for mobile  -->
    <transition name="fade">
      <div class="side-menu" v-show="show">
        <ul
          class=""
        >
          <li class="pt-2 navi" @click="show = false">
            <nuxt-link class="side-link text-nowrap font-semibold" to="/designs">UNIVERSAL DESIGNS</nuxt-link>
          </li>

          <li class="pt-2 navi" @click="show = false">
            <nuxt-link
              class="side-link text-nowrap font-semibold"
              to="/custom-design">CUSTOM DESIGN
            </nuxt-link
            >
          </li>
          <li class="pt-2 navi" @click="show = false">
            <nuxt-link class="side-link text-nowrap font-semibold" to="/partner">
              <span class="">BECOME A PARTNER </span>
            </nuxt-link>
          </li>
          <li class="pt-2">
            <!-- Currency icon -->
            <div class="nav-icon mr-2" style="cursor: pointer;">
              <currency-select label="Currency" :closeMenu="closeMenu" :showText="true"
                               @click="show = false"></currency-select>
            </div>
          </li>
        </ul>
      </div>
    </transition>

  </div>
</template>

<script>
import Logo from "@/components/Logo";
import {mapGetters} from "vuex";
import CurrencySelect from "../CurrencySelect.vue";

export default {
  name: "TheHeaderComponent",
  data() {
    return {
      show: false
    };
  },
  props: {
    type: {
      type: String,
      default: "dark"
    },
    fixed: {
      type: String,
      default: ""
    }
  },
  components: {
    Logo,
    CurrencySelect
  },
  computed: {
    headerClasses() {
      return `header ${this.theme} container-fluid text-white shadow-sm`;
    },

    ...mapGetters({
      getWebsiteSettings: "config/getWebsiteSettings",
      getTotalItem: "cart/getTotalItem"
    })
  },
  methods: {
    closeMenu() {
      console.log('as')
      this.show = false;
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
    showMenu() {
      this.show = !this.show;
    },
    closeIfClickedOutside(event) {
      console.log(event.target.id)
      if (!document.getElementById('mob-menu').contains(event.target)) {
        if (event.target.id != 'currency-change') {
          this.show = false;
        }

        document.removeEventListener('click', this.closeIfClickedOutside);
      }
    }
  },
  mounted() {
    window.addEventListener('click', this.closeIfClickedOutside);
  }
};
</script>

<style lang="scss" scoped>

@media only screen and (max-width: 991px) {
  /*.navbar{
    padding-right: 0.1rem;
  }*/
  .d-desktop {
    display: none !important;
  }
}

.navbar-toggle-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  content: "";
  background: no-repeat 50%;
  background-size: 100% 100%;
}

.navi {
  .nuxt-link-active,
  .nuxt-link-exact-active {
    background-image: linear-gradient(#6F3A1F 0%, #DC7B54 65%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.navbar-toggle-icon {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.primary {
  //background: linear-gradient(#6F3A1F 0%, #DC7B54 85%);
  color: #919191 !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0
}

.side-menu {
  position: absolute;
  width: 100% !important;
  background: rgba(0, 0, 0, 1);
  z-index: 99;
  padding-right: 25px;
  padding-left: 25px;
}

.side-menu li a {
  color: #919191 !important;
}

.side-menu li a:hover {
  color: #dedddd !important;
}

.side-menu li {
  text-align: right;
  list-style: none;
}

.navbar-button {
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 99;

}

.navbar-menu {
  list-style: none;
}

.nav-menu {
  list-style: none;
  font-size: 14px;
}

.nav-link {
  padding: 0 0.23rem;
  color: black;

  &:hover {
    color: #8c8c8c !important;
  }
}

.zindex {
  z-index: 9998 !important;
}

#profile-photo {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  overflow: hidden;

  @media only screen and (max-width: 991px) {
    height: 30px;
    width: 30px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.cartDetails {
  border-radius: 50%;
  height: 16px;
  width: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -5px;
}
</style>
