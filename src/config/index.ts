import path from 'path';
import devConfig from './c_dev';
import testConfig from './c_test';
import prodConfig from './c_prod';

const env = (process.env.NODE_ENV || 'dev') as NODE_ENV;

const configMap = {
  dev: devConfig,
  test: testConfig,
  prod: prodConfig,
};

// 上传文件目录
export const uploadDir = path.resolve(process.cwd(), './public/uploads');

// 日志目录
export const logDir = path.resolve(process.cwd(), './public/logs');

// 基础路径
export const baseAPI = '/v1';

// 路径白名单，免JWT验证
// export const pathWhiteList = [/\/user\/login/];
export const pathWhiteList = [/.*/];

export default Object.assign({}, configMap[env]);
