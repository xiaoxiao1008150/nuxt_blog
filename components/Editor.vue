<template>
  <section class="container">
    <div class="quill-editor" 
         @change="onEditorChange($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      // placeholder: '请编辑内容...',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean'],
            ['omega']
          ]
        }
      }
    }
  },
  mounted () {
    // console.log('app init, my quill insrance object is:', this.myQuillEditor)
    // setTimeout(() => {
    //   this.content = 'i am changed'
    // }, 3000)
  },
  methods: {
    // onEditorBlur (editor) {
    //   console.log('editor blur!', editor)
    // },
    // onEditorFocus (editor) {
    //   console.log('editor focus!', editor)
    // },
    // onEditorReady (editor) {
    //   console.log('editor ready!', editor)
    // },
    onEditorChange ({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      // this.content = html
      // console.log('ch====', this.content)
      this.$emit('change', html)
    }
  }
}
</script>

<style scoped>
.container{
  width:80%;
  /*height:250px;*/
}
.quill-editor {
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: #FFF;
}
.ql-omega:after {
  content: "Ω" !important;
}
</style>