// 登录类型
export const LoginType = {
  Password: "password",
  Code: "code",
};
// 语音对话状态
export const ChatStatus = {
  Ready: "ready",
  Chatting: "chatting",
  Listening: "listening",
  Thinking: "thinking",
};
// 语音对话展示文案
export const DisplayChatText = {
  [ChatStatus.Ready]: "点击按钮与我对话",
  [ChatStatus.Listening]: "我正在听哦",
  [ChatStatus.Thinking]: "等我想一下",
  [ChatStatus.Chatting]: "",
};

// 上传文件状态enum
export const FileStatus = {
  UPLOADED: 'uploaded',
  OCRING: 'ocring',
  VECTORING: 'vectoring',
  VERTORED: 'vectored',
}
export const FileStatusMeaning = {
  uploaded: '上传成功',
  ocring: '文字识别中...',
  vectoring: '文本处理中...',
  vectored: '解析完毕',
}
