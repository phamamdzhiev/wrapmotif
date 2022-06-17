<template>
  <div>
    <div class="myProfile mb-4">
      <ul class="nav nav-tabs px-2">
        <li class="nav-item">
          <nuxt-link to="/profile" class="nav-link text-uppercase">Profile Settings</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/profile/orders" class="nav-link text-uppercase">Purchase orders</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/profile/designs" class="nav-link text-uppercase
          ">My designs
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/profile/color-changes" class="
            nav-link text-uppercase
          ">Color Changes
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/profile/preview-designs" class="nav-link text-uppercase">Preview Designs</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/profile/custom-orders" class="nav-link text-uppercase">Custom Orders</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/profile/favourite" class="nav-link text-uppercase">My favorite</nuxt-link>
        </li>
      </ul>
    </div>

    <div class="my-3">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nuxt-link-active,
.nuxt-link-exact-active {
  background-image: linear-gradient(#5d2c16 0%, #e07e57 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  border-bottom: 3px solid white;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-image-slice: 1;

}

.nuxt-link-exact-active {
  border-image-source: linear-gradient(to left, #5d2c16, #e07e57);
}

.nav-tabs {
  border-bottom: 1px solid #dee2e6;
}

.nav-tabs .nav-item {
  margin-bottom: -1px;
  a {
    color: black;
  }
}

.nav-link {
  border: none;
  padding: 16px;
  padding-bottom: 12px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
