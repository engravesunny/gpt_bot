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
      <div class="add" @click="handleAddNewChat" v-if="!isDocAnalyse">
        &#xe6cd;
      </div>
      <div class="clear" @click="clearHistory(route.query.name)">&#xe602;</div>
    </div>
    <div ref="chatBoayRef" class="chat-body">
      <MessageItem
        v-for="messageItem in history?.[historyKey] || []"
        :key="messageItem?.id"
        :content="messageItem?.content"
        :isNew="messageItem?.isNew"
        :role="messageItem?.role"
        :type="messageItem?.type"
        :status="messageItem?.status"
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
          <div class="mic" @click="handleJumpToChat" v-if="!isDocAnalyse">
            &#xe687;
          </div>
          <div class="more" @click="handleShowMoreBox">&#xe6c8;</div>
          <button v-if="showSendBtn || inputMessage" @click="handleSendMessage">
            {{ loading ? "loading" : "发送" }}
          </button>
        </div>
      </div>
      <div class="dsp">内容由讯飞AI生成</div>
      <div v-if="showMoreBox" class="more-box">
        <input
          @change="handleFileChange"
          ref="fileInputRef"
          type="file"
          name="file"
          id="1"
        />
        <div class="more-box-btn" v-if="isDocAnalyse">
          <el-button @click="handleUploadFile" class="more-btn">
            <div class="box-inner">
              <div class="iconfont icon">&#xe621;</div>
              <div class="text">文档解析</div>
            </div>
          </el-button>
        </div>
        <div class="other">敬请期待～</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElButton } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import MessageItem from "./components/message-item.vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { v4 } from "uuid";
import { chatHistoryStore } from "@/store/chat.js";
import { userStore } from "@/store/user.js";
import { addAiHistory, aiHistory, aiTDlg, delAiHistory } from "@/service/ai.js";
import { ElMessage } from "element-plus";
import { docStore } from "@/store/doc";
import { launchDocSummary, queryFileStatus, uploadFile } from "@/service/doc";

const route = useRoute();
const router = useRouter();
const showSendBtn = ref(false);
const showMoreBox = ref(false);
const inputMessage = ref("");
const loading = ref(false);
const textarea = ref(null);
const inputRef = ref(null);
const chatBoayRef = ref(null);
const fileInputRef = ref(null);
const { history, updateHistory, clearHistory } = chatHistoryStore();
const { docIds, docStatus, docInfos, updateDocStore, clearDocHistory } =
  docStore();
// 文档解析助手标记
const isDocAnalyse = computed(() => {
  return route.query.value === "doc_bot";
});
const isEngHistory = computed(() => {
  return route.query.value === "english_bot";
});
const historyKey = computed(() => {
  if (isEngHistory.value) return "eng";
  return isDocAnalyse.value ? "doc" : "chat";
});
const { userInfo } = userStore();

const botPaddingBottom = computed(() => {
  if (showMoreBox.value) return "280px";
  if (showSendBtn.value) return "200px";
  return "80px";
});

const handleAddNewChat = async () => {
  history.value[historyKey.value].push({
    role: "bot",
    content: "你好啊，我是" + route.query.name,
    id: v4(),
    isNew: true,
  });
  await delAiHistory({
    id: userInfo?.value?.id,
    sessionId: Date.now(),
  });
  await addAiHistory({
    id: userInfo?.value?.id,
    sessionId: Date.now(),
    content: JSON.stringify(history.value || {}),
  });
  setTimeout(() => {
    chatBoayRef.value.scrollTop = chatBoayRef.value.scrollHeight;
  });
};
const queryMessageList = async () => {
  if (history.value[historyKey.value].length === 0) {
    history.value[historyKey.value] = [
      {
        role: "bot",
        content: "你好啊，我是" + route.query.name,
        id: v4(),
      },
    ];
    if (isDocAnalyse.value) {
      history.value[historyKey.value][0].content += "，先上传文档再进行对话";
    }
  }
  try {
    let apiHis = await aiHistory({
      id: userInfo.value?.id,
    });
    if (apiHis && typeof apiHis === 'string') {
      history.value = apiHis;
    }
  } catch (error) {}
};
const handleSendMessage = async () => {
  if (loading.value) {
    return ElMessage.info("loading～");
  }
  if (inputMessage.value === "") {
    return ElMessage.info("请输入问题再发送哦～");
  }
  history.value[historyKey.value].push({
    role: "user",
    content: inputMessage.value,
    id: v4(),
  });
  history.value[historyKey.value].push({
    role: "bot",
    id: v4(),
    content: "loading...",
  });
  loading.value = true;
  showSendBtn.value = false;
  chatBoayRef.value.scrollTop = chatBoayRef.value.scrollHeight;
  const newBotMessage = {
    role: "bot",
    content: "你好啊，我是" + route.query.name + "遇到了一点问题",
    id: v4(),
  };
  try {
    const tempMessage = inputMessage.value;
    inputMessage.value = "";
    const message = await aiTDlg({
      id: userInfo?.value?.id,
      sessionId: Date.now(),
      query: tempMessage,
    });
    if (typeof message == "string" && message) {
      newBotMessage.content = message;
    }
  } catch (e) {
    console.log(e);
  }
  history.value[historyKey.value].pop();
  history.value[historyKey.value].push(newBotMessage);
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
const handleUploadFile = () => {
  fileInputRef.value.click();
};
const handleFileChange = async (e) => {
  const file = e?.target?.files?.[0];
  const fileName = file?.name;
  const messageUserInfo = {
    role: "user",
    content: fileName,
    id: v4(),
    type: "file",
    status: "上传中...",
  };
  const messageBotInfo = {
    role: "bot",
    content: fileName,
    id: v4(),
    type: "file",
    status: "解析中...",
  };
  history.value[historyKey.value].push(messageUserInfo);
  try {
    // 上传文档
    const uploadFileRes = await uploadFile({
      file,
      id: userInfo.value?.id,
    });
    // 更新上传状态
    messageUserInfo.status = "上传成功";
    history.value[historyKey.value].pop();
    history.value[historyKey.value].push(messageUserInfo);
    // 存储文档id和其上传状态
    const {
      data: { fileId },
    } = uploadFileRes;
    messageBotInfo.id = fileId;
    docIds.value.push(fileId);
    docStatus.value.push({
      fileId,
      fileStatus: "解析中...",
    });
    // 发起轮训查询文档解析状态
    const timer = setInterval(async () => {
      const res = queryFileStatus([...docIds.value]);
      const fileStatus = res.data.find(
        (item) => item.fileId === fileId
      ).fileStatus;
      if (fileStatus === "某一状态") {
        // 发起文档总结
        const launchFileRes = await launchDocSummary({
          fileId: uploadFileRes?.data?.fileId,
        });
        // 更新状态为解析完成
        history.value[historyKey.value].forEach((item) => {
          if (item.id === fileId) {
            item.status = "解析完成";
          }
        });
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
    // 自动发起文档总结（或者再某一状态时，比如后端文件上传完成？）
    console.log("[ uoloadFile ] >", uploadFileRes);
    console.log("[ launchFileRes ] >", launchFileRes);
  } catch (error) {
    ElMessage.error(error);
  }
  history.value[historyKey.value].push(messageBotInfo);
};

onMounted(() => {
  queryMessageList();
  document.addEventListener("click", handleCLickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", handleCLickOutside);
});

watch(
  history,
  () => {
    // history发生改变时，上传用户聊天记录
    // addAiHistory({
    //   id: userInfo?.value?.id,
    //   sessionId: Date.now(),
    //   content: JSON.stringify(history.value || {}),
    // });
  },
  {
    deep: true,
    immediate: true,
  }
);
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    flex-direction: column;
    input {
      transform: scale(0);
      position: absolute;
    }
    .more-box-btn {
      padding: 10px;
      :deep(.el-button) {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .box-inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        .text {
          font-size: 10px;
        }
        .icon {
          font-size: 40px;
        }
      }
    }
  }
}
</style>
