import axios from 'axios';

export const baseURL = 'https://api.loctour.com';

const createApi = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(config => {
    // Add any common request logic here
    const token = localStorage.getItem('token');  // Using localStorage instead of AsyncStorage
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  });

  instance.interceptors.response.use(function (response) {
    // Modify response data, handle errors, etc.
    return response;
  }, function (error) {
    // Check if the error status is 440
    if (error.response && error.response.status === 440) {
        // Perform logout action or handle accordingly
        logoutUser();
    } else {
        // For other errors, reject the promise
        return Promise.reject(error);
    }
  });

  const get = url => {
    return instance.get(url);
  };

  const post = (url, data) => {
    return instance.post(url, data);
  };

  const put = (url, data) => {
    return instance.put(url, data);
  };

  const del = url => {
    return instance.delete(url);
  };

  return {get, post, put, del};
};

export const {get, post, put, del} = createApi();
