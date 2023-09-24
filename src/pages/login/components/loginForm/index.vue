<template>
  <div class="form-region">
    <div class="form-right">
      <h2 class="login-title">欢迎登录</h2>
      <div class="form-content">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          autocomplete="off"
          @finish="onFinish"
        >
          <a-form-item
            label="账号"
            name="loginId"
            :rules="[{ required: true, message: '账号不能为空' }]"
          >
            <a-input v-model:value="formState.loginId" class="form-item" />
          </a-form-item>
          <a-form-item
            label="密码"
            name="loginPwd"
            :rules="[{ required: true, message: '密码不能为空' }]"
          >
            <a-input-password v-model:value="formState.loginPwd" class="form-item" />
          </a-form-item>
          <div class="tips">
            账号 : admin  密码 : 123456
          </div>
          <a-form-item :wrapper-col="{ offset: 4 , span: 18 }">
            <a-button type="primary" html-type="submit" class="login-button">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>>
  </div>
</template>

<script lang="ts" setup>
import { userLogin } from '@/api';
import { loginParams } from '@/types/module/login';
import { setStorage } from '@/utils';
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const Vr = useRouter()
interface FormState {
  loginId: string;
  loginPwd: string;
}
const formState = reactive<FormState>({
	loginId: '',
	loginPwd: '',
});
const onFinish = async (values: loginParams)=> {
	let res = null
	try {
		res = await userLogin(values)
	} catch (error:any) {
		// messageApi.error(error.message);
	}
	if (res?.code !== 1) return message.error(res?.message || "网络错误")
	message.success("登录成功")
	setStorage('token', `Baerar ${res.data}`)
	Vr.push('/dashboard')
};
</script>

<style scoped lang="less">
@media (width <= 1200px) {
  .form-region{
    .form-right{
      margin-right: 0 !important;
      width: 350px !important;
    }
  }
}

.form-region {
  display: flex;
  width: 100%;
  height: 600px;
  align-items: center;
  justify-content: flex-end;
  // user-select: none;

  .form-right {
    width: 550px;
    height: 450px;
    border-radius: 15px;
    box-sizing: border-box;
    margin-right: 150px;
    padding: 30px;
    // background-color: rgba(255, 255, 255, .3);

    .login-title {
      position: relative;
      text-align: center;

      &::after {
        display: inline-block;
        width: 15%;
        height: 5px;
        position: absolute;
        left: 50%;
        bottom: -8px;
        background-color: @color;
        content: '';
        transform: translateX(-50%);
      }
    }
  }

  .form-content{
    margin-top: 55px;
    width: 100%;

    .tips{
      display: flex;
      justify-content: center;
    }

    .form-item{
      height: 40px;
    }

    .login-button{
      width: 100%;
      height: 40px;
      margin-left: 0;
      margin-top: 15px;
    }
  }
}
</style>
