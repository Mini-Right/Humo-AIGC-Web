import { reactive, ref } from "vue";
import { ChatAPI } from '/@/api/chat/index'
import other from '/@/utils/other';


export interface IMessageItem {
  role: string;
  message: string;
  loading?: boolean;
}
export interface ISendMessageForm {
  message: string;
  message_history: IMessageItem[];
  is_knowledge: boolean
}



export enum AvatarEnum {
  User = 'https://s1-imfile.feishucdn.com/static-resource/v1/v2_e3c747e6-ed8b-4bc2-bbef-69d8e14a282g~?image_size=100x100&cut_type=&quality=&format=png&sticker_format=.webp',
  Bot = 'https://s1-imfile.feishucdn.com/static-resource/v1/v2_e3c747e6-ed8b-4bc2-bbef-69d8e14a282g~?image_size=100x100&cut_type=&quality=&format=png&sticker_format=.webp'
}

export class HumoChat {

  SendMessageForm = reactive<ISendMessageForm>({
    message: '',
    message_history: [],
    is_knowledge: true,
  })
  MessagePredictLoading = ref(false)

  IsStream = ref(false)

  MessageHistoryList = reactive<IMessageItem[]>([])

  MessagePredictReply = async () => {
    const { PredictAPI } = ChatAPI()

    this.SendMessageForm.message_history.splice(0, this.SendMessageForm.message_history.length, ...this.MessageHistoryList)

    this.MessageHistoryList.push({
      message: this.SendMessageForm.message,
      role: 'user',
      loading: false
    })
    this.MessageHistoryList.push({
      message: '',
      role: 'assistant',
      loading: true
    })
    try {

      this.MessagePredictLoading.value = true
      const { code, msg, data } = await PredictAPI(this.SendMessageForm)
      if (other.humoAPINotification(code, msg)) {
        const lastCustomerMessage = this.MessageHistoryList[this.MessageHistoryList.length - 1];
        lastCustomerMessage.message = data;
        lastCustomerMessage.loading = false

        this.SendMessageForm.message = ''
      }
    } catch (error) {
      const lastCustomerMessage = this.MessageHistoryList[this.MessageHistoryList.length - 1];
      lastCustomerMessage.message = '回复推理失败';
      lastCustomerMessage.loading = false;
    }
    this.MessagePredictLoading.value = false
  }


  MessagePredictReplyStream = async () => {

    this.SendMessageForm.message_history.splice(0, this.SendMessageForm.message_history.length, ...this.MessageHistoryList)

    this.MessageHistoryList.push({
      message: this.SendMessageForm.message,
      role: 'user',
      loading: false
    })
    this.MessageHistoryList.push({
      message: '',
      role: 'assistant',
      loading: true
    })

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/knowledge/predict_stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...this.SendMessageForm }),
      });
      if (response.body) {
        // messageInfoPayload.message = '';

        this.handleStream(response);
        this.SendMessageForm.message = ''
      }
    } catch (error) {
      // ElMessage.error(`Error fetching Chat API: ${error}`);
    }
    this.MessagePredictLoading.value = false

  }

  Predict = async () => {
    const predict = this.IsStream.value ? this.MessagePredictReplyStream : this.MessagePredictReply
    await predict()

  }
  handleStream = async (response: any) => {
    const reader = response.body.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        // sse响应转码
        const result = this.Uint8ArrayToString(value);
        const messages = result.split('\n\n').filter((msg) => msg.trim() !== '');
        const lastCustomerMessage = this.MessageHistoryList[this.MessageHistoryList.length - 1];
        lastCustomerMessage.loading = false
        messages.forEach((msg) => {
          lastCustomerMessage.message += msg
        });
      }
    } catch (error) {
      return;
    }
  };

  Uint8ArrayToString = (uint8Array: Uint8Array) => {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(uint8Array);
  }

}
