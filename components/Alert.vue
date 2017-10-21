<template>
  <transition name="fade">
    <div v-show="show">
      <div  ref="alert" id="blog_alert" :class="classObject" :type="type" >
      {{ message }}
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      message: {
        type: String
      },
      show: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'success'
      }
    },
    data () {
      return {
        Aw: 0
      }
    },
    computed: {
      classObject () {
        if (this.type === 'success') { return { alert_success: true } }
        if (this.type === 'error') { return { alert_error: true } }
      }
    }
  }
</script>
<style>
#blog_alert{
  position: fixed;
  width: 30%;
  height: 50px;
  line-height: 36px;
  top:20px;
  left:35%;
  text-align: center;
  padding: 8px;
  border: 1px solid #d4e8fd;
  border-radius: 3px;

  color:#fff;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}
.alert_success{
  background: #68cd86;
}
.alert_error{
  background: #e54d42
}
</style>