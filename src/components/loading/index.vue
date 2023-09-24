<template>
  <a-spin class="Loading-component" size="large" />
</template>

<script lang="ts" setup>

</script>

<style scoped lang="less">
.Loading-component{
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  background-color: rgb(255 255 255 / 50%);
  justify-content: center;
}
</style>
