import { createSelector } from '@ngrx/store';
import * as fromApp from '../app/app.reducer'
import * as fromUsers from './user-detail.reducer'

const getUserDetailState = (state: fromApp.AppState) => state.userDetail;

export const getUserDetail = createSelector(getUserDetailState, (state: fromUsers.State) => state.data)
export const isLoading = createSelector(getUserDetailState, (state: fromUsers.State) => state.isLoading)
export const errorResponse = createSelector(getUserDetailState, (state: fromUsers.State) => state.error)

