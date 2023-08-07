<template>
  <div >
    <div class="area-input">
      <!-- <h2>为什么人有这么多为什么</h2> -->
      <el-form @submit.prevent @keyup.enter.native="onSubmit" :model="formdata" label-width="120px">
        <el-input v-model="formdata.question" placeholder="请输入问题" clearable>
          <template #append>
            <el-button :icon="Search" @click="onSubmit" />
          </template>
        </el-input>
      </el-form>
    </div>
    <div class="area-result" v-loading="loading">
      <div>
        {{ formdata.result }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
const loading = ref(false)
const formdata = reactive({
  question: '',
  result: ''
})
const onSubmit = () => {
  console.log(formdata.question)
  getResult();
}
// 回调函数
const getResult = () => {
  loading.value = true
  fetch('https://glm.aiursoft.cn', {
    method: "post",
    body: JSON.stringify({
      prompt: formdata.question
    })
  }).then(res => {
    return res.json()
  }).then(data => {
    loading.value = false
    formdata.result = data.response
  }).catch(function (error) {
    loading.value = false
    formdata.result = error.message
    console.log('错误信息：' + error.message);
  });
}
</script>

<style lang="less">
html,body{
  margin: 0;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 4rem 20vw;
  height: 100%;
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    &#app {
      padding: 2rem 5vw;
    }
  }
}


.area-input {
}

.area-result {
  text-align: left;
  margin-top: 2rem;
}
</style>