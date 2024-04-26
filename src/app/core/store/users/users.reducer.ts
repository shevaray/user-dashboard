import { Action, createReducer, on } from "@ngrx/store";
import * as usersActions from './users.action';

export interface Users{
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: []
}

export interface State{
  isLoading: boolean,
  error: string | null,
  data: Users
}

const initialState: State = {
  isLoading: false,
  error: null,
  data: {
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    data: []
  }
}

const usersReducerInternal = createReducer(initialState,
  on(usersActions.resetStore, (state) => ({
    ...initialState
  })),

  on(usersActions.isLoading, (state, { payload }) => ({
    ...state,
    isLoading: payload
  })),

  on(usersActions.getUsersRequestFailed, (state, { message }) => ({
    ...state,
    isLoading: false,
    error: message
  })),

  on(usersActions.getUsersRequestSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    data: data
  })),
);

export function usersReducer(state: State | undefined, action: Action) {
  return usersReducerInternal(state, action)
}
