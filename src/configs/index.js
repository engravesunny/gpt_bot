import botList from "@/views/home/components/bot-list.vue";
import other from "@/views/home/components/other.vue";

export const HomeTags = [
  {
    label: "对话",
    value: "home_bot",
    path: "/home/bot",
    component: botList,
  },
  {
    label: "其他",
    value: "home_other",
    path: "/home/other",
    component: other,
  },
];

export const BotList = [
  {
    label: "智能机器人",
    value: "gpt_bot",
    dsp: "智能机器人可以帮助你学习各种知识，帮您解决各种难题",
    avatar: "https://www.kecat.top/other/ad867018114ee2bded1977b1a3da25fb.jpg",
  },
  {
    label: "英语交流助手",
    value: "english_bot",
    dsp: "英语交流助手可以和你进行通畅的英文交流，支持一对一语音聊天",
    avatar: "https://www.kecat.top/other/be67cd76448998063a1c022dca53a51d.jpg",
  },
];
