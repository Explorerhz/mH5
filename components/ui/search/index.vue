 <template>
  <div class="searchBox">
    <div class="searchIcon">
      <tj-icon :name="'search'"
               :size="16"></tj-icon>
    </div>
    <!--  -->
    <input type="text"
           class="searchInput"
           :placeholder="placeholderValue"
           v-model="inputValue"
           @keyup.enter="searchFn">
    <span class="searchTxt"
          @click="searchFn">搜索</span>
  </div>
</template>
<script>
import Icon from "@/components/ui/icon";
export default {
  name: "tj-search",
  components: {
    [Icon.name]: Icon
  },
  props: {
    // placeholder的值
    placeholderValue: {
      type: String,
      default: ''
    },
    //控制搜索框的显示
    searchShow: {
      type: Boolean,
      default: false
    }
  },
  created () { },
  watch: {
    // 将搜索框输入的内容传给父组件
    inputValue (n, o) {
      this.$emit('getValue', n)
    }
  },
  data () {
    return {
      inputValue: ''
    };
  },
  methods: {
    // 点击搜索按钮执行的函数
    searchFn () {
      this.$emit('compoSearch')
    }
  }
};
</script>
<style lang="less" scoped>
.searchBox {
  width: 90%;
  margin: 5px auto;
  height: 32px;
  box-sizing: border-box;
  border: 1px solid #c8c8c8;
  border-radius: 10px;
  display: flex;
  flex-wrap: nowrap;
  .searchIcon {
    display: inline-block;
    width: 15px;
    height: 32px;
    line-height: 32px;
    margin: 0 10px;
  }
  .searchInput {
    outline: none;
    height: 25px;
    line-height: 25px;
    margin: 2px 0;
    border: none;
    flex-grow: 1;
  }
  .searchTxt {
    margin-right: 15px;
    height: 32px;
    line-height: 32px;
  }
}
</style>