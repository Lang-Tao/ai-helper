<template>
  <div class="container">
    <div class="form-box">
      <div style="flex: 1; display:flex; align-items: center; justify-content: center">
        <img src="@/assets/img/login.png" alt="" style="width: 100%">
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center">
        <el-form :model="user" style="width: 80%" :rules="rules" ref="registerRef">
          <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px">欢迎注册智能工程助手</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入账号" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPass">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请确认密码" v-model="user.confirmPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="Register">注 册</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">已经有账号了？请 <span style="color: #6e77f2; cursor: pointer" @click="$router.push('/login')">登录</span></div>
          </div>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import {register} from "@/api/user.js";

export default {
  name: "register",
  data() {
    const validatePassword = (rule, confirmPass, callback) => {
      if (confirmPass === '') {
        callback(new Error('请确认密码'))
      } else if (confirmPass !== this.user.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      user: {
        username: '',
        password: '',
        confirmPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^\S{5,16}$/ , message: '5-16个字符', trigger: "blur"},
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{5,16}$/ , message: '5-16个字符', trigger: "blur"},
        ],
        confirmPass: [
          { validator: validatePassword, trigger: 'blur' }
        ],
      }
    }
  },
  created() {

  },
  methods: {
    async Register() {
      this.$refs['registerRef'].validate(async (valid) => {
        if (valid) {
          try {
            // 调用封装的注册接口
            const response = await register({
              username: this.user.username,
              password: this.user.password
            });

            // 根据接口响应处理逻辑
            if (response.code === 0) {
              this.$message.success('注册成功');
              this.$router.push('/login'); // 注册成功后跳转到登录页面
            } else {
              this.$message.error(response.message || '注册失败');
            }
          } catch (error) {
            this.$message.error('注册请求失败，请稍后再试');
            console.error(error);
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.container{
  height: 100vh; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  background-image: url('@/assets/img/bg.jpg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
}
.form-box{
  display: flex; 
  background-color: white; 
  width: 50%; 
  height: 400px;
  border-radius: 5px; 
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.566);
  backdrop-filter: blur(10px);
}
</style>