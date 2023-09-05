<template>
  <div class="dialog-container" ref="scrollContainer">
    <div
      v-for="(message, index) in dialogue.messages"
      :key="index"
      :class="message.isUser ? 'user-message' : 'bot-message'"
      class="message"
      v-loading="message.loading"
      v-html="$filters.renderContent(message.content)"
    >
    </div>
  </div>
  <div class="answer-container">
    <div class="area-input">
      <el-button @click="reset" size="large">清空</el-button>
      <el-form
        @submit.prevent
        @keyup.enter.native="onSubmit"
        :model="formdata"
        label-width="120px"
        style="width: 100%"
      >
        <el-input
          v-model="formdata.question"
          :disabled="loading"
          placeholder="请输入问题"
          autofocus="autofocus"
          clearable
          size="large"
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import { auto as followSystemColorScheme } from "darkreader";
const loading = ref(false);
const scrollContainer = ref(null);
const formdata = reactive({
  question: "",
});
const dialogue = reactive({
  messages: [],
});
const onSubmit = () => {
  getResult();
};
const reset = () => {
  formdata.question = "";
  dialogue.messages = [];
};
const getResult = async () => {
  loading.value = true;
  const result = dialogue.messages.reduce((acc, curr, idx) => {
    if (idx % 2 === 0) {
      //当索引值是偶数时，创建一个新的子数组
      acc.push([curr.content]);
    } else {
      //当索引值是奇数时，将当前元素加到上一个子数组
      acc[acc.length - 1].push(curr.content);
    }
    return acc;
  }, []);
  await nextTick();
  dialogue.messages.push({ content: formdata.question, isUser: true });
  scrollToBottom();
  const ans = await fetch("https://glm.aiursoft.cn", {
    method: "post",
    body: JSON.stringify({
      prompt: formdata.question,
      history: result,
    }),
  }).catch(function (error) {
    loading.value = false;
    dialogue.messages.push({ content: error, isUser: false });
    formdata.question = "";
    scrollToBottom();
  });
  const data = await ans.json();
  console.log(data);
  loading.value = false;
  dialogue.messages.push({ content: data.response, isUser: false });
  formdata.question = "";
  scrollToBottom();
};
const scrollToBottom = async () => {
  await nextTick();
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: scrollContainer.value.scrollHeight,
      behavior: "smooth",
    });
  }
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
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.dialog-container {
  height: 60vh;
  width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
}

.message {
  padding: 10px;
  border-radius: 5px;
  text-align: left;
  max-width: 400px;
}

.user-message {
  background-color: #e6f7ff;
  align-self: flex-start;
}

.bot-message {
  min-width: 50px;
  background-color: #f0f0f0;
  align-self: flex-end;
}

#user-input {
  width: 100%;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.answer-container {
  width: 600px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .area-input {
    width: 100%;
  }

  .dialog-container {
    width: 90%;
    height: 80%;
  }

  .dialog {
    padding: 10px;
  }

  .answer-container {
    width: 90%;
    margin: 0 auto;
  }

  .message {
    max-width: 80%;
  }
}
</style>
