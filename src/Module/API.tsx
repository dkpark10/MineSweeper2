import axios from 'axios';

const axiosAPI = async (url: string, data?: any, method?: string) => {

  switch (method) {
    case 'GET':
      axios.get(url, data)
        .then((response) => { })
        .catch((err) => console.error(err));
      break;
    case 'POST':
      axios.post(url, data,
        {
          headers: {
            'Content-type': 'application/json',
          }
        })
        .then((response) => { })
        .catch((err) => console.error(err));
      break;
    default:
      axios.get(url)
        .then((response) => { })
        .catch((err) => console.error(err));
      break;
  }
}

export default axiosAPI;