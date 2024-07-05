import { computed, ref } from "vue";
import { ChatStatus, DisplayChatText } from "@/constants/index.js";
import { aiVDlg } from "@/service/ai.js";
import { userStore } from "@/store/user.js"; // 处理与机器人语音对话逻辑
// 处理与机器人语音对话逻辑
const { userInfo } = userStore();

export const useChatting = () => {
  // 音波高度
  const waves = ref([
    {
      height: 16,
    },
    {
      height: 16,
    },
    {
      height: 16,
    },
  ]);
  // 机器人音频
  const botAudio = ref();
  // 展示文字 当前状态 机器人文案
  const displayText = computed(() => {
    return DisplayChatText[chattingStatus.value] + botChatText.value;
  });
  // 录音recorder
  const recorder = ref();
  // 录音blob
  const recordBlob = ref();
  // 当前聊天状态
  const chattingStatus = ref(ChatStatus.Ready);
  // 机器人音频url
  const botAudioUrl = ref("");
  // 机器人返回文案
  const botChatText = ref("");
  // 录制音频流
  const recordStream = ref();
  // 录制音频分析
  const recordAnalyser = ref();
  // 机器人音频分析
  const botAudioAnalyser = ref();

  // 创建音波处理
  const createRecordWaveContext = () => {
    let audioContext = new window.AudioContext();
    recordAnalyser.value = audioContext.createAnalyser();
    let mediaNode = audioContext.createMediaStreamSource(recordStream.value);
    mediaNode.connect(recordAnalyser.value);
  };
  // 创建音频音波处理
  const createAudioWaveContext = () => {
    let audioContext = new window.AudioContext();
    botAudioAnalyser.value = audioContext.createAnalyser();
    let mediaNode = audioContext.createMediaElementSource(botAudio.value);
    mediaNode.connect(botAudioAnalyser.value);
    botAudioAnalyser.value.connect(audioContext.destination);
  };

  // 更新录制音频音波信息
  const updateRecordWaves = () => {
    if (chattingStatus.value !== ChatStatus.Listening) return;
    // 创建一个数组来接收分析数据
    const dataArray = new Float32Array(recordAnalyser.value.frequencyBinCount);
    recordAnalyser.value.getFloatTimeDomainData(dataArray);
    let dataArrayInfo = [...dataArray];
    let wave1 = dataArrayInfo.splice(0, 340);
    let wave2 = dataArrayInfo.splice(0, 340);
    let wave3 = dataArrayInfo.splice(0, 340);
    let waveInfo = [wave1, wave2, wave3];
    waves.value = waveInfo.map((wave) => {
      return {
        height: 16 + Math.max(Math.max(...wave), Math.min(...wave)) * 100,
      };
    });
    console.log(waves.value[0].height);
    if (recordStream.value && chattingStatus.value === ChatStatus.Listening) {
      setTimeout(() => {
        requestAnimationFrame(updateRecordWaves);
      }, 100);
    }
  };

  // 更新机器人音频音波
  const updateAudioWaves = () => {
    console.log(chattingStatus.value);
    if (chattingStatus.value !== ChatStatus.Chatting) return;
    // 创建一个数组来接收分析数据
    const dataArray = new Float32Array(recordAnalyser.value.frequencyBinCount);
    botAudioAnalyser.value.getFloatTimeDomainData(dataArray);
    let dataArrayInfo = [...dataArray];
    let wave1 = dataArrayInfo.splice(0, 340);
    let wave2 = dataArrayInfo.splice(0, 340);
    let wave3 = dataArrayInfo.splice(0, 340);
    let waveInfo = [wave1, wave2, wave3];
    waves.value = waveInfo.map((wave) => {
      return {
        height: 16 + Math.max(Math.max(...wave), Math.min(...wave)) * 100,
      };
    });
    console.log(waves.value[0].height);
    if (chattingStatus.value === ChatStatus.Chatting) {
      setTimeout(() => {
        requestAnimationFrame(updateAudioWaves);
      }, 100);
    }
  };

  // 处理机器人音频播放
  const handlePlayBotAudio = () => {
    botAudio.value = new Audio("data:audio/x-wav;base64," + botAudioUrl.value);
    botAudio.value.play();
    botAudio.value.style.transform = "scale(0)";
    document.documentElement.appendChild(botAudio.value);
    botAudio.value.onended = () => {
      cancelChatting();
    };
    createAudioWaveContext();
    updateAudioWaves();
  };

  // 取消音频播放
  const handleCancelAudioPlaying = () => {
    botAudio.value && document.documentElement.removeChild(botAudio.value);
    botAudio.value = null;
  };

  // 开始录音 得到录音blob并存储下来
  const startRecord = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return Promise.reject(new Error("不支持录音！！"));
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        recordStream.value = stream;
        recorder.value = new MediaRecorder(stream);
        chattingStatus.value = ChatStatus.Listening;
        let chunks = [];
        recorder.value.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        recorder.value.onstop = () => {
          recordBlob.value = new Blob(chunks, { type: "audio/wav" });
          botAudioUrl.value = URL.createObjectURL(recordBlob.value);
          chunks = [];
          void startBotThinking();
        };
        recorder.value.start();
        // 创建音波分析
        createRecordWaveContext();
        // 更新音波信息
        updateRecordWaves();
      });
    }
  };
  // 取消机器人讲话 取消机器人思考 回到最初Ready状态
  const cancelChatting = () => {
    chattingStatus.value = ChatStatus.Ready;
    // 机器人停止思考
    // 机器人停止说话
    handleCancelAudioPlaying();
    // 录音recorder
    recorder.value = null;
    // 录音blob
    recordBlob.value = null;
    // 机器人音频url
    botAudioUrl.value = "";
    // 机器人文案
    botChatText.value = "";
    recordStream.value = null;
  };
  // 机器人思考
  const startBotThinking = async () => {
    chattingStatus.value = ChatStatus.Thinking;
    try {
      const chatInfo = await aiVDlg({
        dialogue: {
          id: 1,
          sessionId: Date.now(),
        },
        file: recordBlob.value,
      });
      botChatText.value = chatInfo.text ? chatInfo.text : "";
      chatInfo.audioBase64 &&
        (botAudioUrl.value = chatInfo.audioBase64);
      if(!chatInfo) {
        chattingStatus.value = ChatStatus.Ready;
        cancelChatting();
        return;
      }
    } catch (e) {
      console.log(e);
    }
    if (chattingStatus.value === ChatStatus.Thinking) {
      chattingStatus.value = ChatStatus.Chatting;
      handlePlayBotAudio();
    }
  };
  // 停止录音
  const stopRecord = () => {
    recorder.value.stop();
    recordStream.value.getAudioTracks()[0].stop();
  };

  return {
    waves,
    botAudio,
    displayText,
    chattingStatus,
    startRecord,
    cancelChatting,
    stopRecord,
    startBotThinking,
  };
};
