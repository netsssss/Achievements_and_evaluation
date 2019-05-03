<template>
  <el-row class="table">
    <el-table
      ref="myTable"
      style="width: 100%"
      :data="tableData"
      :highlight-current-row="canClickRow"
      @current-change="handleRowCurrentChange"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" v-if="canSelect && hasData"></el-table-column>
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :sortable="customSort && customSort.includes(item.prop)"
        :width="setWidth(item.prop)"
      ></el-table-column>
      <slot></slot>
    </el-table>

    <el-pagination
      v-if="canTurn"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top:10px; text-align:right;"
      :current-page="currentPage"
      :page-sizes="[5, 8, 10, 20]"
      :page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handlePageCurrentChange"
    ></el-pagination>
  </el-row>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableHeader: {
      type: Array,
      default: () => {
        return [];
      }
    },
    total: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    customSort: {
      type: Array,
      default: () => {
        return [];
      }
    },
    colWidth: {
      type: Object,
      default: () => {
        return {};
      }
    },
    curRow: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    canSelect: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    canTurn: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    canClickRow: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      sortType: {}
    };
  },
  mounted() {
    this.setRow();
  },
  watch: {
    tableData(val) {
      this.setRow();
    }
  },
  computed: {
    hasData() {
      if (Object.keys(this.tableData).length > 0) return true;
      return false;
    }
  },
  methods: {
    setWidth(prop) {
      if (Object.keys(this.colWidth).includes(prop)) return this.colWidth[prop];
      return "auto";
    },
    setRow() {
      if (this.canClickRow) {
        this.$refs.myTable.setCurrentRow(this.tableData[this.curRow]);
      }
    },
    reload() {
      this.$emit("reload", {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        sortType: this.sortType
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.reload();
    },
    handlePageCurrentChange(current) {
      this.currentPage = current;
      this.reload();
    },
    handleSortChange(column, prop, order) {
      this.sortType = { prop, order };
      this.reload();
    },
    handleRowCurrentChange(row) {
      this.$emit("rowCurrentChange", row);
    },
    handleSelectionChange(val) {
      this.$emit("selectionChange", val);
    }
  }
};
</script>
