<template>
  <div class="c_container">
    <div class="p_left">
      <admin-bar></admin-bar>
    </div>
    <div class="p_right">
      <h3>修改密码</h3>
      <form class="update">
        <div class="form_control">
          <p class="admin_title">旧密码</p>
          <input class="admin_input" type="text" name="old">
        </div>
        <div class="form_control">
          <p class="admin_title">新密码</p>
          <input class="admin_input" type="text" name="new">
        </div>
        <button id="update" class="submit_button">确定</button>
      </form>
    </div>
  </div>
</template>
<script>
  import AdminBar from '~/components/AdminBar'
  export default {
    head () {
      return {
        title: '修改密码'
      }
    },
    components: {
      AdminBar
    }
  }
</script>