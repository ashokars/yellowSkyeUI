import UseBaseAxios, { BaseAxios, Config } from './useBaseAxios';

function useLazyAxios(url: string): BaseAxios;
function useLazyAxios(config: Config): BaseAxios;
function useLazyAxios(url: string, config: Config): BaseAxios;
function useLazyAxios(param1: string | Config, param2: Config = {}) {
  let config = {};
  if (typeof param1 === 'string') config = { url: param1 };
  else config = { ...param1, ...param2 };
  return UseBaseAxios(config);
}

export default useLazyAxios;