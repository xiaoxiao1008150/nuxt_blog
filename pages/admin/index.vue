<template>
  <div class="c_container clearfix">
    <div class="p_left">
      <admin-bar></admin-bar>
    </div>
    <div class="p_right">
      <table class="p_table">
        <thead>
          <tr class="p_th p_tr">
            <th>标题</th>
            <th>分类</th>
            <th>添加时间</th>
            <th>被赞</th>
            <th>状态</th>
            <th>管理</th>
          </tr>
        </thead>
        <tbody >
          <tr class="p_tr" v-for="(post,index) in posts" :key="index">
            <td>{{ post.title }}</td>
            <td>{{ post.category.name }}</td>
            <td>{{ post.created | formatDate("yyyy-MM-dd") }}</td>
            <td>12</td>
            <td>{{ post.published }}</td>
            <td class="t_icon">
              <nuxt-link :to=" '/admin/addPost?id=' + post._id "  >
                <i class="iconfont">&#xe6f5;</i>
              </nuxt-link>
                <i class="iconfont">&#xe738;</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import AdminBar from '~/components/AdminBar'
  import { _getAllPosts } from '~/util/post'
  export default {
    asyncData ({ error }) {
      return _getAllPosts()
        .then((res) => {
          console.log('tes==', res)
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
    data () {
      return {
        posts: []
      }
    },
    methods: {
      editPost () {

      }
    },
    created () {
    },
    components: {
      AdminBar
    }
  }
</script>
<style>
.p_tr td,
.p_tr th{
  padding:8px;
}
.p_tr th{
  background:#f4f9fe;
  text-align:center;
  color:#66a3d3;
}
.p_table{
  width:100%;
  border-collapse:collapse;
  text-align: center;
  border-radius: 4px;
}
td, th{
  border:1px solid #e5eff8;
}
.t_icon i{
  font-size:20px;
  margin-right:10px;
}

</style>