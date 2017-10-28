<template>
  <div class="c_container clearfix">
    <div class="p_left">
      <admin-bar></admin-bar>
    </div>
    <div class="p_right">
      <h3>添加文章</h3>
      <form class="add_post" @submit.prevent="addPost($event)">
        <input style="display:none" class="admin_input" type="text" name="id"  v-model.trim="id">
        <div class="form_control">
          <p class="admin_title">标题</p>
          <input class="admin_input" type="text" name="title" placeholder="请输入标题..." v-model.trim="title">
          <span class="v_field" v-show="!this.validator && !this.title">*请填入标题</span>
        </div>
        <div class="form_control">
          <p class="admin_title">摘要</p>
          <input class="admin_input" type="text" name="brief" placeholder="请输入摘要..." v-model.trim="brief">
          <span class="v_field" v-show="!this.validator && !this.brief">*请填入摘要</span>
        </div>
        <div class="form_control">
          <p class="admin_title">关键词</p>
          <input class="admin_input" type="text" name="tag" placeholder="请输入关键词..." v-model.trim="tag">
          <span class="v_field" v-show="!this.validator && !this.tag">*请填入关键词</span>
        </div>
        <div class="form_control">
          <p class="admin_title">分类</p>
          <select class="a_select" name="category" v-model="category">
            <option disabled value="">请选择</option>
            <option v-for="item in categories">
              {{item .name}}
            </option>
          </select>
          <span class="v_field" v-show="!this.validator && !this.category">*请选择类型</span>
        </div>
        <div class="form_control">
          <p class="admin_title exp_title">内容</p>
          <span class="v_field" v-show="!this.validator && !this.content">*请输入内容</span>
          <div>
             <editor @change="newContent"></editor>
          </div>
        </div>
        <button type="submit" id="publish_button" class="submit_button">发布</button>
      </form>
    </div>
      <alert v-show="showAlert" :show="showAlert" :message="message" :type="type"></alert>
  </div>
</template>
<script>
  import AdminBar from '~/components/AdminBar'
  // import Markdown from '~/components/Markdown'
  import Editor from '~/components/Editor'
  import Alert from '~/components/Alert'
  // import axios from '~/plugins/axios'
  import { _getAllCategories } from '~/util/category'
  import { _addPost, _postDetailById } from '~/util/post'

  export default {
    asyncData ({ error }) {
      return _getAllCategories()
        .then((res) => {
          // console.log('testss==', res)
          return { categories: res.categories }
        })
        .catch((e) => {
          error({ statusCode: 404, message: 'Post not found' })
        })
    },
    head () {
      return {
        title: '添加文章'
      }
    },
    data () {
      return {
        id: '',
        title: '',
        brief: '',
        tag: '',
        category: '',
        content: '',
        validator: true,
        showAlert: false,
        message: '',
        type: 'success',
        flag: false
      }
    },
    methods: {
      initPost () {
        _postDetailById(this.id)
          .then((res) => {
            if (res.status === 1) {
              let post = res.post
              let tag = (post.tag).join(' ')
              // console.log('hh==', post)
              this.title = post.title
              this.brief = post.brief
              this.tag = tag
              this.category = post.category.name
              this.content = post.content
            }
          })
          .catch((error) => {
            this.showAlert = true
            this.type = 'error'
            this.message = '请稍后重新尝试'
            console.log(error)
            setTimeout(() => {
              this.showAlert = false
            }, 1500)
          })
      },
      addPost (e) {
        // flag 是需要改的文章，不是直接新增的文章
        var validatorResult = this.checkForm()
        if (!validatorResult) {
          e.preventDefault()
          return false
        }
        // 处理 tag 标签 字符串转化为数组
        let tag = (this.tag).split(' ')
        // console.log('this.tag==', this.tag)
        // console.log('tag==', tag)
        let params = {
          id: this.id,
          title: this.title,
          brief: this.brief,
          tag: tag,
          category: this.category,
          content: this.content
        }
        // console.log('tst=', params)
        _addPost(params)
          .then((res) => {
            if (res.status === 1) {
              this.showAlert = true
              this.message = res.msg
              setTimeout(() => {
                this.showAlert = false
              }, 1500)
            }
          })
          .catch((error) => {
            this.showAlert = true
            this.type = 'error'
            this.message = '请稍后重新尝试'
            console.log(error)
            setTimeout(() => {
              this.showAlert = false
            }, 1500)
          })
      },
      checkForm () {
        if (!this.title || !this.brief || !this.tag || !this.category || !this.content) {
          this.validator = false
          return false
        } else {
          return true
        }
      },
      newContent (content) {
        this.content = content
        // console.log('test====', this.content)
      }
    },
    created () {
      let query = this.$nuxt.$route.query
      // query.id 存在的话,说明此路由是有文件列表的“编辑文章”标签导航过来的，是需要重新编辑文章的
      // 没有query.id 说明是需要新增的
      if (query.id) {
        this.id = query.id
        this.flag = true
        this.initPost()
      }
    },
    components: {
      AdminBar,
      // Markdown,
      Editor,
      Alert
    }
  }
</script>
<style>

.a_select{
  height: 28px;
  width: 50%;
  background: #fff;
}
.a_select option{
  height:25px;
  line-height: 25px;
  background: #f4f9fe;
}
.exp_title{
  display: inline-block;
  width: calc( 50% - 5px);
}
#publish_button{
  
}
</style>