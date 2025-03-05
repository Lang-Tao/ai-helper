<template>
  <div class="login-container">
    <div class="login-form">
      <div class="form-content">
        <el-form :model="user" style="width: 80%" :rules="rules" ref="loginRef">
          <div class="form-title">欢迎登录智能工程助手</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入账号" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="code-input">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-circle-check" size="medium" style="flex: 1" v-model="user.code"></el-input>
              <div class="valid-code">
                <valid-code @update:value="getCode" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登 录</el-button>
          </el-form-item>
          <div class="register-link">
            <div>还没有账号？请 <span class="register" @click="$router.push('/register')">注册</span></div>
          </div>
        </el-form>
      </div>

      <div class="form-image">
        <img src="@/assets/img/login.png" alt="" style="width: 100%">
      </div>
      
    </div>
  </div>
</template>

<script>
import ValidCode from "@/components/others/ValidCode";
import { login } from "@/api/user";

export default {
	name: "login",
	components: {
		ValidCode,
	},
	data() {
		// 验证码校验
		const validateCode = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入验证码"));
			} else if (value.toLowerCase() !== this.code) {
				callback(new Error("验证码错误"));
			} else {
				callback();
			}
		};

		return {
			code: "", // 验证码组件传递过来的code
			user: {
				code: "", // 表单里用户输入的code 验证码
				username: "",
				password: "",
			},
			rules: {
				username: [
					{ required: true, message: "请输入账号", trigger: "blur" },
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
				],
				code: [{ validator: validateCode, trigger: "blur" }],
			},
		};
	},
	created() {},
	methods: {
		getCode(code) {
			this.code = code.toLowerCase();
		},

		async login() {
			this.$refs["loginRef"].validate(async (valid) => {
				if (valid) {
					try {
						// 调用封装的登录接口
						const response = await login({
							username: this.user.username,
							password: this.user.password,
						});

						// 根据接口响应处理逻辑
						if (response.code === 0) {
							console.log(response);
							this.$store.commit("setToken", response.data.jwt); // vuex 储存 token
							this.$store.commit("setUser", response.data.user); // vuex 储存 用户信息
							this.$router.push("/");
							this.$message.success("登录成功");
							var token = localStorage.getItem("token");
							console.log("token:" + token);
							console.log("token类型:" + typeof token);
						} else {
							this.$message.error(response.message || "登录失败");
						}
					} catch (error) {
						this.$message.error("登录请求失败，请稍后再试");
						console.error(error);
					}
				}
			});
		},
	},
};
</script>

<style scoped>
.login-container {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url("@/assets/img/bg.jpg");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.login-form {
	display: flex;
	background-color: white;
	width: 50%;
	height: 400px;
	border-radius: 5px;
	overflow: hidden;
	background-color: rgba(255, 255, 255, 0.566);
	backdrop-filter: blur(10px);
}

.form-content {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0px;
}

.form-title {
	font-size: 20px;
	font-weight: bold;
	text-align: center;
	margin-bottom: 20px;
}

.code-input {
	display: flex;
}

.valid-code {
	flex: 1;
	height: 36px;
}

.register-link {
	display: flex;
}

.register {
	color: #0f9876;
	cursor: pointer;
}

.form-image {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
