import axios, { AxiosResponse } from 'axios';


interface AxiosInterface {
  [key: string]: (url: string, data?: any) => Promise<AxiosResponse<any>>;
}

const header: { [key: string]: any } = { headers: { 'Content-type': 'application/json' } };

const axiosApi: AxiosInterface = {
  get: (url: string) => axios.get(url)
    .then((response: AxiosResponse) => response.data)
    .catch(err => console.error(err)),

  post: (url: string, data: any) => axios.post(url, data, header)
    .then((response: AxiosResponse) => response.data)
    .catch(err => console.error(err)),
};

export default axiosApi;
