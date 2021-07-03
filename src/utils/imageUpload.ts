import { AxiosResponse } from 'axios';
import { apiUrls } from '../redux/api';

export const checkImage = (file: File): string => {
  let error = '';
  if (!file) {
    error = 'La imagen no existe';
    return error;
  }
  if (file.size > 1024 * 1024) error = 'El tamaño de la imagen debe ser de maximo 1mb';
  return error;
};

export const imageUpload = async (file: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'pa7torsa');
  formData.append('cloud_name', 'images-store-cloud');
  const data = await apiUrls(
    'POST',
    'https://api.cloudinary.com/v1_1/images-store-cloud/image/upload',
    formData
  );
  return data;
};
