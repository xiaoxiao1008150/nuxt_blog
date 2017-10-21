<template>
<div class="c_container">
  <div class="clearfix">
    <div class="c_left">
      <article class="c_article" v-for="post in posts">
        <header class="c_header">
           <h1>
              <i class="iconfont">&#xe6f3;</i>
              <a href="/post/detail">{{ post.title }}</a>
          </h1>
           <p class="c_time"><span>{{ post.created | formatDate("yyyy-MM-dd")  }}</span></p>
        </header>
        <div class="c-thumbnail">
           <img src="~assets/img/default.png">
        </div>
        <div class="c_content">
           <p class="text">{{ post.content }}</p>
        </div>
        <footer class="c_footer">
          <i class="iconfont">&#xe6f8;</i>
          <span class="post">全文</span>
          <div class="right">
            <span class="categories">分类</span>
            <span class="tags">{{ post.category.name }}</span> 
          </div>
        </footer>
      </article>
    </div>
    <div class="c_right">
      <widget :postList="posts"></widget>
    </div>
  </div>
  <pagination :postList="posts"></pagination>
</div>

</template>

<script>
import { _getAllPosts } from '~/util/post'
import Pagination from '~/components/Pagination'
import Widget from '~/components/Widget'
export default {
  // async asyncData () {
  //   let { data } = await axios.get('/api/users')
  //   return { users: data }
  // },
  // asyncData ({ params, error }) {
  //   return axios.get('/api/posts')
  //     .then((res) => {
  //       return { posts: res.data.posts }
  //     })
  //     .catch((e) => {
  //       error({ statusCode: 404, message: 'Post not found' })
  //     })
  // },
  data () {
    return {
      posts: []
    }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  methods: {
    _getPostList () {
      _getAllPosts()
        .then((res) => {
          if (res.status === 1) {
            this.posts = res.posts
          }
        })
        .catch((e) => {
          console.log('kk')
        })
    }
  },
  created () {
    this._getPostList()
  },
  components: {
    Pagination,
    Widget
  }
}
</script>

<style scoped>
.c-thumbnail{
  height:347px;
}
.c-thumbnail img{
  width:100%;
  height:100%;
}
.c_header{
  /*padding-left: 25px;*/
}
.c_header h1{
  line-height: 60px;
  font-size: 16px;
  padding: 0 80px 0 25px;
}
.c_header h1 a,
.c_header h1 i{
  font-size: 30px;
  vertical-align: middle;
  color: #3ba5e3;
}
.c_header h1 i{
  margin-right: 10px;
}
.c_time{
  position: absolute;
  top: 25px;
  right: 24px;
  width: 80px;
  font-family: 'Georgia', serif;
  text-align: center;
  line-height: 1;
}
.c_header h1:hover{
  color:#ed4120;
}
.c_content{
   padding: 25px 25px 0 25px;
}
.text{
  color:rgb(68, 68, 68);
  padding: 10px 0  15px 0;
  border-bottom: 1px solid #DDD;
}
.c_footer{
  margin-top: 15px;
  padding: 0 25px 15px 25px;
}
.c_footer span,
.c_footer > i{
  color:#999999;
  vertical-align: middle;
  font-size: 12px;
  font-weight:bold;
} 
.c_footer > i{
  font-weight:900;
}
.categories{
  margin-right: 8px;
}

.post-list-item{
  line-height: 20px;
}
</style>
