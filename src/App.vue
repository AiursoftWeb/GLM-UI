<template>
  <div>
    <div class="area-input">
      <!-- <h2>为什么人有这么多为什么</h2> -->
      <el-form
        @submit.prevent
        @keyup.enter.native="onSubmit"
        :model="formdata"
        label-width="120px"
      >
        <el-input
          v-model="formdata.question"
          placeholder="请输入问题"
          autofocus="autofocus"
          clearable
        >
          <template #append>
            <el-button
              :icon="Search"
              :loading="loading"
              :disabled="loading"
              @click="onSubmit"
            />
          </template>
        </el-input>
      </el-form>
    </div>
    <div class="area-result" v-loading="loading">
      <pre v-html="formdata.result"></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { auto as followSystemColorScheme } from 'darkreader';
const loading = ref(false);
const formdata = reactive({
  question: '',
  result: '',
});
const onSubmit = () => {
  console.log(formdata.question);
  getResult();
};
// 回调函数
const getResult = () => {
  loading.value = true;
  fetch('https://glm.aiursoft.cn', {
    method: 'post',
    body: JSON.stringify({
      prompt: formdata.question,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      loading.value = false;
      formdata.result = data.response;
    })
    .catch(function (error) {
      loading.value = false;
      formdata.result = error.message;
      console.log('错误信息：' + error.message);
    });
};
onMounted(() => {
  followSystemColorScheme();
});
</script>

<style lang="less">
html,
body {
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

pre {
  text-wrap: wrap;
  background: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
}
</style>
