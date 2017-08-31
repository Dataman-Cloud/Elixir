<template>
  <div>
    <codemirror v-model="content" :options="editorOption"></codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name: 'jsonEditor',
  components: { codemirror },
  props: {
    value: String,
    editorOption: {
      type: Object,
      default: function () {
        return {
          tabSize: 4,
          styleActiveLine: true,
          line: true,
          mode: 'application/json',
          lineWrapping: true,
          theme: 'rubyblue',
          gutters: ['CodeMirror-lint-markers'],
          lint: true
        }
      }
    }
  },
  data () {
    return {
      content: this.value
    }
  },
  watch: {
    content (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.content = value
    }
  }

}
</script>

<style>

</style>
