<template>
  <div style="margin: 10px 20px;">
    <el-table :data="projetArray" style="width: 100%" @cell-click="handleCellClick">
      <el-table-column prop="name" label="项目名称" width="840">
        <template slot-scope="scope">
          <div class="name-cell" @click="handleCellClick(scope.row, scope.column)">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="功能模块" width="300">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: space-between; align-items: center; width:150px">
            <el-tooltip class="item" effect="dark" content="智能问答" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-zhinengwenda"
                @click="handleIconClick('QnA', scope.row, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="代码仓库" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-daimacangku"
                @click="handleIconClick('Repository', scope.row, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="项目协同" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-xiangmuxietong"
                @click="handleIconClick('Collaboration', scope.row, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="知识管理" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-zhishiku"
                @click="handleIconClick('Knowledge', scope.row, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="项目总结" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-xiangmuzongjie"
                @click="handleIconClick('Summary', scope.row, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
              <el-tooltip class="item" effect="dark" content="项目设置" placement="top" :open-delay="500">
              <el-button
                icon="el-icon-setting"
                @click="handleIconClick('Setting', scope.row, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px; font-size:16px">
              </el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="admin" label="管理员" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.adminName" placement="top">
            <el-avatar :src="scope.row.adminAvatar" size="small" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-dropdown trigger="click" @command="handleCommand($event, scope.row)" @click.native.stop>
            <el-button style="margin-left: -8px" class="el-dropdown-link" size="mini" icon="el-icon-more" round></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="scope.row.isFavorite" command="cancelChangYong" :row="scope.row" icon="iconfont icon-shuqian">取消常用项目</el-dropdown-item>
              <el-dropdown-item v-else command="setChangYong" :row="scope.row" icon="el-icon-collection-tag">设为常用项目</el-dropdown-item>
              <el-dropdown-item command="delete" :row="scope.row" icon="el-icon-delete" style="color:red">删除项目</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  props: {
    projetArray: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleCellClick(row, column, cell, event) {
      if (column.property === 'name') {
        this.$router.push({ name: 'ProjectDetails', params: { address: row.address, title: row.name } });
        console.log("Name column clicked:", row);
      }
    },
    handleIconClick(func, row, event) {
      event.stopPropagation(); // 阻止事件冒泡
      console.log("Icon clicked:", func, row);
      this.$router.push({ name: `project${func}`, params: { address: row.address, title: row.name } });
    },
    handleCommand(command, row) {
      console.log("Command clicked:", command, row);
      if (command === 'delete') {
        this.handleDelete(row);
      } else if (command === 'setChangYong') {
        this.$emit('add-to-favorites', row);
      } else if (command === 'cancelChangYong') {
        this.$emit('remove-from-favorites', row);
      }
    },
    handleDelete(row) {
      console.log("handleDelete clicked", row);
      // todo 处理项目删除逻辑
      this.$message.success('删除成功');
    },
  },
};
</script>

<style scoped>
.name-cell {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
