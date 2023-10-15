// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 返回值: Results all photos GET /photos */
export async function PhotosControllerGetAllPhotos(options?: { [key: string]: any }) {
  return request<API.PhotoResult[]>('/photos', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /photos */
export async function PhotosControllerCreatePhoto(
  body: API.CreatePhotoDto,
  options?: { [key: string]: any },
) {
  return request<any>('/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
