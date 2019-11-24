<template>
  <div class="tj-table">
    <table>
      <thead>
        <th
          v-for="(th,index) in currentColumns"
          :key="index"
          @click="th.sortable && handleSort(index)"
        >
          {{th.title}}
          <tj-icon v-if="th.sortable" color="#333" name="sort"></tj-icon>
        </th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in currentData" :key="index">
          <td v-for="(td,index) in item" v-if="index != '_index'" :key="index">{{td}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Icon from "@/components/ui/icon";
export default {
  name: "tj-table",
  data() {
    return {
      currentColumns: [], // 列名 {title: "出生日期", key: "birthday",sortable: true}
      currentData: [] // data
    };
  },
  components: {
    [Icon.name]: Icon
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  beforeCreate() {},
  destroyed() {},
  computed: {},
  mounted() {
    this.makeColumns();
    this.makeData();
  },
  watch: {
    data() {
      this.makeData();
      var sortedColumn = this.currentColumns.filter(col => {
        return col._sortType !== "normal";
      });

      if (sortedColumn.length > 0) {
        if (sortedColumn[0]._sortType === "asc") {
          this.handleSortByAsc(sortedColumn[0]._index);
        } else {
          this.handleSortByDesc(sortedColumn[0]._index);
        }
      }
    }
  },
  methods: {
    makeColumns() {
      this.currentColumns = this.columns.map((col, index) => {
        col._sortType = "normal"; // 默认排序
        col._index = index; // 记录索引
        return col;
      });
    },
    makeData() {
      this.currentData = this.data.map((row, index) => {
        row._index = index; // 记录索引
        return row;
      });
    },
    // 排序
    handleSort(index) {
      if (this.currentColumns[index]._sortType == "asc") {
        this.handleSortByDesc(index);
      } else {
        this.handleSortByAsc(index);
      }
    },
    // 升序
    handleSortByAsc(index) {
      var key = this.currentColumns[index].key;
      this.currentColumns.forEach(col => {
        col._sortType = "normal";
      });
      this.currentColumns[index]._sortType = "asc";
      this.currentData.sort((a, b) => {
        return a[key] > b[key] ? 1 : -1;
      });
    },
    // 降序
    handleSortByDesc(index) {
      var key = this.currentColumns[index].key;
      this.currentColumns.forEach(col => {
        col._sortType = "normal";
      });
      this.currentColumns[index]._sortType = "desc";
      this.currentData.sort((a, b) => {
        return a[key] < b[key] ? 1 : -1;
      });
    }
  }
};
</script>
<style scoped>
.tj-table{
  overflow: auto;
  -ms-overflow-style: none; 
  overflow: -moz-scrollbars-none;
}
.tj-table::-webkit-scrollbar {
  width: 0 !important;
}
table {
  font-size: 14px;
  text-align: left;
  padding: 3px;
  min-width: 100vw;
}
table td{
  padding: 3px;
}
table th{
  padding: 3px;
}
</style>


