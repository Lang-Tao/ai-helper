<template>
  <div class='createProject' style="display: flex; flex-direction:column; justify-content: center; align-items: center; margin:20px">
    <div style="margin-top: 10px; justify-content:flex-start;width:100%">
      <el-button @click="goBack" icon="el-icon-back" circle></el-button>
      <span style="margin:10px; font-size: 18px; font-weight: bold; ">创建项目</span>
    </div>

    <el-container style="display: flex; width:100%">
      <div style="margin-top: 20px;margin-left:5px; justify-content:flex-start; width:50% ">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="项目名称" prop="name" style="font-size: 16px; font-weight: bold; color:black">
            <el-input placeholder="给项目起个名称" v-model="form.name"  maxlength="31" show-word-limit></el-input>
            <span style="font-size: 12px; color: #999999; font-weight:lighter">请输入 1~31 位以内的项目名称</span>
          </el-form-item>

          <el-form-item label="项目标识" prop="address" style="font-size: 16px; font-weight: bold; color:black">
              <el-input placeholder="项目地址的一部分" v-model="form.address" maxlength="31" show-word-limit>
                <template slot="prepend">https://ai-helper/p/</template>
              </el-input>
            <span style="font-size: 12px; color: #999999; font-weight:lighter">用于唯一标记项目，也可用于组织项目 URL</span>
          </el-form-item>

          <el-form-item label="项目描述" prop="description"  style="font-size: 16px; font-weight: bold; color:black">
            <el-input type="textarea" resize="none" rows="4" placeholder="100字以内项目描述（选填）" v-model="form.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-container>
  </div>
</template>

<script>
import pinyin from 'pinyin'
   
export default {
  name: "createProject",
  data() {
    return {
      form: {
        name: '',
        address:'',
        description:'',
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入项目标识', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          // todo 向后端提交表单新建项目
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getPinyin(str){
      return pinyin(str, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
      }).join(''); // 将拼音数组转换为字符串
    },
  },
  watch: {
    'form.name'(newValue) {
      // 当 form.name 发生变化时,更新 form.address 的值
      this.form.address = this.getPinyin(this.form.name);
    },
  },
};
</script>

<style scoped>
.el-button{
  margin-right: 5px;
}

.el-form-item__label{
  font-size: 16px !important;
  font-weight: bold !important;
}
</style>
