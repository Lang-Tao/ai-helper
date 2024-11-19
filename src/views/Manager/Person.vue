<template>
  <div style="display:flex; align-items: center; justify-content: center;">
    <el-card style="width: 50%; margin-top:50px">
      <el-form :model="user" label-width="80px" style="padding-right: 20px">
        <div style="margin: 15px; text-align: center">
          <el-upload
            class="avatar-uploader"
            action="http://121.43.48.182:8081/api/upload"  
            :headers="{ token: user.token }"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="user.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="user.address" placeholder="地址"></el-input>
        </el-form-item>
        <div style="text-align: center; margin-bottom: 20px">
          <el-button type="primary" @click="update">保 存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateAvatar, updateUser } from "@/api/user"; // 调用更新头像和用户信息的API

export default {
  name: "Person",
  data() {
    return {};
  },
  mounted() {
    this.user = this.$store.state.user;
  },
  methods: {
    // 上传头像前进行验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 上传成功后的处理逻辑
    handleUploadSuccess(response) {
      if (response.code === 0) {
        console.log(response);

        // 上传成功，response.data 返回的是图片的URL
        const avatarUrl = response.data;

        // 调用更新头像的接口，将图片URL传递给后端
        updateAvatar(avatarUrl)
          .then(() => {
            this.$message.success("头像更新成功");
            this.$store.state.user.avatar = avatarUrl; // 更新本地的头像URL
          })
          .catch(() => {
            this.$message.error("头像更新失败");
          });
      } else {
        this.$message.error("头像上传失败");
      }
    },

    // 保存用户信息
    update() {
      // 调用更新用户信息的API
      updateUser(this.user)
        .then((response) => {
          console.log(response);

          if (response.code === 0) {
            this.$message.success("用户信息更新成功");
          } else {
            this.$message.error("用户信息更新失败");
          }
        })
        .catch((error) => {
          this.$message.error("请求失败: " + error.message);
        });
    },
  },
  computed: {
    // 使用计算属性代理 Vuex state
    user: {
      get() {
        // 从 Vuex 获取 user 对象
        return this.$store.state.user;
      },
      set(value) {
        // 提交 mutation 来更新 user 对象
        this.$store.commit("updateUser", value);
      },
    },
  },
};
</script>


<style scoped>
:deep(.el-form-item__label) {
  font-weight: bold;
}
:deep(.el-upload) {
  border-radius: 50%;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border-radius: 50%;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}
</style>
