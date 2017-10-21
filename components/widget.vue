<template>
  <div>
     <div class="widget tagcloud" v-show="postList.length">
      <h3 class="widget-title">标签</h3>
      <div class="widget-content">
        <a href="" v-for="(post,index) in postList" :key="index">{{ post.tag }}</a>
      </div>
    </div>
    <div class="widget" v-show="recentPosts.length">
      <div class="widget-title">最新文章</div>
      <div class="widget-content">
        <ul class="post-list">
          <li class="post-list-item" v-for="(post, index) in recentPosts" :key="index">
            <a href="">{{ post.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      postList: {
        type: Array,
        default: []
      }
    },
    computed: {
      recentPosts () {
        return this.postList.length <= 10 ? this.postList : this.postList.slice(0, 10)
      }
    }
  }
</script>
<style>
  .widget{
  background-color: rgba(249, 249, 249, 0.7);
  margin-bottom: 30px;
  word-wrap: break-word;
  -webkit-box-shadow: 1px 2px 3px #dddddd;
  box-shadow: 1px 2px 3px #dddddd;
}
.widget-title{
  padding: 15px 20px;
  font-size: 1.5em;
  border-bottom: 1px solid #DDD;
  font-weight: normal;
  color:rgb(102, 102, 102);
}
.widget.tagcloud a {
  margin-right: 10px;
  display: inline-block;
  padding: 3px;
}
.widget a {
  font-size: 12px;
  color: #1ba1e2;
}
.widget a:hover{
  text-decoration:underline;
}
.widget-content {
  font-size: 13px;
  padding: 15px 20px;
}
</style>