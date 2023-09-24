<template>
  <div class="login-layout">
    <Title />
    <LoginForm />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './components/loginForm/index.vue';
import Title from './components/title.vue';
</script>

<style scoped lang="less">
.login-layout{
  width: 100%;
  height: 100%;
  background: url('../../assets/image/loginBg.png') no-repeat center;
  background-size: cover;
} 

</style>
