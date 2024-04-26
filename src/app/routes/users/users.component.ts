import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUsersSelector from 'src/app/core/store/users/users.selector';
import * as fromApp from 'src/app/core/store/app/app.reducer';
import * as fromUsersActions from 'src/app/core/store/users/users.action';
import { Users } from 'src/app/core/store/users/users.reducer';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$!: Observable<Users>;
  isLoading$!: Observable<boolean>;
  errorResponse$!: Observable<string | null>;
  users: any[] = [];

  // PAGINATION
  currentPage: number = 1;
  pageSize: number = 0;
  total: number = 0;
  from: number = 0
  to: number = 0


  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkIfQueryParamExists();
  }

  checkIfQueryParamExists() {
    this.route.queryParams.
      subscribe({
        next: (params) => {
          if (Object.keys(params)) {
            this.getAllUsers(params);
            return;
          }

          this.getAllUsers();
        }
    })
  }

  getAllUsers(queryParams?: any) {
    this.store.dispatch(fromUsersActions.getUsers(queryParams));
    this.store.dispatch(fromUsersActions.isLoading({ payload: true }));

    this.users$ = this.store.select(fromUsersSelector.getUsers);
    this.isLoading$ = this.store.select(fromUsersSelector.isLoading);
    this.errorResponse$ = this.store.select(fromUsersSelector.errorResponse);
    this.users$.subscribe((res) => {
      const { data, page, per_page , total } = res;
      this.users = data;
      this.currentPage = page;
      this.pageSize = per_page;
      this.total = total;
      this.from = (page - 1) * per_page;
      this.to = page * per_page;
    })
  }

  viewUserDetail(id: any) {
    this.router.navigate([`/users/${id}`])
  }

}
