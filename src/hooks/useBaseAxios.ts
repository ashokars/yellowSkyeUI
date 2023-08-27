import { useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios';
import useAxiosReducer, { RequestState } from './useAxiosReducer';
import useAxiosCancel from './useAxiosCancel';
import { HttpClient } from "@/services/http.service";

interface RequestFunctions {
  cancel: () => void;
  refetch: (lazyData: any) => Promise<void>;
}

export interface Config extends AxiosRequestConfig {
  axiosInstance?: AxiosInstance;
  data?: any;
}

export type Props = RequestState & RequestFunctions;
export type BaseAxios = [(lazyData?: Config['data']) => Promise<void>, Props];

const UseBaseAxios = (config: Config): BaseAxios => {
  const isMounted = useRef(true);
  const [{ data, error, loading }, dispatch] = useAxiosReducer(config.data);
  const { cancel, cancelToken } = useAxiosCancel();

  const createAxiosInvoker = () => {
    const { axiosInstance = HttpClient.getInstance(), ...params } = config;

    return (lazyData: Config['data']) => {
      return axiosInstance({
        ...params,
        data: lazyData || params.data,
        cancelToken
      });
    };
  };

  const invokeAxios = createAxiosInvoker();

  const getData = useCallback(
    async (lazyData: Config['data']) => {
      dispatch({ type: 'REQUEST_INIT' });

      try {
        const res = (await invokeAxios(lazyData)) as AxiosResponse;
        const err = res instanceof AxiosError;
        if (isMounted.current && !err) {
          dispatch({ type: 'REQUEST_SUCCESS', payload: res.data });
        }
        if (err) {
          dispatch({ type: 'REQUEST_FAILED', payload: res as Error });
        }
      } catch (e) {
        if (isMounted.current) {
          dispatch({ type: 'REQUEST_FAILED', payload: e as Error });
        }
      }
    },
    [cancelToken, `${JSON.stringify(config)}`]
  );

  useEffect(() => {
    return () => {
      cancel();
      isMounted.current = false;
    };
  }, []);

  return [getData, { cancel, data, error, loading, refetch: getData }];
};

export default UseBaseAxios;