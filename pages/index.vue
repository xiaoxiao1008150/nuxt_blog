<template>
<div>
  <div class="c_container">
    <div class="clearfix">
      <div class="c_left">
        <article class="c_article" v-for="post in posts">
          <header class="c_header">
             <h1>
                <i class="iconfont">&#xe6f3;</i>
                <nuxt-link :to=" '/post/' + post._id + '?' " >{{ post.title }}</nuxt-link>
            </h1>
             <p class="c_time"><span>{{ post.created | formatDate("yyyy-MM-dd")  }}</span></p>
          </header>
          <div class="c_content">
             <div class="text" v-html="post.brief"></div>
          </div>
          <footer class="c_footer">
            <i class="iconfont">&#xe6f8;</i>
            <!-- <span class="post" >全文</span> -->
            <nuxt-link class="post" :to=" '/post/' + post._id + '?' ">全文</nuxt-link>
            <div class="right">
              <span class="categories">分类</span>
              <span class="tags">{{ post.category.name }}</span> 
            </div>
          </footer>
        </article>
        <pagination v-if="len" :totalPage="totalPage" @pageChange="handleCurrentChange" :page="page" :pageSize="pageSize"></pagination>
      </div>
      <div class="c_right">
        <side :postList="posts"></side>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { _getAllPosts } from '~/util/post'
import Pagination from '~/components/Pagination'
import Side from '~/components/Side'
export default {
  data () {
    return {
      posts: [],
      pageSize: 3,
      page: 1,
      totalPage: 0,
      pass: true,
      len: 0
    }
  },
  head () {
    return {
      title: '文章'
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.$nuxt.$router.push({path: this.$nuxt.$route.path, query: { page: this.page }})
    },
    getPostList () {
      let query
      if (this.$nuxt.$route.query.page) {
        this.page = parseInt(this.$nuxt.$route.query.page)
        query = `page=${this.$nuxt.$route.query.page}&pageSize=${this.pageSize}`
      } else {
        query = `page=${this.page}&pageSize=${this.pageSize}`
      }
      _getAllPosts(query)
        .then((res) => {
          if (res.status === 1) {
            this.posts = res.posts
            this.len = this.posts && this.posts.length
            this.totalPage = res.totalPage
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  watch: {
    // 监听路由变化，随时获取新的列表信息
    '$nuxt.$route.query': 'getPostList'
  },
  created () {
    this.getPostList()
  },
  components: {
    Pagination,
    Side
  }
}
</script>

<style scoped>
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
   padding: 0 25px 0 25px;
}
.c_content img {
    width: 100%;
    height: 300px;
    margin: 0 auto;
    display: block;
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
.c_footer a,
.c_footer > i{
  color:#999999;
  vertical-align: middle;
  font-size: 12px;
  font-weight:bold;
} 
.c_footer > i{
  font-weight:900;
}
.c_footer a:hover{
  color: #3ba5e3;
}
.categories{
  margin-right: 8px;
}

.post-list-item{
  line-height: 20px;
}
</style>
