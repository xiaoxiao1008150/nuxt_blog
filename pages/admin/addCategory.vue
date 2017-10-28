<template>
  <div class="c_container">
    <div class="p_left">
      <admin-bar></admin-bar>
    </div>
    <div class="p_right">
      <h3>添加分类</h3>
      <form class="add_category" @submit.prevent="addCategory($event)">
        <div class="form_control">
          <p class="admin_title">名称</p>
          <input class="admin_input" type="text" name="name" placeholder="请输入分类..." v-model.trim="name">
          <span class="v_field" v-show="!this.validator && !this.name">*请填入分类</span>
        </div>
        <button type="submit" id="category_button" class="submit_button">添加分类</button>
      </form>
    </div>
    <alert :show="showAlert" :message="message" :type="type"></alert>
  </div>
</template>
<script>
  // import axios from '~/plugins/axios'
  import { _addCategory } from '~/util/category'
  import AdminBar from '~/components/AdminBar'
  import Alert from '~/components/Alert'
  export default {
    head () {
      return {
        title: '添加分类'
      }
    },
    data () {
      return {
        name: '',
        validator: true,
        showAlert: false,
        message: '',
        type: 'success'
      }
    },
    methods: {
      addCategory (e) {
        var validatorResult = this.checkForm()
        if (!validatorResult) {
          e.preventDefault()
          return false
        }
        let params = {
          name: this.name
        }
        // axios.post('/api/add-category', params)
        _addCategory(params)
          .then((res) => {
            // console.log('hh===', res)
            if (res.status === 1) {
              this.showAlert = true
              this.message = res.msg
              setTimeout(() => {
                this.showAlert = false
              }, 1500)
            }
          })
          .catch((error) => {
            // console.log('error==', error)
            this.showAlert = true
            this.type = 'error'
            if (error.code === 1000) {
              this.message = '请稍后重新尝试'
            }
            if (error.code === 100) {
              this.message = '请求超时'
            }
            setTimeout(() => {
              this.showAlert = false
            }, 1500)
          })
      },
      checkForm () {
        if (!this.name) {
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
    components: {
      AdminBar,
      Alert
    }
  }
</script>