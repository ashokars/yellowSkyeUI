import { useReducer } from 'react';

export interface RequestState {
  data: any | undefined;
  loading: boolean;
  error: Error | undefined;
}

type Action =
  | { type: 'REQUEST_INIT' }
  | { type: 'REQUEST_SUCCESS'; payload: any }
  | { type: 'REQUEST_FAILED'; payload: Error };

export const createInitialState = (data?: any) => ({
  data: typeof data === 'undefined' ? undefined : data,
  error: undefined,
  loading: false
});

const createReducer =
  () =>
  (
    state: RequestState,
    action: Action
    /* eslint-disable-next-line consistent-return */
  ): RequestState => {
    /* eslint-disable-next-line default-case */
    switch (action.type) {
      case 'REQUEST_INIT':
        return {
          ...state,
          error: undefined,
          loading: true
        };
      case 'REQUEST_SUCCESS':
        return {
          ...state,
          data: action.payload,
          error: undefined,
          loading: false
        };
      case 'REQUEST_FAILED':
        return {
          ...state,
          error: action.payload,
          loading: false
        };
    }
  };

export default (data?: any) => useReducer(createReducer(), createInitialState(data));