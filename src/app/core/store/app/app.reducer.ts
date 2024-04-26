
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as AppActions from '../app/app.action'
import * as fromUsers from '../users/users.reducer'
import * as fromUserDetail from '../user-detail/user-detail.reducer'

export interface AppState {
  users: fromUsers.State;
  userDetail: fromUserDetail.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  users: fromUsers.usersReducer,
  userDetail: fromUserDetail.userDetailReducer
}

export function resetStoreMetaReducer<State extends {}>
  (reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    if (action !== null && action.type === AppActions.ResetAllStores.type) {
      state = {} as State; // ==> Emptying state here
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [resetStoreMetaReducer];
