<template>
  <div class="antd-dropDown">
    <a-dropdown>
      <div class="dropDown-content-region">
        <div class="image">
          <img src="../../assets/image/logo.png" alt="">
        </div>
        <div class="text">{{ props.text }}</div>
      </div>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <template v-for="item in props.menus" :key="item">
            <a-menu-item>
              <div>{{ item.text }}</div>
            </a-menu-item>
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
interface propsTypes {
  menus : {id : number, text : string}[],
  text : string
}
interface emitTypes {
  ( e :'clickMenu', value : Key) : void
}
import { Key } from 'ant-design-vue/es/_util/type';
import { MenuProps } from 'ant-design-vue/es/menu/src/Menu';
import { defineProps } from 'vue';
const emit = defineEmits<emitTypes>()
const props = defineProps<propsTypes>()
const handleMenuClick:MenuProps['onClick'] = (e)=> {
	emit('clickMenu', e.key)
}
</script>

<style scoped lang="less">
.antd-dropDown{
  &:hover{
    background-color: @hoverColor;
    transition: all .4s;
  }

  .dropDown-content-region{
    align-items: center;
    display: flex;
    font-size: 20px;

    .image{
      width: 50px;
      height: 50px;

      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
