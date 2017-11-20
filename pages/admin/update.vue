<template>
  <div class="c_container">
    <div class="p_left">
      <admin-bar></admin-bar>
    </div>
    <div class="p_right">
      <h3>修改密码</h3>
      <form class="update" @submit.prevent="updatePassword($event)">
        <div class="form_control">
          <p class="admin_title">旧密码</p>
          <input class="admin_input" type="text" name="old_password" v-model.trim="old_password">
          <span class="v_field" v-show="!this.validator && !this.old_password">*密码不能为空</span>
        </div>
        <div class="form_control">
          <p class="admin_title">新密码</p>
          <input class="admin_input" type="text" name="new_password" v-model.trim="new_password">
          <span class="v_field" v-show="!this.validator && !this.new_password">*密码不能为空</span>
        </div>
        <div class="form_control">
          <p class="admin_title">新密码</p>
          <input class="admin_input" type="text" name="new_confirm" v-model.trim="new_confirm">
          <span class="v_field" v-show="!this.validator && !this.new_confirm">*密码不能为空</span>
          <span class="v_field" v-show="!this.validator && this.not_match">*两次密码输入不一致</span>
        </div>
        <button id="update" class="submit_button">确定</button>
      </form>
    </div>
  </div>
</template>
<script>
  import AdminBar from '~/components/AdminBar'
  import { _updatePassword } from '~/util/user'
  export default {
    head () {
      return {
        title: '修改密码'
      }
    },
    data () {
      return {
        validator: true,
        old_password: '',
        new_password: '',
        new_confirm: '',
        not_match: false
      }
    },
    methods: {
      updatePassword (e) {
        var validatorResult = this.checkForm()
        if (!validatorResult) {
          e.preventDefault()
          return false
        }
        let params = {
          oldp: this.old_password,
          newp: this.new_password
        }
        console.log('params', params)
        _updatePassword(params)
          .then((res) => {
            alert('密码修改成功')
          })
          .catch((error) => {
            console.log(error)
          })
      },
      checkForm () {
        if (!this.old_password || !this.new_password || !this.new_confirm) {
          this.validator = false
          this.not_match = false
          return false
        } else if (this.new_password !== this.new_confirm) {
          this.validator = false
          this.not_match = true
          return false
        } else {
          this.not_match = false
          return true
        }
      }
    },
    watch: {
      new_confirm: function (val) {
        if (val === this.new_password) {
          this.not_match = false
        } else if (!val) {
          this.not_match = false
        }
      }
    },
    components: {
      AdminBar
    }
  }
</script>