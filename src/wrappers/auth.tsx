import { useModel } from '@umijs/max';
import { message } from 'antd';
import { Navigate, Outlet } from 'umi';

export default () => {
  const { initialState } = useModel('@@initialState');

  console.log(initialState);
  if (initialState?.currentUser?.name) {
    return <Outlet />;
  }
  message.error('Bạn không có quyền đăng nhập vào danh mục Quản trị hệ thống');
  return <Navigate to="/" />;
};
