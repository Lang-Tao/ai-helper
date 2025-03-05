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
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入账号" class="username" v-model="user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码" class="password" v-model="user"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPass">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请确认密码" class="confirmPass" v-model="user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" onclick="Register">注 册</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">已经有账号了？请 <span style="color: #6e77f2; cursor: pointer" onclick="$router.push('/login')">登录</span></div>
          </div>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
function Register() {
	var username = document.getElementsByClassName("username")[0].value;
	var password = document.getElementsByClassName("password")[0].value;
	var confirmPass = document.getElementsByClassName("confirmPass")[0].value;
	if (password != confirmPass) {
		alert("两次密码不一致");
		return;
	}
	var data = {
		username: username,
		password: password,
	};
	fetch("http://192.168.61.109:8081/api/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.code == 200) {
				alert("注册成功");
				window.location.assign("/login");
			} else {
				alert(res.msg);
			}
		});
}

export default {
	name: "Register",
	data() {
		return {
			user: "",
		};
	},
};
</script>

<style scoped>
.container {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url("@/assets/img/bg.jpg");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
.form-box {
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