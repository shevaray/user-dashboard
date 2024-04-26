import { createAction, props } from "@ngrx/store";
import { Users } from "./users.reducer";

export const resetStore = createAction('[Users] Reset Store');
export const getUsers = createAction('[Users API] Get Users',
  props<any>()
);
export const isLoading = createAction('[Users API] Is Loading',
  props<{ payload: boolean }>()
);
export const getUsersRequestFailed = createAction('[Users API] Users Request Failed',
  props<{ message: string }>()
);
export const getUsersRequestSuccess = createAction('[Users API] Users Request Success',
  props<{ data: Users }>()
);

