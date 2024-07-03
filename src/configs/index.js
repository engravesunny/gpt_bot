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
export const OtherList = [
  {
    label: "校园PPT助手",
    value: "ppt_bot",
    dsp: "校园PPT助手帮你制作优质PPT",
    avatar:
      "https://img.51miz.com/Element/00/85/41/53/2d2fede7_E854153_465ed382.png",
  },
  {
    label: "文档解析助手",
    value: "doc_bot",
    dsp: "文档解析助手支持解析概要各种文档",
    avatar:
      "https://img.tukuppt.com/png_preview/00/24/33/dx9dFEnPkQ.jpg!/fw/780",
  },
];
export const mainList = () => [
  {
    tag: "电话",
    value: "18852182238",
    key: "phone",
  },
  {
    tag: "姓名",
    value: "迟占斌",
    key: "name",
  },
  {
    tag: "职业",
    value: "学生",
    key: "job",
  },
  {
    tag: "学校",
    value: "学生",
    key: "school",
  },
  {
    tag: "年级",
    value: "学生",
    key: "grade",
  },
  {
    tag: "专业",
    value: "学生",
    key: "lesson",
  },
  {
    tag: "性别",
    value: "学生",
    key: "sex",
  },
  {
    tag: "年龄",
    value: "22岁",
    key: "year",
  },
];
