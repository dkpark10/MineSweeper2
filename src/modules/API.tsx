import axios, { AxiosResponse } from 'axios';

export interface AxiosInterface {
  [key: string]: (url: string, data?: any) => Promise<any>;
}

export interface Response {
  result: boolean;
  message?: string;
  loginInfo?: {
    id: string;
    accessToken: string;
  }
}

const config: { [key: string]: any } = {
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
};

const axiosApi: AxiosInterface = {
  get: (url: string) => axios.get(url, config)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),

  post: (url: string, data: any) => axios.post(url, data, config)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),
};


export default axiosApi;
