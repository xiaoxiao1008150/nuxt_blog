<template>
<div class="c_container clearfix" id="d_wrapper">
  <div class="c_left">
    <article class="c_article" id="d_article">
      <div>
        <h1>title</h1>
        <div class="d_content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </article>
  </div>
  <div class="c_right">
    <widget></widget>
  </div>
</div>
</template>
<script>
import Widget from '~/components/Widget'
export default {
  layout: 'detail',
  components: {
    Widget
  }
}
</script>
<style>
#d_wrapper{
  margin:0 auto;
  padding-top:30px;
}
#d_article{
  border-top:3px solid #1ba1e2;
  padding:15px;
}
#d_article h1{
  line-height: 60px;
  font-size: 20px;
  border-bottom:1px solid #ccc;
  margin-bottom: 20px;
}
</style>