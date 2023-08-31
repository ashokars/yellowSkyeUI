import { useEffect, useRef } from 'react';
import UseBaseAxios, { Props, Config } from './useBaseAxios';

function useAxios(url: string): Props;
function useAxios(config: Config): Props;
function useAxios(url: string, config: Config): Props;
function useAxios(param1: string | Config, param2: Config = {}) {
  const config =
    typeof param1 === 'string'
      ? {
          ...param2,
          url: param1
        }
      : param1;

  const [getData, dataStates] = UseBaseAxios(config);

  const justMounted = useRef(true);

  useEffect(() => {
    if (typeof config.data === 'undefined' || !justMounted.current) {
      getData();
    }
    justMounted.current = false;
  }, [JSON.stringify(config)]);

  return dataStates;
}

export default useAxios;