import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

function trimObjectProperties(obj: Record<string, any>) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let key: string;
  for (key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      obj[key] !== undefined &&
      obj[key] !== null &&
      typeof obj[key] === 'string'
    ) {
      obj[key] = obj[key].trim();
    } else if (typeof obj[key] === 'object') {
      trimObjectProperties(obj[key]);
    }
  }

  return obj;
}
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

export const errorConfig: RequestConfig = {
  errorConfig: {
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      switch (error.response.status) {
        case 404:
          message.error('API không tồn tại');
          break;
        case 403:
          message.error(
            'Bạn không có quyền truy cập API tính năng này. ' + error.response.data.message,
          );
          break;
        case 422: {
          message.error('Dữ liệu không hợp lệ. ' + error.response.data.message);
          break;
        }
        case 200:
        case 201: {
          message.success('Truy vấn thành công');
          break;
        }
        case 500:
        case 503: {
          message.error('Máy chủ gặp lỗi không thể phản hồi.');
          break;
        }
        default:
          console.log(error);
          break;
      }
    },
  },

  requestInterceptors: [
    (config: RequestOptions) => {
      return { ...config };
    },
    // (config: RequestOptions) => {
    //   config.baseURL = API_URL;
    //   return { ...config };
    // },
    (config: RequestOptions) => {
      trimObjectProperties(config.data);
      const accessToken = localStorage.getItem('access-token');
      if (accessToken) {
        config.headers!['Authorization'] = accessToken;
      }
      return { ...config };
    },
  ],

  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      if (data?.success === false) {
        message.error('请求失败！');
      }
      return response;
    },

    // (response) => {
    //   const { headers } = response;
    //   const token = headers['authorization'] || headers['Authorization'];
    //   if (token) {
    //     localStorage.setItem('access-token', token);
    //     Cookies.set('access-token', token);
    //   }
    //   return response;
    // },
    (response) => {
      const { status, statusText } = response;
      switch (status) {
        case 404:
          message.error('API không tồn tại');
          break;
        case 403:
          message.error('Bạn không có quyền truy cập API tính năng này.');
          break;
        case 422: {
          message.error('Dữ liệu không hợp lệ. ' + statusText);
          break;
        }
        case 200:
        case 201: {
          message.success('Truy vấn thành công');
          break;
        }
        case 500:
        case 503: {
          message.error('Máy chủ gặp lỗi không thể phản hồi.');
          break;
        }
        default:
          console.log(status, statusText);
          break;
      }
      return response;
    },
  ],
};
