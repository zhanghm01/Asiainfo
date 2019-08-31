<template>
  <div class='login-bac'>

    <div class="lf">
        <img src="../../assets/img/background11.png" alt="">
    </div>

    <div class="rg">
      <div class="rg-main">
        <div class="logo">
          <img src="../../assets/img/logo_sdc.png" alt="">
        </div>
        <h1>欢迎登录DC-Bond业务系统</h1>

        <div class="rg-content">
          <!-- <div class='rg-login'>
          <t-input icon="account" placeholder="请输入用户名..." style="width: 200px"></t-input>
          <br />
          <t-input icon="lock" placeholder="请输入密码..." style="width: 200px"></t-input>
          </div> -->

          <!-- <div class="forgetcode">
            <a href="#" class='btn-block'>忘记密码</a>
          </div>
          <div class="toregister">
            <a href="#" class='btn-block'>没有账号？立即注册</a>
          </div> -->
          <t-form ref="formInline" :model="formInline" :rules="ruleInline">
            <t-form-item prop="user">
              <t-input type="text" v-model='formInline.user' placeholder="请输入手机号/邮箱">
                <t-icon type="account-outline" slot="prepend"></t-icon>
              </t-input>
            </t-form-item>
            <t-form-item prop="password">
              <t-input type="password" v-model='formInline.password' placeholder="密码">
                <t-icon type="lock-outline" slot="prepend"></t-icon>
              </t-input>
            </t-form-item>
            <t-form-item>
              <t-button type="primary" style="width:100%;margin-top:30px;" @click="onSubmit('formInline')">立即登录</t-button>
            </t-form-item>
          </t-form>
          <div class="forgetcode">
            <a href="#" class='btn-block text-center'>忘记密码</a>
          </div>
          <div class="toregister">
            <a href="#" class='btn-block text-center'>没有账号？立即注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {loginByUsername} from '../../api/login.js'
export default {
      data () {
        return {
          formInline: {
            user: '',
            password: ''
          },
          ruleInline: {
            user: [
              { required: true, message: '请填写用户名', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请填写密码', trigger: 'blur' },
              { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        onSubmit(name) {
          // console.log(this.$refs[name])
          this.$refs[name].validate((valid) => {
            if (valid) {
              // console.log('11')
              this.$Message.success('提交成功!');
              loginByUsername(this.formInline).then(res=>{
                console.log('登录响应成功')
                console.log(res);
                let result = res.data;
                if(result.retCode == '200'){
                  this.$store.state.loginID = result.data[0].loginId;
                  this.$store.state.roleID = result.data[0].roleId;
                  this.$store.state.username = result.data[0].username || 'huanghe11';
                  if(this.$store.roleId == '0'){
                    this.$router.push({path:'/userlayout'})
                  }
                  else{
                    this.$router.push({path:'/layout'})
                  }
                }
                else{
                  this.$Message.danger(result.retMessage);
                }
              })
              .catch(err=>{
                console.log(err);
              })
            } else {
              console.log('22')
              // this.$Message.danger('表单验证失败!');
              this.$Message.danger('请输入正确的用户名和密码')
            }
          })
        }
    }
};
</script>

<style lang="scss" scoped>
.login-bac{
  display: flex;
  width: 100vw;
  height: 100vh;
  .lf{
    width:60%;
    height:100%;
    background: url("../../assets/img/background.png") center center no-repeat;
    background-size: 100% 100%;
    position: relative;
    img{
      width:65%;
      position: absolute;
      left: 6%;
      top:12%;
    }
  }
  .rg{
    width:40%;
    height:100%;
    .rg-main{
      width:320px;
      margin: 0 auto;
      position: relative;
      top:50%;
      transform: translateY(-50%);
      padding: 0 5px;
      .logo{
        width:100%;
        height: 48px;
        margin-bottom: 38px;
      }
      h1{
        font-size:24px;
        margin-bottom: 30px;
        color:#24272b;
        text-align: center;
      }

      .rg-content{
        width:100%;
        position: relative;
        .forgetcode{
          position: absolute;
          right:0;
          bottom: 100px;
          .btn-block{
            font-size: 12px;
            color: #24272b;
            outline: none;
            font-family: PingFangSC-Medium;
          }
        }
      }

    }
  }
}
</style>
