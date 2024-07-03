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
