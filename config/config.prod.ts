// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    API_URL: 'http://localhost:8000',
  },
  hash: true,
  history: {
    type: 'hash',
  },
});
