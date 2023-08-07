import request from '/@/utils/request';

/**
 * Chat接口集合
 * @method PredictAPI 推理
 */
export function ChatAPI() {
  return {
    PredictAPI: (data: object) => {
      return request({
        url: '/api/knowledge/predict',
        method: 'post',
        data,
      });
    },

  };
}
