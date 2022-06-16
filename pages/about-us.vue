<template>
  <div>
    <h1>About us page (content to be uploaded)</h1>
    <h3>THE TITLE IS -> {{ getAboutUsPageContent.data.title }}</h3>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "about-us",
  computed: {
    ...mapGetters({
      getAboutUsPageContent: "config/getAboutUsPageContent"
    })
  },
}
</script>

<style scoped>

</style>
