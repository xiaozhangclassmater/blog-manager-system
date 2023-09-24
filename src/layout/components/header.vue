<template>
  <div class="header-layout">
    <div class="header-left">
      <menu-unfold-outlined class="trigger" @click="emit('changeCollapsed')" />
    </div>
    <div class="header-right">
      <div class="system-message">
        <a-badge count="1">
          <CommentOutlined class="message-icon" />
        </a-badge>
      </div>
      <div class="userInfo">
        <deopDown :menus="operationals" text="xiaozhang" @click-menu="handleMenuClick" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface emitTypes {
  (e: 'changeCollapsed'): void
}
import deopDown from '@/components/dropDown/index.vue';
import { removeStorage } from '@/utils';
import { CommentOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';
const emit = defineEmits<emitTypes>()
const Vr = useRouter()
const operationals = ref([{
	id: 1,
	text: '登出'
}])
const handleMenuClick = (val: Key)=> {
	if (val.id === 1){
		exitLogin()
	}
}
const exitLogin = ()=> {
	message.success("登出成功")
	removeStorage("token")
	Vr.push('/login')
	
}
</script>

<style scoped lang="less">
.header-layout{
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0 30px;

  .trigger{
    font-size: @iconBS;
  }

  .header-right{
    align-items: center;
    display: flex;
    height: 100%;

    .system-message{
      width: 45px;
      height: 100%;
      cursor: pointer;
      text-align: center;

      &:hover{
        background-color: @hoverColor;
        transition: all .3s;
      }

      .message-icon{
        font-size: @iconBS;
      }
    }

    .userInfo{
      align-items: center;
      cursor: pointer;
      display: flex;
      height: 100%;

      .user-photo{
        width: 24px;
        height: 24px;

        img{
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }

      .userName{
        font-size: 16px;
      }
    }
  }
}
</style>
