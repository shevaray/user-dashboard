import { Injectable } from "@angular/core";
import { UserService } from "../../service/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getUsers, getUsersRequestFailed, getUsersRequestSuccess } from "./users.action";
import { catchError, map, mergeMap } from "rxjs";

@Injectable()
export class UsersEffects {
  constructor(
    private userService: UserService,
    private actions$: Actions
  ) { }

  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(getUsers),
    mergeMap((payload) => this.userService.getUsers(payload).pipe(
      map((data) => getUsersRequestSuccess({ data })),
      catchError(async (err) => getUsersRequestFailed({ message: err }))
    ))
  ))
}

