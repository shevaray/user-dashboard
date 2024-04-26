import { createSelector } from '@ngrx/store';
import * as fromApp from '../app/app.reducer'
import * as fromUsers from './users.reducer'

const getUsersState = (state: fromApp.AppState) => state.users;

export const getUsers = createSelector(getUsersState, (state: fromUsers.State) => state.data)
export const isLoading = createSelector(getUsersState, (state: fromUsers.State) => state.isLoading)
export const errorResponse = createSelector(getUsersState, (state: fromUsers.State) => state.error)

