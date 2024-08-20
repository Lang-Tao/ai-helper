<template>
    <div style="">
        <Toolbar
            style="border-bottom: 1px solid #ccc;padding:0 5px"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <div style="margin:20px">
            <div class="header" style="display:flex">
                <el-input class="title-input"
                    v-model="Note.title"
                    placeholder="请输入笔记标题"
                    style="border:none;"
                ></el-input>

                <el-button type="text" size="mini" style="" @click="onBlur">保存笔记</el-button>
                
            </div>
            <el-divider></el-divider>

            <Editor
                style="height:585px;margin:0 10px"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
            />
        </div>
       
    </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
    components: { Editor, Toolbar },
    props: {
        Note: {
            type: Object,
            default() {
                return {
                    title: '',
                    content: ''
                }
            }
        }
    },
    data() {
        return {
            editor: null,
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default'
        }
    },
    watch: {
        Note: {
            handler(newVal) {
                if (this.editor && newVal.content !== this.editor.getHtml()) {
                    this.$nextTick(() => {
                        this.editor.setHtml(newVal.content);
                    });
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor);
            // 如果已有内容，可以在编辑器创建时设置
            if (this.Note.content) {
                this.editor.setHtml(this.Note.content);
            }

           
        
        },
        onBlur() {
            console.log("Editor lost focus via global click detection");
            this.$nextTick(() => {
                this.saveNote();
            });
        },
        saveNote() {
            if (this.editor) {
                const content = this.editor.getHtml();
                console.log("Saving note with content:", content);
                this.Note.content = content;
            }
            this.$emit('saveNote', this.Note);
        },
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy()
    }
})
</script>

 <style src="@wangeditor/editor/dist/css/style.css"></style>

<style>
.title-input .el-input__inner {
    border: none;
    font-size: 26px;
    font-weight: bold;
    margin:5px
}
</style>

<style scoped>
.el-divider{
    margin: 0;
    background-color:rgba(133, 133, 133, 0.1);
    width:95%;
    margin:10px auto
}
.title-input{
    width: 90%;
    margin-right: 10px;
}


</style>
