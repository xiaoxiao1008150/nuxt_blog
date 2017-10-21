<template>
  <section class="container">
    <div class="quill-editor" 
          v-model="content"
         @change="onEditorChange($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      content: '<p>I am Example</p>',
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
            ['clean']
          ]
        }
      }
    }
  },
  mounted () {
    // console.log('app init, my quill insrance object is:', this.myQuillEditor)
    setTimeout(() => {
      this.content = 'i am changed'
    }, 3000)
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
.quill-editor {
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: #FFF;
}
</style>