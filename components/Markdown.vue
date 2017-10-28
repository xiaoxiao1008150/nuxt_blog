<template>
 <div class="editor">
    <h4 class="title">开启代码高亮&使用github的markdown样式</h4>
    <markdown-editor
      v-model="content"
      :highlight="true"
      preview-class="markdown-body"></markdown-editor>
  </div>
</template>
<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'

export default {
  data () {
    return {
      content: '``` \nconsole.log("lalala") \n```',
      configs: {
        status: false,
        toolbar: ['image']
      },
      output: '',
      type: 'markdown'
    }
  },
  components: {
    markdownEditor
  }
}
</script>