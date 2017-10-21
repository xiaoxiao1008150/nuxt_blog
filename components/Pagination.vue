<template>
  <div class="navigation">
    <ul class="wp-paginate">
      <li v-show="postList.length">
        <a class="title">«</a>
      </li>
      <li>
        <a class="title current" v-for='(post, index) in postList' :key="index"> {{ index + 1 }}</a>
      </li>
      <li v-show="postList.length">
        <a href="">»</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      postList: {
        type: Array,
        default: []
      }
    }
  }
</script>
<style>
.navigation{
  margin: 30px 0 0 25px;
}
.wp-paginate li {
  display: inline;
}
.wp-paginate li:hover{
  cursor: pointer;
}
.wp-paginate a {
  background: #f2f2f2;
  color: #444;
  margin-right: 10px;
  padding: 5px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.wp-paginate .current{
  background: #222;
  color: #fff;
}
</style>