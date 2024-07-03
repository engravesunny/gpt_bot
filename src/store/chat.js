import { ref } from "vue";
import { delAiHistory } from "@/service/ai.js";
import { userStore } from "@/store/user.js";
import { v4 } from "uuid";

const history = ref([]);
const { userInfo } = userStore();
export const chatHistoryStore = () => {
  const updateHistory = (newVal) => {
    history.value = [...newVal];
  };
  const addHistory = (newVal) => {
    history.value.push(newVal);
  };
  const clearHistory = async (name) => {
    await delAiHistory({
      id: userInfo.value?.id,
      sessionId: Date.now(),
    });
    history.value = [
      {
        role: "bot",
        content: "你好啊，我是" + name,
        id: v4(),
      },
    ];
  };
  return {
    updateHistory,
    addHistory,
    history,
    clearHistory,
  };
};
