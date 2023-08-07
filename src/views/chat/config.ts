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
  message_history: IMessageItem[]
}



export enum AvatarEnum {
  User = 'https://s1-imfile.feishucdn.com/static-resource/v1/v2_e3c747e6-ed8b-4bc2-bbef-69d8e14a282g~?image_size=100x100&cut_type=&quality=&format=png&sticker_format=.webp',
  Bot = 'https://s1-imfile.feishucdn.com/static-resource/v1/v2_e3c747e6-ed8b-4bc2-bbef-69d8e14a282g~?image_size=100x100&cut_type=&quality=&format=png&sticker_format=.webp'
}

export class HumoChat {

  SendMessageForm = reactive<ISendMessageForm>({
    message: '',
    message_history: [],
  })
  MessagePredictLoading = ref(false)

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

}
