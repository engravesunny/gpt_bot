import { ref } from "vue";
import { v4 } from "uuid";

/**
 * @type {import('vue').Ref<{[index: string]: Array<any>}>} history
 */
const history = ref({
  chat: [],
  doc: [],
  eng: [],
});
export const chatHistoryStore = () => {
  const updateHistory = (newVal) => {
    history.value = [...newVal];
  };
  const addHistory = (newVal) => {
    history.value.push(newVal);
  };
  const clearHistory = async (name) => {
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
