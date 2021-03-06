import axios, { AxiosResponse, Method } from 'axios';
import { Dispatch } from 'redux';
import { TypeActions } from '../interfaces/actions.interface';
import { IResImageUpload } from '../interfaces/profile.interface';
import { ALERT } from './constants/constants';

const baseURL = 'http://localhost:4000/api';

interface IHeader {
  Authorization?: string;
}

export const apiActions = async (
  dispatch: Dispatch<TypeActions>,
  method: Method,
  url: string,
  data?: {},
  headers?: IHeader
): Promise<AxiosResponse | { data: null }> => {
  try {
    axios.defaults.withCredentials = true;
    return await axios({ url, baseURL, method, data, headers });
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error:
          error.response && error.response.data.error ? error.response.data.error : error.message,
      },
    });
    return { data: null };
  }
};

export const apiUrls = async (
  method: Method,
  url: string,
  data?: {},
  headers?: {}
): Promise<AxiosResponse<IResImageUpload>> => {
  axios.defaults.withCredentials = false;
  const res = await axios({ url, baseURL, method, data, headers });
  return res;
};
