<template>
  <div id="comment">
    <div v-show="comments.length">
        <div class="co_list" v-for="comment in comments">
          <div class="co_field clearfix">
              <div class="cl_img left">
                <img src="~assets/img/default.png">
              </div>
              <div class="cl_text">
                <div class="co_name">{{comment.from.name}}</div>
                <div class="co_detail">{{comment.content}}</div>
                <div class="answer"><a link="#textarea" @click.prevent="goTextarea(comment._id,comment.from.name)">回复</a></div>
                <div class="reply-wrapper">
                  <div v-show="comment.reply.length">
                      <div class="reply_list" id="reply" 
                        v-for="(reply, index) in comment.reply" 
                        :key="index">
                        <div class="co_field clearfix">
                          <div class="cl_img left">
                            <img src="~assets/img/default.png">
                          </div>
                          <div class="cl_text">
                            <div class="co_name">{{reply.to.name}}回复{{comment.from.name}}</div>
                            <div class="co_detail">{{ reply.content }}</div>
                         </div>
                        </div>
                    </div>
                  </div>
                  <div class="reply_list" id="reply" v-if="replyComment.reply && cid===comment._id">
                    <div class="co_field clearfix">
                      <div class="cl_img left">
                        <img src="~assets/img/default.png">
                      </div>
                      <div class="cl_text">
                        <div class="co_name">{{replyComment.reply_text.to}}回复{{replyComment.reply_text.from}}</div>
                        <div class="co_detail">{{ replyComment.reply_text.content }}</div>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>

    <div class="co_list" id="new" v-if="newComment.start">
      <div class="co_field clearfix">
        <div class="cl_img left">
          <img src="~assets/img/default.png">
        </div>
        <div class="cl_text">
          <div class="co_name">{{newComment.from}}</div>
          <div class="co_detail">{{ newComment.content }}</div>
        </div>
      </div>
    </div>
  <!--   <div class="co_list" id="reply" v-if="replyComment.reply">
      <div class="co_field clearfix">
        <div class="cl_img left">
          <img src="~assets/img/default.png">
        </div>
        <div class="cl_text">
          <div class="co_name">{{replyComment.reply_text.to}}回复{{replyComment.reply_text.from}}</div>
          <div class="co_detail">{{ replyComment.reply_text.content }}</div>
        </div>
      </div>
    </div> -->
    <div class="co_textarea">
        <div class="cl_img left">
          <img src="~assets/img/default.png">
        </div>
        <div class="cl_text">
          <button v-show="!userLength" @click="register" class="submit_button" id="register_button">请注册评论</button>
          <textarea id="textarea" 
            ref="textarea"
            :placeholder="placeholderText"
            v-model.trim="comment_text"
          >
          </textarea>
          <button class="submit_button" 
            v-show="userLength" 
            @click="addComment(cid)">
            发布
          </button>
        </div>
    </div>
  </div>
</template>
<script>
  import { _addComment } from '~/util/comment'
  export default {
    props: {
      user: {
        type: Object,
        default: function () {
          return { }
        }
      },
      post: {
        type: Object,
        default: function () {
          return { }
        }
      },
      comments: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        // loading: false,
        comment_text: '',
        newComment: {},
        replyComment: {},
        // showComment: false,
        cid: '',
        comment_name: '',
        reply: false
      }
    },
    methods: {
      register () {
        this.$emit('register')
      },
      goTextarea (id, name) {
        console.log('test')
        this.cid = id
        this.comment_name = name
        this.reply = true
        this.$refs.textarea.focus()
      },
      addComment (cid) {
        // falg 为true,说明是回复评论，不是发表评论
        let params = {
          comment: this.comment_text,
          post: this.post._id,
          user: this.user,
          hasCommentId: cid
        }
        // console.log('params==', params)
        _addComment(params)
          .then((res) => {
            if (cid) {
              this.replyComment = res
              console.log('reply==', res)
              alert(`${this.user.name}回复评论成功`)
            } else {
              this.newComment = res
              console.log('new==', res)
              alert(`${this.user.name}消息发布成功`)
            }
            console.log('~~~~~~')
            // this.loading = true
            this.comment_text = ''
            // this.showComment = true
            this.reply = false
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    computed: {
      userLength () {
        return this.user.name
      },
      placeholderText () {
        if (!this.user.name) {
          this.user.name = ''
        }
        return this.reply ? `${this.user.name}回复${this.comment_name}:` : `${this.user.name}说点什么吧...`
      }
    }
  }
</script>
<style>
#comment{
  background: #fff;
  padding: 15px;
}
.co_list{
  /*padding-left:50px;*/
}
.co_field{
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
}
.cl_img img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}
.cl_text{
  margin-left:55px;
}
.co_name{
  color: #999;
  font-size: 12px;
  height: 14px;
  line-height: 14px;
  width: 100%;
  display: inline-block;
  overflow: hidden;
  margin-bottom: 10px;
}
.co_detail{
  color: #666;
  width: 95%;
  display: inline-block;
  line-height: 20px;
  margin-bottom: 15px;
}
.co_textarea{
  margin-top: 30px;
  padding: 10px 30px 10px 10px;
}
#textarea{
  width:100%;
  display: block;
  margin: 0 auto;
  min-height:100px;
  resize: none;
  padding: 8px;
}
#register_button{
  margin-top:0;
  margin-bottom:10px;
}
.b_disabled{
  cursor: not-allowed;
}
.answer a{
color:#1ba1e2;
}
</style>