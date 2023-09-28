<template>
  <div class="weater-mack">
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
        <p class="ant-upload-hint">{{ uploadContent }}</p>
      </a-upload-dragger>
      <div
        v-show="waterImage"
        ref="waterImageRef"
        class="weater-mack-image"
        @dragenter="handeldragenter"
        @dragstart="handeldragStart"
      >
        <img draggable="true" :src="waterImage" alt="">
      </div>
    </div>
    <div
      v-if="originImage"
      ref="originImageRef"
      class="preView-region"
      @drop="handledrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <div class="origin-image">
        <img :src="originImage" alt="">
      </div>
    </div>
    <div class="operation-btns">
      <a-button 
        type="primary"
        class="upload-btn"
        :disabled="fileList?.length === 0"
        @click="handleClickUpload"
      >
        上传
      </a-button>
      <a-button type="primary" class="reset-upload-btn" @click="handelResetUpaload">重新上传 </a-button>
      <a-button
        v-if="needHandelImages.length >= 2"
        type="primary"
        class="reset-upload-btn"
        @click="createWaterMackImage"
      >
        下载水印图
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { downloadCraftImg, uploadFile } from '@/api/module/upload';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message, type UploadProps } from 'ant-design-vue';
import { computed, ref } from 'vue';
const fileList = ref<UploadProps['fileList']>([]);
const maxImageCount = ref<number>(0)
const originImage = ref('')
const waterImage = ref('')
const needHandelImages = ref<string[]>([]) // 需要做水印处理的图片数组 默认为 水印在第 0位  原始图在第1 位
const uploadDisabled = ref(false)
const waterImageRef = ref<HTMLElement>()
const originImageRef = ref<HTMLElement >()
const positionX = ref<number>(0)
const positionY = ref<number>(0)

const uploadContent = computed( ()=> {
	if (maxImageCount.value === 0 && !uploadDisabled.value){
		return '上传你的水印图'
	} else if (maxImageCount.value === 1 && !uploadDisabled.value){
		return '上传你的背景图'
	} else  {
		return "图片上传完成"
	}
})
const beforeUpload: UploadProps['beforeUpload'] = (file)=> {
	fileList.value = [...(fileList.value || []), file];
	console.log(fileList.value);
	return false;
};
const handleClickUpload = async ()=> {
	console.log('', fileList.value);
	const formData = new FormData()
  // 添加上传的文件对象
	fileList.value?.forEach((file: any)=> formData.append('image', file));
  
	const { data, code, message: serverMessage} = await uploadFile(formData)
	if ( code === 0) return message.error(serverMessage)
  
	if (maxImageCount.value === 0){
		waterImage.value =  `${import.meta.env.VITE_WEB_MANAGER_API}/${data[0]}`
		maxImageCount.value = maxImageCount.value + 1
		needHandelImages.value.push(...data)
		fileList.value = []
		return
	}
	if (maxImageCount.value === 1) {
		originImage.value =  `${import.meta.env.VITE_WEB_MANAGER_API}/${data[0]}`
    // 重置当前类型的状态
		maxImageCount.value = 0
		needHandelImages.value.push(...data)
		fileList.value = []
		uploadDisabled.value = true
		return
	}
}
/**
 * @description 重置上传状态
 */
const handelResetUpaload = ()=> {
	needHandelImages.value =[]
	fileList.value = []
	waterImage.value = ''
	originImage.value = ''
	maxImageCount.value = 0
	uploadDisabled.value = false
}
/**
 * 
 * @description 创建水印图片
 */
const createWaterMackImage = async ()=> {
	let res = null
	let params = {
		fileUrls: needHandelImages.value
	}
	try {
		res = await downloadCraftImg(params)
	} catch (error) {}
	const { code, data } = res!
	if (code === 0) return message.error("生成失败")
	const aLink = document.createElement('a')
	aLink.href = `${import.meta.env.VITE_BASE_API_URL}/${data.url}`
	aLink.download = data.filename || 'craft'
	aLink.click()
	console.log('res', res);
}
const handeldragStart = (e: DragEvent)=> {
	const dt = e.dataTransfer
	dt?.setData('startOffsetX', `${e.offsetX}`)
	dt?.setData('startOffsetY', `${e.offsetY}`)
}
const handeldragenter = (e: DragEvent)=> 	e.preventDefault()
const handleDragLeave = (e:DragEvent)=> e.preventDefault()
const handleDragOver = (e:DragEvent)=> e.preventDefault()	

const handledrop = (e: DragEvent)=> {
	const startOffsetX = e.dataTransfer?.getData('startOffsetX')
	const startOffsetY = e.dataTransfer?.getData('startOffsetY')
	const waterEl:HTMLElement | undefined = waterImageRef.value
	positionX.value = e.offsetX - Number(startOffsetX)
	positionY.value = e.offsetY - Number(startOffsetY)
	waterEl!.className = 'waterMack-wapper'
	waterEl!.style.top = positionY.value + 'px'
	waterEl!.style.left = positionX.value + 'px'
	originImageRef.value?.appendChild(waterEl!)
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
      width: 20%;
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

  .operation-btns{
    margin-top: 35px;
    
    .upload-btn , .reset-upload-btn{
      margin: 0 15px 0 0     
    }
  }


  .preView-region{
    width: 100%;
    height: 70%;
    position: relative;
    margin-top: 5px;

    .origin-image{
      width: 100%;
      height: 100%;

      img{
        // width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .waterMack-wapper{
      width: 225px;
      height: 154px;
      position: absolute;
      z-index: 99;

      img{
        width: 100%;
        height: 100%;
      }

    }
  } 
}
</style>
