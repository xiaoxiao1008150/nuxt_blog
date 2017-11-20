<template>
 <div>
  <div class="c_container clearfix">
    <div class="p_left">
      <admin-bar></admin-bar>
    </div>
    <div class="p_right">
      <p v-if="$store.state.authUser">欢迎{{ $store.state.authUser.username}}! </p>
      <table class="p_table">
        <thead>
          <tr class="p_th p_tr">
            <th>标题 
              <i class="iconfont icon down-icon" v-show="!tdown" 
                @click="titleChange(-1, 'title', false)">&#xe70c;</i>
              <i class="iconfont icon up-icon" 
                v-show="tdown"
                @click="titleChange(1, 'title', true)"
              >&#xe716;</i>
            </th>
            <th>分类
              <!-- <select v-model="selected">
                <option disabled value="">请选择</option>
                <option v-for="(category,index) in categories" :key="index">
                  {{ category.name }}
                </option>
              </select> -->
            </th>
            <th>添加时间
              <i class="iconfont icon down-icon" v-show="!mdown" 
                  @click="titleChange(-1, 'created', false)">&#xe70c;</i>
                <i class="iconfont icon up-icon" 
                  v-show="mdown"
                  @click="titleChange(1, 'created', true)"
                >&#xe716;</i>
            </th>
            <th>被赞次数
              <i class="iconfont icon down-icon" v-show="!zdown" 
                  @click="titleChange(-1, 'meta.votes', false)">&#xe70c;</i>
                <i class="iconfont icon up-icon" 
                  v-show="zdown"
                  @click="titleChange(1, 'meta.votes', true)"
                >&#xe716;</i>
            </th>
            <th>浏览次数
               <i class="iconfont icon down-icon" v-show="!Ldown" 
                  @click="titleChange(-1, 'meta.ips',false)">&#xe70c;</i>
                <i class="iconfont icon up-icon" 
                  v-show="Ldown"
                  @click="titleChange(1, 'meta.ips', true)"
                >&#xe716;</i>
            </th>
            <th>状态</th>
            <th>管理</th>
          </tr>
        </thead>
        <tbody v-if="posts && posts.length">
          <tr class="p_tr" v-for="(post,index) in posts" :key="index">
            <td><nuxt-link class="admin_a"  :to=" '/post/' + post._id + '?' " >{{ post.title }}</nuxt-link></td>
            <td>{{ post.category.name }}</td>
            <td>{{ post.created | formatDate("yyyy-MM-dd") }}</td>
            <td>{{ post.meta.votes }}</td>
            <td>{{ post.meta.ips }}</td>
            <td>{{ post.published ? '已发布' : '未发布' }}</td>
            <td class="t_icon">
              <nuxt-link :to=" '/admin/addPost?id=' + post._id "  >
                <i class="iconfont">&#xe6f5;</i>
              </nuxt-link>
                <i class="iconfont" @click="delatePost(post._id)">&#xe738;</i>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination :totalPage="totalPage" @pageChange="handleCurrentChange" :page="page" :pageSize="pageSize"></pagination>
    </div>
  </div>
 </div>
</template>
<script>
  import AdminBar from '~/components/AdminBar'
  import Pagination from '~/components/Pagination'
  import { _getAllPosts, _deletePost } from '~/util/post'
  import { _getAllCategories } from '~/util/category'

  export default {
    fetch ({ store, redirect }) {
      if (!store.state.authUser) {
        return redirect('/login')
      }
    },
    async asyncData ({ query, error }) {
      return _getAllCategories()
        .then((res) => {
          return { categories: res.categories }
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
        posts: [],
        selected: '',
        tdown: true,
        mdown: true,
        zdown: true,
        Ldown: true,
        field: '',
        pageSize: 3,
        page: 1,
        totalPage: 0,
        urlFlag: false
      }
    },
    methods: {
      // 按字符升序
      handleCurrentChange (val, flag, field, icon) {
        this.page = parseInt(val)
        if (flag && field) {
          this.$nuxt.$router.push({path: this.$nuxt.$route.path,
            query: {
              page: this.page,
              pageSize: this.pageSize,
              sortby: field,
              sortdir: parseInt(flag),
              icon: icon
            }})
        } else {
          this.$nuxt.$router.push({path: this.$nuxt.$route.path,
            query: {
              page: this.page,
              pageSize: this.pageSize,
              sortby: 'created',
              sortdir: 1,
              icon: true
            }})
        }
        // this.$nuxt.$router.replace({query: {page: this.page}}) // 其中val是当前的页数。
      },
      titleChange (flag, field, icon) {
        this.handleCurrentChange(1, flag, field, icon)
      },
      initPost () {
        let query
        // if (this.$nuxt.$route.query.page) {
        //   this.page = parseInt(this.$nuxt.$route.query.page)
        //   query = `page=${this.$nuxt.$route.query.page}&pageSize=${this.pageSize}`
        // } else {
        //   query = `page=${this.page}&pageSize=${this.pageSize}`
        // }
        // query = `page=${this.page}&pageSize=${this.pageSize}`
        if (this.$nuxt.$route.query.page) {
          this.page = parseInt(this.$nuxt.$route.query.page)
          query = (this.$nuxt.$route.fullPath).split('?')[1]
        } else {
          query = `page=${this.page}&pageSize=${this.pageSize}`
        }
        _getAllPosts(query)
          .then((res) => {
            this.posts = res.posts
            this.totalPage = res.totalPage
          })
      },
      delatePost (id) {
        let params = { id }
        _deletePost(params)
          .then((res) => {
            alert('文章删除成功')
            this.initPost()
          })
          .catch((error) => {
            console.log(error)
            alert('删除失败')
          })
      }
    },
    created () {
      this.initPost()
    },
    mounted () {
      let field = this.$nuxt.$route.query.sortby
      let icon = this.$nuxt.$route.query.icon
      if (field === 'title') {
        this.tdown = !icon
      } else if (field === 'created') {
        this.mdown = !icon
      } else if (field === 'meta.votes') {
        this.zdown = !icon
      } else if (field === 'meta.ips') {
        this.Ldown = !icon
      }
    },
    watch: {
      '$nuxt.$route.query': 'initPost'
    },
    // beforeRouteEnter (to, from, next) {
    //   console.log('hh~~~~')
    //   // let username = localStorage.getItem('admin_name')
    //   if (!username) {
    //     this.$nuxt.$router.push({path: '/admin'})
    //   }
    //   next()
    // // 在渲染该组件的对应路由被 confirm 前调用
    // // 不！能！获取组件实例 `this`
    // // 因为当守卫执行前，组件实例还没被创建
    // },
    components: {
      AdminBar,
      Pagination
    }
  }
</script>
<style>
.p_tr td,
.p_tr th{
  padding:8px 0;
}
tbody tr:hover{
  background: rgba(103,164,213,.19)
}
.p_tr th{
  background:#f4f9fe;
  text-align:center;
  color:#66a3d3;
  position: relative;
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
.icon{
  margin-left:8px;
  cursor: pointer;
}
.admin_a{
  color:rgb(103, 129, 151);
}
.admin_a:hover {
  color:#1ba1e2;
}


</style>