import { Spin } from 'antd';

const loading = () => {
  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
      <Spin size="large"></Spin>
    </div>
  );
};

export default loading;
