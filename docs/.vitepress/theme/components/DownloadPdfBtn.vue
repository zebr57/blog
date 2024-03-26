<template>
  <button class="download-btn" @click="handleDownload">下载PDF</button>
</template>

<script setup>
import pdf from "../../../public/assets/简历-沈林强-web前端工程师.pdf";
const handleDownload = () => {
  // 打开新窗口并展示PDF
  window.open(pdf);
};
</script>

<style>
.download-btn {
  color: #666;
}
</style>
