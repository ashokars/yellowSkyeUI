import UseBaseAxios, { Config } from './useBaseAxios';

const usePaginatedAxios = (param1: string | Config, param2: Config = {}) => {
  let config = {};
  if (typeof param1 === 'string') config = { url: param1 };
  else config = { ...param1, ...param2 };
  const [getData, dataStates] = UseBaseAxios(config);

  return {
    getData,
    ...dataStates,
    pageNumber: dataStates.data ? dataStates.data.page : 0,
    pageSize: dataStates.data ? dataStates.data.pageSize : 0,
    totalItems: dataStates.data ? dataStates.data.totalItems : 0
  };
};

export default usePaginatedAxios;