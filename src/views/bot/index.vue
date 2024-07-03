<template>
  <div :style="{ paddingBottom: botPaddingBottom }" class="bot iconfont">
    <div class="nav">
      <div class="back" @click="router.back()">&#xe61e;</div>
      <div class="avatar">
        <img :src="route.query.avatar" alt="头像" />
      </div>
      <div class="introduce">
        <div class="name">{{ route.query.name }}</div>
        <div class="dsp">{{ route.query.dsp }}</div>
      </div>
      <div class="add" @click="handleAddNewChat">&#xe6cd;</div>
      <div class="clear" @click="clearHistory(route.query.name)">&#xe602;</div>
    </div>
    <div ref="chatBoayRef" class="chat-body">
      <MessageItem
        v-for="messageItem in history"
        :key="messageItem.id"
        :content="messageItem.content"
        :isNew="messageItem?.isNew"
        :role="messageItem.role"
      />
    </div>
    <div
      ref="inputRef"
      :class="{
        'active-input-box': showSendBtn,
        'more-input-box': showMoreBox,
      }"
      class="input-box"
      @blur="handleInputBoxBlur"
    >
      <div class="input-container">
        <div class="input">
          <input
            v-if="!showSendBtn"
            v-model="inputMessage"
            placeholder="点我问问题"
            type="text"
            @focus="handleFocus"
          />
          <textarea
            v-else
            ref="textarea"
            v-model="inputMessage"
            placeholder="点我问问题"
          />
          <div class="mic" @click="handleJumpToChat">&#xe687;</div>
          <div class="more" @click="handleShowMoreBox">&#xe6c8;</div>
          <button v-if="showSendBtn || inputMessage" @click="handleSendMessage">
            {{ loading ? "loading" : "发送" }}
          </button>
        </div>
      </div>
      <div class="dsp">内容有讯飞AI生成</div>
      <div v-if="showMoreBox" class="more-box">暂无内容</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import MessageItem from "./components/message-item.vue";
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { v4 } from "uuid";
import { chatHistoryStore } from "@/store/chat.js";
import { userStore } from "@/store/user.js";
import { aiHistory, aiTDlg, delAiHistory } from "@/service/ai.js";

const showSendBtn = ref(false);
const showMoreBox = ref(false);
const inputMessage = ref("");
const loading = ref(false);
const textarea = ref(null);
const inputRef = ref(null);
const chatBoayRef = ref(null);
const { history, updateHistory, clearHistory } = chatHistoryStore();
const { userInfo } = userStore();

const botPaddingBottom = computed(() => {
  if (showMoreBox.value) return "280px";
  if (showSendBtn.value) return "200px";
  return "80px";
});

const handleAddNewChat = () => {
  history.value.push({
    role: "bot",
    content: "你好啊，我是" + route.query.name,
    id: v4(),
    isNew: true,
  });
  delAiHistory({
    id: userInfo?.value?.id,
    sessionId: Date.now(),
  });
};

const queryMessageList = async () => {
  // TODO 请求messageList
  history.value = [
    {
      role: "bot",
      content: "你好啊，我是" + route.query.name,
      id: v4(),
    },
  ];
  let apiHis = await aiHistory({
    id: userInfo.value?.id,
  });
  if (apiHis.length) {
    history.value = apiHis;
  }
};
const handleSendMessage = async () => {
  if (loading.value || inputMessage.value === "") {
    return;
  }
  history.value.push({
    role: "user",
    content: inputMessage.value,
    id: v4(),
  });
  history.value.push({
    role: "bot",
    id: v4(),
    content: "loading...",
  });
  loading.value = true;
  showSendBtn.value = false;
  chatBoayRef.value.scrollTop = chatBoayRef.value.scrollHeight;
  const mockMessage = {
    role: "bot",
    content: "你好啊，我是" + route.query.name,
    id: v4(),
  };
  inputMessage.value = "";
  try {
    const message = await aiTDlg({
      id: userInfo?.id,
      sessionId: Date.now(),
      query: inputMessage.value,
    });
    if (message instanceof String) {
      mockMessage.content = message;
    }
  } catch (e) {
    console.log(e);
  }
  history.value.pop();
  history.value.push(mockMessage);
  chatBoayRef.value.scrollTop = chatBoayRef.value.scrollHeight;
  loading.value = false;
};
const handleShowMoreBox = () => {
  showMoreBox.value = !showMoreBox.value;
  showSendBtn.value = false;
};
const handleFocus = () => {
  showSendBtn.value = true;
  showMoreBox.value = false;
  nextTick(() => {
    textarea.value.focus();
  });
};
const handleInputBoxBlur = () => {
  showMoreBox.value = false;
  showSendBtn.value = false;
};
const handleCLickOutside = (e) => {
  if (inputRef.value && !inputRef.value?.contains(e.target)) {
    handleInputBoxBlur();
  }
};
const handleJumpToChat = () => {
  router.push({
    path: "/chat",
    query: route.query,
  });
};

onMounted(() => {
  queryMessageList();
  document.addEventListener("click", handleCLickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", handleCLickOutside);
});

const route = useRoute();
const router = useRouter();
</script>

<style lang="less" scoped>
.bot {
  width: 100vw;
  height: 100vh;
  padding: 50px 0 80px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  .nav {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

    .back {
      margin: 0 15px;
    }

    .avatar {
      width: 35px;
      height: 35px;
      margin-right: 5px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .introduce {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .name {
        font-size: 16px;
        font-weight: 700;
      }

      .dsp {
        font-size: 11px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgb(136, 136, 136);
      }
    }

    .add {
      font-size: 21px;
      margin: 0 0 0 20px;
    }

    .clear {
      font-size: 21px;
      margin: 0 20px 0 20px;
    }
  }

  .chat-body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: scroll;
    scroll-behavior: smooth;
  }

  .input-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    box-shadow: 0 -1px 1px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    .input-container {
      height: calc(100% - 20px);
      width: 100%;
      padding: 6px 15px;
      box-sizing: border-box;

      .input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 22px;
        box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
        gap: 20px;

        input,
        textarea {
          flex: 1;
          outline: none;
          border: none;
          font-size: 16px;

          &::placeholder {
            color: rgb(169, 162, 162);
          }
        }

        textarea {
          box-sizing: border-box;
          height: 100%;
          padding: 15px 0;
        }

        .mic {
          width: 20px;
          font-size: 20px;
          font-weight: 700;
        }

        .more {
          width: 20px;
          font-size: 20px;
          font-weight: 700;
        }

        button {
          border: none;
          padding: 5px 10px;
          background-color: #009dff;
          color: #fff;
          border-radius: 5px;
          box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.01);

          &:active {
            background-color: #009dffc0;
          }
        }
      }
    }

    .dsp {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      font-size: 8px;
    }
  }

  .active-input-box {
    height: 200px;
  }

  .more-input-box {
    height: 280px;

    .input-container {
      height: 60px;
    }
  }

  .more-box {
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
