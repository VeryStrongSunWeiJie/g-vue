<template>
  <div class="login-div">
    <div class="img"></div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="70px"
      class="login-box"
    >
      <div class="form">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            placeholder="请输入账号"
            v-model="form.username"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          />
        </el-form-item>
        <el-form-item class="yzm" label="验证码" prop="yzm">
          <el-input type="text" placeholder="请输入验证码" v-model="form.yzm" />
          <div class="vc">
            <img
              :src="'http://127.0.0.1:8080/api/users/umsUser/captcha.jpg'"
              alt=""
            />
            <span>&nbsp;<a href="">看不清?</a></span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </div>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        yzm: "",
      },
      imgsrc: "",
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
        yzm: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
      },
      // 对话框显示和隐藏
      dialogVisible: false,
    };
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          //登录

          var form = new window.FormData();
          form.append("username", "laotie");
          let url =
            `/api/users/login?username=` +
            this.form.username +
            "&password=" +
            this.form.password;
          this.$http
            .post(
              url,
              qs.stringify(form),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              },
              {}
            )
            .then(function (data) {
              console.log(data);
              this.$router.push("/about");
            })
            .catch((error) => {
              console.log("对不起大佬失败");
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 400px;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  margin-top: 25px;
  margin: 0 auto;
}

.login-title {
  text-align: center;
  margin: 8px auto;
  color: #303133;
}
.login-div {
  display: flex;
  align-items: center;
  position: relative;
  top: 60px;
}
.img {
  width: 50%;
  height: 500px;
  background-image: url("../assets/background.jpg");
  background-size: 100% 100%;
}
.form {
  position: relative;
  right: 160px;
}
.vc {
  margin-top: 5px;
}
</style>