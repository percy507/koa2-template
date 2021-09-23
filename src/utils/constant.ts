export const JWT_SCREAT = 'my_tokennnn';

export enum BUSINESS_CODE {
  SUCCESS = 0,
  UNKNOWN_ERROR = 9999, // 未知异常
  PARAMS_ERROR = 8888, // 参数异常
  TOKEN_EXPIRED = 1001, // token过期
  TOKEN_INVALID = 1002, // token失效
}
