<template>
<div class="c_container clearfix" id="d_wrapper">
  <div class="c_left">
    <article class="c_article" id="d_article">
      <div>
        <h1>{{post.title}}</h1>
        <div id="d_nav">
          <span class='d_time'>{{ post.created | formatDate("yyyy-MM-dd")  }}</span>
          <span class="exp_num">浏览次数</span>
          <span>{{ ips + 1 }}</span>
          <span class="exp_num zan_icon" @click="vote">👍</span>
          <span>{{ votes }}</span>
        </div>
        <div class="d_content" v-html="post.content">
        </div>
      </div>
    </article>
    <comment @register="showRegister" :user="user" :post="post" :comments="comments"></comment>
  </div>
  <div class="c_right">
    <widget :postList="posts"></widget>
  </div>
  <div id="mock_register" v-show="this.showR">  
    <form class="login" id="user_form"  @submit.prevent="register($event)">
        <h3>注册</h3>
        <div class="form_control">
          <label for="name">用户名</label>
          <input id="name" type="text" name="name" v-model.trim="name">
          <span class="exp_field" v-show="!this.validator && !this.name">*用户名不能为空</span>
        </div>
        <div class="form_control">
          <label for="password">密码</label>
          <input id="password" type="text" name="password" v-model.trim="password">
          <span class="exp_field" v-show="!this.validator && !this.password">*密码不能为空</span>
        </div>
        <button type="submit" class="submit_button" id="add-user">提交</button>
    </form>
  </div>
</div>
</template>
<script>
import Widget from '~/components/Widget'
import Comment from '~/components/Comment'
import { _postDetailById, _addVotes, _getAllPosts } from '~/util/post'
import { _addUser, _getUser } from '~/util/user'
import { _getComment } from '~/util/comment'
export default {
  // layout: 'detail',
  data () {
    return {
      votes: 0,
      ips: 0,
      help: 0,
      post: {},
      posts: [],
      showR: false,
      user: {},
      name: '',
      password: '',
      validator: true,
      comments: []
    }
  },
  methods: {
    checkForm () {
      if (!this.name || !this.password) {
        this.validator = false
        return false
      } else {
        return true
      }
    },
    register (e) {
      let validatorResult = this.checkForm()
      if (!validatorResult) {
        e.preventDefault()
        return false
      }
      let params = {
        name: this.name,
        password: this.password
      }
      _addUser(params)
        .then((res) => {
          this.user = res.user
          console.log('user==', this.user)
          localStorage.setItem('blog_id', res.user._id)
          this.showR = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showRegister () {
      this.showR = true
    },
    initPost () {
      // console.log('testllll~~~~~', 'zz')
      let id = this.$nuxt.$route.params.detail
      _postDetailById(id)
        .then((res) => {
          this.post = res.post
          this.ips = res.post.meta.ips
          // console.log('hh===', res.post)
          this.help = res.post.meta.votes
          this.votes = this.help
        })
        .catch((error) => {
          console.log(error)
        })
    },
    initComment () {
      let id = this.$nuxt.$route.params.detail
      _getComment(id)
        .then((res) => {
          // res.comments 是一个数组
          this.comments = res.comments
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
    },
    vote () {
      let id = this.$nuxt.$route.params.detail
      _addVotes(id)
        .then((res) => {
          if (res.status === 1) {
            this.help++
            this.$nextTick(() => {
              this.votes = this.help
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  // 注意，此处不能是created,因为created 会渲染两次，使得浏览次数增加2次
  mounted () {
    // console.log('mounted======~~~~~~~')
    this.initPost()
    this._getPostList()
    this.initComment()
    // 初始化user
    let id = localStorage.getItem('blog_id')
    if (id) {
      _getUser(id)
        .then((res) => {
          this.user = res.user
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // console.log('hh===', this.$nuxt.$route.params.detail)
  },
  components: {
    Widget,
    Comment
  }
}
</script>
<style>
#d_wrapper{
  margin:0 auto;
  padding:30px 0;
  background: #f4f9fe;
}
#d_article{
  border-top:3px solid #1ba1e2;
  padding:15px;
  text-align: center;
  color:rgb(102, 102, 102);
  line-height: 22px;
  text-align: justify;
}
#d_article h1{
  line-height: 40px;
  font-size: 20px;
  color:rgb(27, 161, 226);
}
#d_nav{
  border-bottom:1px solid #ccc;
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 12px;
  color:#898181;
}
#d_nav{
  /*padding: 0 10px 0 0;*/
}
.exp_num{
  margin: 0 5px 0 20px;
}
#mock_register{
  position: fixed;
  z-index: 1000;
  width: 100%;
  max-width:460px;  
  left:25%;
  top: 80px;
  padding: 20px 0;
  background: rgb(203, 229, 243);
}
.login{
  width:60%;
  margin:0 auto;
  text-align: center;
}
.login h3{
  font-size: 18px;
  line-height: 40px;
}
.form_control{
  margin-bottom: 20px;
}
.form_control input{
  width: 250px;
  padding: 3px 8px;
  border-radius: 4px;
  height:24px;
  line-height:24px;
  border:1px solid #ccc;
}
.form_control label{
  color:rgb(102, 102, 102);
  font-size: 16px;
  width:60px;
  text-align: justify;
  height: 30px;
  line-height: 30px;
  margin-right: 8px;
  display: inline-block;
}
#add-user{
  margin:0;
}
#user_form{
  color:rgb(102, 102, 102);
  width: 100%;
}
.exp_field{
  display: block;
  font-size: 12px;
  color: red;
  /*margin-top: 10px;*/
}
.zan_icon{
  cursor: pointer;
}

</style>