import service from "@/service/index.js";

const baseUrl = "/edu-ai/ai/chat-bot/";
const api = {
  "v-dlg": `${baseUrl}v-dlg`,
  dlg: `${baseUrl}dlg`,
  history: "/edu-ai/ai/interaction/session",
  storage: "/edu-ai/ai/interaction/session/storage",
  delete: "/edu-ai/ai/interaction/session",
};
/**
 * ai语音对话
 * @param {{dialogue:{id: string, sessionId: number, query: string}, file: Blob}} payload
 * @returns {Promise<*>}
 */
export const aiVDlg = (payload) => {
  return service({
    method: "post",
    url: api["v-dlg"],
    data: {
      file: payload.file,
    },
    params: {
      id: payload.dialogue.id,
      sessionId: payload.dialogue.sessionId,
    }
  });
};
/**
 * ai文本对话
 * @param {{id: string, sessionId: number, query: string}} payload
 * @returns {Promise<*>}
 */
export const aiTDlg = (payload) => {
  return service({
    method: "post",
    url: api.dlg,
    data: payload,
  });
};
/**
 * ai文本对话历史数据
 * @param {{id: string}} payload
 * @returns {Promise<*>}
 */
export const aiHistory = (payload) => {
  return service({
    method: "get",
    url: api.history,
    params: payload,
  });
};
/**
 * ai文本对话历史数据 添加
 * @param {{userId: string, sessionId: number, content: *, type?: 0 | 1 }} payload
 * @returns {Promise<*>}
 */
export const addAiHistory = (payload) => {
  return service({
    method: "post",
    url: api.storage,
    data: { ...payload, type: 0 },
  });
};
/**
 * ai文本对话历史数据 删除
 * @param {{id: string, sessionId: number, type?: 0 | 1 }} payload
 * @returns {Promise<*>}
 */
export const delAiHistory = (payload) => {
  return service({
    method: "delete",
    url: api.delete,
    params: { ...payload, type: 0 },
  });
};
