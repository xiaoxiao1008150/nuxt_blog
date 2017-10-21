<template>
<div class="c_container clearfix">
  <div class="c_left">
    <div class="main">
      <div class="m_year">
        <i class="iconfont">&#xe6f4;</i>
        <span>2017年</span>
      </div>
      <ul class="m_title">
        <li><time class="m_time">9-25</time><span>fsfsfsfssssssssssss</span></li>
        <li><time class="m_time">9-24</time><span>哈哈fsfs哈</span></li>
        <li><time class="m_time">9-23</time><span>哈fs哈哈</span></li>
      </ul>
    </div>
  </div>
  <div class="c_right">
    <widget></widget>
  </div>
</div>
</template>
<script>
import Widget from '~/components/Widget'
export default {
  head () {
    return {
      title: '文章列表'
    }
  },
  components: {
    Widget
  }
}
</script>
<style>
.main{
  padding:10px 10px 10px 50px;
  color:rgb(102, 102, 102);
  background:#fff;
  border-radius: 10px;
  border: 1px solid rgb(238, 238, 238);
  -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
  box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.18);
}
.m_year{
  height:50px;
  line-height: 50px;
  font-weight:900;
}
.m_year span,
.m_year i{
  font-size: 20px;
  color:rgb(82, 156, 229);
}
.m_year i{
  margin-right:5px;
}
.m_title li{
  height: 35px;
  line-height:35px;
  /*font-size: 14px;*/
  /*color:rgb(82, 156, 229);*/
  color:rgb(102, 102, 102);
}
.m_title li:hover{
  cursor: pointer;
  color:#1ba1e2;
}
.m_time{
  margin-right: 15px;
}
</style>