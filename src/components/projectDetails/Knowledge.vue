<template>
  <el-container>
    <el-aside width="200px">
      <el-input v-model="search" suffix-icon="el-icon-search" placeholder="搜索笔记"></el-input>

      <div>
        <span style="margin:0 40px 0 23px">页面目录</span>
        <el-button class="add-btn" type="primary" icon="el-icon-plus" size="mini" @click="addNote"></el-button>
        <el-button class="add-btn" type="primary" icon="el-icon-folder-add" size="mini" @click="addFolder"></el-button>
      </div>

      <el-divider></el-divider>

      <el-tree
        highlight-current
        :data="filteredNotes"
        node-key="id"
        default-expand-all
        :props="{
            children: 'children',
            label: item => item.title.length > 8 ? item.title.substring(0, 8) + '...' : item.title
          }"
        :render-content="renderContent"
        draggable
        :allow-drop="allowDrop"
        @node-drop="handleDrop"
        @node-click="handleNodeClick">
      </el-tree>
    </el-aside>

    <el-main v-if="selectedNote">
      <WangEditor :Note="selectedNote" :key="selectedNote.id" @saveNote="saveNote" />
    </el-main>
    
    <el-main v-else class="intro-main">
      <span>欢迎使用知识管理</span>
      <span class="intro-text">知识库可以用来记录整个项目的来龙去脉，展示项目的当前状态，同时保存项目的相关资料，<br>能够让项目成员更好的进行文档书写和协作。</span>
    </el-main>
  </el-container>
</template>

<script>
import WangEditor from '../others/WangEditor.vue';

export default {
  components: {
    WangEditor,
  },
  data() {
    return {
      currentName: '',
      search: '',
      selectedNote: null,
      noteList: [
        {
          title: "笔记1",
          id: 1,
          folder: null,
          content: "这是笔记1的内容"
        },
        {
          title: "笔记笔记笔记记记记",
          id: 2,
          folder: null,
          content: "这是笔记2的内容"
        },
        {
          title: "文件夹1",
          id: 3,
          isFolder: true,
          children: [
            {
              title: "子笔记1",
              id: 4,
              folder: 3,
              content: "这是子笔记1的内容"
            }
          ]
        }
      ],
      editorOptions: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ]
        }
      }
    };
  },
  computed: {
    filteredNotes() {
      if (!this.search) {
        return this.noteList;
      }
      return this.filterNotes(this.noteList, this.search.toLowerCase());
    }
  },
  methods: {
    filterNotes(notes, searchTerm) {
      return notes
        .map(note => {
          if (note.children) {
            const children = this.filterNotes(note.children, searchTerm);
            if (children.length) {
              return { ...note, children };
            }
          }
          if (note.title.toLowerCase().includes(searchTerm)) {
            return { ...note };
          }
          return null;
        })
        .filter(note => note !== null);
    },
    handleNodeClick(data) {
      if (!data.isFolder) {
        this.selectedNote = { ...data };
      }
    },
    saveNote(Note) {
      if (!Note) return;
      const target = this.findNoteById(this.noteList, Note.id);
      if (target) {
        target.content = Note.content;
        target.title = Note.title;
      }
      this.$message({
        message: '笔记保存成功',
        type: 'success'
      });
    },
    findNoteById(noteList, noteId) {
      for (const note of noteList) {
        if (note.id === noteId) {
          return note;
        }
        if (note.children) {
          const found = this.findNoteById(note.children, noteId);
          if (found) {
            return found;
          }
        }
      }
      return null;
    },
    addNote() {
      this.noteList.push({ title: "未命名页面", id: Date.now() });
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    addFolder() {
      this.noteList.push({ title: "未命名文件夹", isFolder: true, id: Date.now(), children: [] });
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    deleteNode(data) {
      const removeNode = (nodes, id) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            nodes.splice(i, 1);
            return;
          }
          if (nodes[i].children) {
            removeNode(nodes[i].children, id);
          }
        }
      };
      this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeNode(this.noteList, data.id);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {});
    },
    renderContent(h, { node, data }) {
      return h('span', [
        h('span', { class: 'custom-tree-node' }, [
          h('span', {
            domProps: {
              innerHTML: data.isEdit ? '' : node.label
            },
            on: {
              dblclick: () => this.headerDbClick(data)
            }
          }),
          h('input', {
            directives: [
              {
                name: 'show',
                value: data.isEdit
              }
            ],
            ref: data.id,
            attrs: {
              placeholder: '请输入内容'
            },
            domProps: {
              value: this.currentName
            },
            on: {
              blur: (event) => this.handleInputBlur(event, data)
            }
          })
        ]),
        h('el-button', {
          attrs: {
            icon: 'el-icon-delete',
            type: 'text'
          },
          on: {
            click: () => this.deleteNode(data)
          }
        })
      ]);
    },
    headerDbClick(data) {
      this.currentName = data.title;
      this.$set(data, 'isEdit', true);
      this.$nextTick(() => {
        this.$refs[data.id] && this.$refs[data.id].focus();
      });
    },
    handleInputBlur(event, data) {
      const inputName = event.target.value.trim();
      if (inputName === '') {
        this.$message({
          type: 'warning',
          message: '分类名称不能为空,请重新输入'
        });
        this.$set(data, 'isEdit', false);
      } else if (inputName === data.title) {
        this.$set(data, 'isEdit', false);
      } else {
        this.$set(data, 'isEdit', false);
        data.title = inputName;
      }
      this.currentName = '';
    },
    allowDrop(draggingNode, dropNode, type) {
      return type !== 'inner' || dropNode.data.isFolder;
    },
    handleDrop(draggingNode, dropNode, type) {
      const data = draggingNode.data;
      const parent = dropNode.data;
      if (type === 'inner' && parent.isFolder) {
        parent.children.push(data);
        this.removeNode(this.noteList, data.id);
      } else if (type === 'before' || type === 'after') {
        this.removeNode(this.noteList, data.id);
        const parentArray = this.findParentArray(this.noteList, parent.id);
        const index = parentArray.findIndex(item => item.id === parent.id);
        if (type === 'before') {
          parentArray.splice(index, 0, data);
        } else {
          parentArray.splice(index + 1, 0, data);
        }
      }
    },
    removeNode(nodes, id) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
          nodes.splice(i, 1);
          return;
        }
        if (nodes[i].children) {
          this.removeNode(nodes[i].children, id);
        }
      }
    },
    findParentArray(nodes, id) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
          return nodes;
        }
        if (nodes[i].children) {
          const result = this.findParentArray(nodes[i].children, id);
          if (result) return result;
        }
      }
      return null;
    }
  }
};
</script>

<style scoped lang="scss">
.el-aside {
  background-color: rgba(255, 255, 255, 0.151);
  height: 100% !important;
  border-right: .5px solid rgba(0, 0, 0, 0.1);
  position: fixed;
}

.el-main {
  margin-left: 200px;
  padding:0;
  height: calc(100vh - 60px) !important;
  overflow-y: auto;
}

.el-input {
  margin: 10px;
  width: 180px;
  height: 30px;
  line-height: 20px;
}

.el-button.add-btn {
  margin: 10px 5px 5px;
  padding: 5px;
  height: 26px;
  line-height: 16px;
  font-size: 14px;
  border-radius: 50%;
  background-color: #00000000;
  border: none;
  color: #000000
}

.el-button.add-btn:hover {
  transform: scale(1.1);
  transition: .5s;
}

.el-divider {
  margin: 0;
  margin-top: 2px;
  opacity: .5;
  width: 90%;
  margin-left: 5%
}

.el-dropdown-link {
  margin: -3.5px 10px 0 10px;
  padding: 0 5px 0 7px;
  height: 20px;
  line-height: 10px;
  width: 40px;
  border: none;
  visibility: hidden;
}

.el-dropdown-item {
  height: 40px;
  line-height: 40px;
}

.el-dropdown-menu {
  padding: 0;
}

.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-button {
  margin-left: 10px;
}
.intro-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  font-size: 30px;
  color: #373737;
}
.intro-text{
  font-size: 14px; 
  color: #999999; 
  margin-top: 20px; 
  text-align:center;
  line-height: 28px;
}
.quill-editor{
  height: max(500px,auto) !important;
  margin:10px;
  border:none
}
.save-btn{
  margin-top:10px;
  margin-right: 10px;
  float:right;
}
</style>

<style>
.el-icon-delete{
  margin: 5px;
}
.el-tree-node__content {
  height: 40px;
  margin: 5px;
  border-radius: 8px;
}

.el-tree-node__content:hover {
  background-color: #f2f4f6;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #ebf3ff !important;
  color: #06f;
}
</style>