<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">币信管理后台</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')" style="width: 100%">
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import crypto from 'crypto-js';
import INFO from '@constant/login.js';
import LocalStorage from '@utils/storge.js';
import { mapActions } from 'vuex';

const RULES = {
  username(rule, value, cb) {
    return cb();
    if (
      crypto
        .MD5(value)
        .toString()
        .toUpperCase() !== INFO.USERNAME
    ) {
      return cb(new Error('账号名错误'));
    } else {
      return cb();
    }
  },
  password(rule, value, cb) {
    return cb();
    if (
      crypto
        .MD5(value)
        .toString()
        .toUpperCase() !== INFO.PWD
    ) {
      return cb(new Error('密码错误'));
    } else {
      return cb();
    }
  },
};
export default {
  // 2A5DD3EA62AB5EC3BE63424D3E8A9EC2
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' },
          { validator: RULES.username, message: '账号名错误', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' },
          { validator: RULES.password, message: '密码错误', trigger: 'blur' },
        ],
      },

      // 对话框显示和隐藏
      dialogVisible: false,
    };
  },
  // created() {
  //   // name: bixinmg2021
  //   console.log(crypto.MD5('@bi.xin!m!666').toString());
  // },
  methods: {
    ...mapActions(['setLoginState']),
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // LocalStorage.setItem('_token', 'bixin' + Math.floor(Date.now() * 1.8));
          this.setLoginState();
          // this.$router.push('/home');
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 450px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
  font-size: 30px;
}
</style>
