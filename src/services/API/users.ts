// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 返回值: Results all users GET /users */
export async function UsersControllerGetAllUsers(options?: { [key: string]: any }) {
  return request<API.UserResult[]>('/users', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /users */
export async function UsersControllerCreateUser(
  body: API.CreateUserDto,
  options?: { [key: string]: any },
) {
  return request<any>('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
