<template>
  <div id="exp_wrapper">
    <my-header/>
    <!-- <keep-alive> -->
      <nuxt/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
// import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'

export default {
  components: {
    // MyFooter,
    MyHeader
  }
}
</script>

<style>
#exp_wrapper{
  background: #f4f9fe;
  padding-bottom: 40px;
}
</style>
