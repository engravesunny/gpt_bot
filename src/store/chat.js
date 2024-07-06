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
  const clearHistory = async (name, isDoc, isEng) => {
    if (isEng) {
      history.value.eng = [
        {
          role: "bot",
          content: "你好啊，我是" + name,
          id: v4(),
        },
      ];
    } else if (isDoc) {
      history.value.doc = [
        {
          role: "bot",
          content: "你好啊，我是" + name + "，请先上传文档，再进行对话",
          id: v4(),
        },
      ];
    } else {
      history.value.chat = [
        {
          role: "bot",
          content: "你好啊，我是" + name,
          id: v4(),
        },
      ];
    }
  };
  return {
    updateHistory,
    addHistory,
    history,
    clearHistory,
  };
};
