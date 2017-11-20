<template>
<div class="c_container clearfix">
  <div class="c_left">
    <div class="main" v-for="(item, key) in posts">
      <div class="m_year">
        <i class="iconfont">&#xe6f4;</i>
        <span>{{ key }}</span>
      </div>
      <ul class="m_title">
        <li v-for="(post, index) in item" :key="index" >
        <nuxt-link :to=" '/post/' + post._id + '?' " >
          <time class="m_time">{{ post.created | formatDate("yyyy-MM-dd") }}</time>
          <span>{{ post.title }}</span>
        </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="c_right">
    <side></side>
  </div>
</div>
</template>
<script>
import { _getAllPosts } from '~/util/post'
import Side from '~/components/Side'

export default {
  asyncData ({ error }) {
    let query = 'year=all'
    return _getAllPosts(query)
      .then((res) => {
        return { posts: res.posts }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  },
  head () {
    return {
      title: '文章列表'
    }
  },
  components: {
    Side
  }
}
</script>