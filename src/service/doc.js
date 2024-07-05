import service from "@/service/index.js";

const baseUrl = '/edu-ai/ai/chat-doc/'
const api = {
  upload: `${baseUrl}upload`,
  status: `${baseUrl}status`,
  chat: `${baseUrl}chat`,
  summaryQuery: `${baseUrl}summary/query`,
  summaryLaunch: `${baseUrl}summary/launch`,
  info: `${baseUrl}info`,
  del: `${baseUrl}del`,
}

/**
 * 上传解析文档
 * @param {{id: number; file: any;}} payload
 * @returns {Promise<*>}
 */
export const uploadFile = (payload) => {
  return service({
    method: "post",
    url: api.upload,
    data: {
      file: payload.file,
    },
    params: {
      id: payload.id,
    }
  });
};

/**
 * 查询文件状态
 * @param {Array<number>} payload
 * @returns {Promise<*>}
 */
export const queryFileStatus = (payload) => {
  return service({
    method: "post",
    url: api.status,
    data: payload
  });
};

/**
 * 文档对话
 * @param {{ fileId: number; query: string; }} payload
 * @returns {Promise<*>}
 */
export const apiDocChat = (payload) => {
  return service({
    method: "post",
    url: api.chat,
    data: payload
  });
};

/**
 * 查询文档总结
 * @param {{ fileId: number; }} payload
 * @returns {Promise<*>}
 */
export const queryDocSummary = (payload) => {
  return service({
    method: "get",
    url: api.summaryQuery,
    params: payload
  });
};

/**
 * 发起文档总结
 * @param {{ fileId: number; }} payload
 * @returns {Promise<*>}
 */
export const launchDocSummary = (payload) => {
  return service({
    method: "get",
    url: api.summaryLaunch,
    params: payload
  });
};

/**
 * 文档信息
 * @param {{ fileId: number; }} payload
 * @returns {Promise<*>}
 */
export const queryDocInfo = (payload) => {
  return service({
    method: "get",
    url: api.info,
    params: payload
  });
};

/**
 * 删除文档
 * @param {Array<number>} payload
 * @returns {Promise<*>}
 */
export const delDoc = (payload) => {
  return service({
    method: "delete",
    url: api.del,
    data: payload
  });
};

