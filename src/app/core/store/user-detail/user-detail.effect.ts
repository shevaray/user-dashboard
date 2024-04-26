import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../service/user.service";
import { getUserByID, getUserByIDFailed, getUserByIDSuccess } from "./user-detail.action";
import { catchError, map, mergeMap } from "rxjs";

@Injectable()
export class UserDetailEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  getUserByID$ = createEffect(() => this.actions$.pipe(
    ofType(getUserByID),
    mergeMap((payload) => this.userService.getUserByID(payload).pipe(
      map((data) => getUserByIDSuccess({ data })),
      catchError(async (err) => getUserByIDFailed({ message: err }))
    ))
  ))
}
