import { Action, createReducer, on } from "@ngrx/store"
import * as userDetailActions from './user-detail.action';


export interface UserDetail{
  id: string | null,
  email: string | null,
  first_name: string | null,
  last_name: string | null,
  avatar: string | null
}

export interface State{
  isLoading: boolean,
  error: string | null,
  data: UserDetail
}

const initialState: State = {
  isLoading: false,
  error: null,
  data: {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "assets/avatar.webp"
  }
}

const userDetailInternal = createReducer(initialState,
  on(userDetailActions.resetStore, (state) => ({
    ...initialState
  })),

  on(userDetailActions.isLoading, (state, { payload }) => ({
    ...state,
    isLoading: payload
  })),

  on(userDetailActions.getUserByIDFailed, (state, { message }) => ({
    ...state,
    isLoading: false,
    error: message
  })),

  on(userDetailActions.getUserByIDSuccess, (state, {data}) => ({
    ...state,
    isLoading: false,
    data: data
  })),

);

export function userDetailReducer(state: State | undefined, action: Action) {
  return userDetailInternal(state, action)
}
