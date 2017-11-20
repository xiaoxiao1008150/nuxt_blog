<template>
<div class="c_container clearfix">
  <div class="c_left">
    <div class="main">
      <div class="m_year">
        <i class="iconfont">&#xe6f4;</i>
        <span>标签</span>
      </div>
      <ul class="m_title" v-if="posts.length">
        <li  v-for="(post, index) in posts" :key="index">
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
import Side from '~/components/Side'
import { _getTagPosts } from '~/util/post'

export default {
  head () {
    return {
      title: '文章列表'
    }
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    getTagPosts (tag) {
      _getTagPosts(tag)
        .then((res) => {
          this.posts = res.posts
        })
        .catch((error) => {
          error({ statusCode: 404, message: 'Post not found' })
        })
    }
  },
  created () {
    let tag = this.$nuxt.$route.params.tag
    this.getTagPosts(tag)
  },
  components: {
    Side
  }
}
</script>