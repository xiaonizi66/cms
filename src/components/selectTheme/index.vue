<template>
  <div>
    <el-dialog
      title="选择系统主题"
      :visible="true"
      :append-to-body="true"
      width="30%"
      class="theme-dialog"
      style="z-index:1000;"
      @close="cancelDialog"
    >
      <ul>
        <li v-for="(item, index) in themeLi" :class="item.code + '-li'" :key="index" @click="lookTheme(item.code)">
          {{item.name}}
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button @click="updateTheme" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedTheme: '',
      themeLi: [
        {
          code: 'themea',
          name: '默认主题'
        },
        {
          code: 'themeb',
          name: 'light green主题'
        },
        {
          code: 'themec',
          name: '暗黑主题'
        }
      ]
    }
  },
  mounted () {
    this.selectedTheme = this.$store.state.app.theme
  },
  methods: {
    cancelDialog () {
      this.$emit('selectThemeDialogToggle', false)
      console.log(this.$store.state.theme)
      document.getElementById('app').className = this.$store.state.app.theme
    },
    updateTheme () {
      this.$store.dispatch('UpdateTheme', this.selectedTheme).then(() => {
        this.cancelDialog()
      })
    },
    lookTheme (theme) {
      this.selectedTheme = theme
      document.getElementById('app').className = theme
    }
  }
}
</script>
<style lang="less" scoped>
.theme-dialog {
  ul {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    li {
      height: 90px;
      flex: 1;
      cursor: pointer;
      margin: 0px 5px;
    }
  }
}
</style>
