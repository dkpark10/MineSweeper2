import axios, { AxiosResponse } from 'axios';

export interface AxiosInterface {
  [key: string]: (url: string, data?: any) => Promise<any>;
}

export interface Response{
  result:boolean;
  message?:string;
  token?: string;
}

const header: { [key: string]: any } = { headers: { 'Content-type': 'application/json' } };


const axiosApi: AxiosInterface = {
  get: (url: string, config: any) => axios.get(url, config)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),

  post: (url: string, data: any) => axios.post(url, data, header)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),
};

export default axiosApi;
