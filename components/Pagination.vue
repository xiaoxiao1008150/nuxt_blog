<template>
  <div class="navigation">
    <ul class="wp-paginate">
      <li @click="prePage" >
        <a class="title" :class="{disableClass: disableFirst}">«</a>
      </li>
      <li 
        @click="indexChange(n)" 
        v-for='n in totalPage' 
        :key="n"
        :class="{ current: n === index }"
        >
        <a class="title" > {{n}}</a>
      </li>
      <li  @click.prevent="nextPage" >
        <a href="" :class="{disableClass: disableLast}">»</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      totalPage: {
        type: Number,
        default: 0
      },
      page: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        index: 1
      }
    },
    methods: {
      prePage () {
        this.index--
        if (this.index < 1) {
          this.index = 1
        } else {
          this.$emit('pageChange', parseInt(this.index))
        }
      },
      nextPage () {
        this.index++
        if (this.index > this.totalPage) {
          this.index = this.totalPage
        } else {
          this.$emit('pageChange', parseInt(this.index))
        }
      },
      indexChange (num) {
        this.index = num
        this.$emit('pageChange', parseInt(num))
      }
    },
    computed: {
      disableFirst () {
        if (this.index === 1) {
          return true
        }
      },
      disableLast () {
        if (this.index === this.totalPage) {
          return true
        }
      }
    },
    mounted () {
      this.index = this.page
    }
  }
</script>
<style>
.navigation{
  margin: 50px 0 0 25px;
}
.wp-paginate{
  /*background: red*/
}
.wp-paginate li {
  display: inline-block;
  margin-right: 20px;
  /*background: pink;*/
  width: 28px;
  height: 30px;
  line-height: 28px;
}
.wp-paginate li:hover{
  cursor: pointer;
}
.wp-paginate a {
  background: #ebe7e7;
  color: #444;
  text-align: center;
  text-decoration: none;
  display:block;
  width:100%;
  height:100%;
}
.current > a{
  background: #222;
  color: #fff;
}
.disableClass{
  cursor: not-allowed;
  /*visibility: hidden;*/
}
</style>