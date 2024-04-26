import { createAction, props } from "@ngrx/store";
import { UserDetail } from "./user-detail.reducer";

export const resetStore = createAction('[User Detail] Reset Store');
export const getUserByID = createAction('[User Detail] Get User Detail',
  props<{id: any}>()
);
export const isLoading = createAction('[User Detail] Is Loading',
  props<{payload: boolean}>()
);
export const getUserByIDFailed = createAction('[User Detail] Get User Detail Failed',
  props<{message: string}>()
);
export const getUserByIDSuccess = createAction('[User Detail] Get User Detail Success',
  props<{data: UserDetail}>()
);
