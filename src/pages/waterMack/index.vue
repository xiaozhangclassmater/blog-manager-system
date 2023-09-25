<template>
  <div class="weater-mack">
    <a-button 
      type="primary"
      class="upload-btn"
      :disabled="fileList?.length === 0"
      @click="handleClickUpload"
    >
      上传
    </a-button>
    <a-button
      type="primary"
      @click="handelResetUpaload"
    >
      重新上传
    </a-button>
    <div class="upload-region">
      <a-upload-dragger
        :file-list="fileList"
        :disabled="uploadDisabled"
        :before-upload="beforeUpload"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">点击上传</p>
        <p class="ant-upload-hint">
          上传你的图片和水印，我可以帮助你完成水印添加
        </p>
      </a-upload-dragger>
      <div v-show="waterImage" class="weater-mack-image">
        <img :src="waterImage" alt="">
      </div>
    </div>
    <div v-if="originImage" class="preView-region">
      <div class="origin-image">
        <img :src="originImage" alt="">
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { uploadFile } from '@/api/module/upload';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message, type UploadProps } from 'ant-design-vue';
import { ref } from 'vue';
const fileList = ref<UploadProps['fileList']>([]);
const curType = ref<'water' | 'origin' | null>("water")
const originImage = ref('')
const waterImage = ref('')
const uploadDisabled = ref(false)
const beforeUpload: UploadProps['beforeUpload'] = (file)=> {
	fileList.value = [...(fileList.value || []), file];
	console.log(fileList.value);
	return false;
};
const handleClickUpload = async ()=> {
	const formData = new FormData()
	fileList.value?.forEach((file: any)=> formData.append('image', file));
	const { data, code, message: serverMessage} = await uploadFile(formData)
	console.log('code', code);
	if ( code === 0) return message.error(serverMessage)
  
	if (curType.value === 'water'){
		waterImage.value =  `${import.meta.env.VITE_WEB_MANAGER_API + data[0]}`
		curType.value = 'origin'
		fileList.value = []
		return
	}
	if (curType.value === 'origin') {
		originImage.value =  `${import.meta.env.VITE_WEB_MANAGER_API + data[0]}`
    // 重置当前类型的状态
		curType.value = null
		fileList.value = []
		uploadDisabled.value = true
		return
	}
}
/**
 * @description 重置上传状态
 */
const handelResetUpaload = ()=> {
	fileList.value = []
	waterImage.value = ''
	originImage.value = ''
}
</script>

<style lang="less" scoped>
.weater-mack{
  height: 100%;

  .upload-region{
    display: flex;
    width: 100%;
    height: 20%;

    .ant-upload-wrapper{
      width: 50%;
    }

    .weater-mack-image{
      border: 1px dashed #d9d9d9;
      border-radius: 8px; 
      height: 100%;
      margin-left: 10px;
      overflow: hidden;
      transition: all .4s;

      &:hover{
        border: 1px dashed #1677ff; 
      }

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

  }

  .upload-btn{
    margin : 5px 5px 0 0    
  }

  .preView-region{
    width: 100%;
    height: 70%;
    margin-top: 5px;

    .origin-image{
      width: 100%;
      height: 100%;
      // background-color: #ccc;

      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

  } 
}
</style>
