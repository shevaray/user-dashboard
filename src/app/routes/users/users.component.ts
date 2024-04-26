import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from 'src/app/core/store/app/app.reducer';
import * as fromUsersSelector from 'src/app/core/store/users/users.selector';
import * as fromUsersActions from 'src/app/core/store/users/users.action';
import * as fromUserDetail from '../../core/store/user-detail/user-detail.reducer'
import * as fromUserDetailAction from '../../core/store/user-detail/user-detail.action'
import * as fromUserDetailSelectors from '../../core/store/user-detail/user-detail.selector'
import { Users } from 'src/app/core/store/users/users.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { PageSizeOptions } from 'src/app/core/config/table-page-size-options.config';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$!: Observable<Users>;
  userDetail$!: Observable<fromUserDetail.UserDetail>;
  isLoading$!: Observable<boolean>;
  errorResponse$!: Observable<string | null>;
  users: any[] = [];
  searchValue: any ;

  // PAGINATION
  currentPage: number = 1;
  pageSize: number = 0;
  total: number = 0;
  from: number = 0
  to: number = 0
  pageSizeOptions: any[] = PageSizeOptions;


  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
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

  onSelectPage(page: any) {
    this.router.navigate(['/users'], {
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    })
  }

  onSelectPageSize(size: any) {
    this.router.navigate(['/users'], {
      queryParams: {page: 1, per_page: size },
      queryParamsHandling: 'merge'
    })
  }

  search() {
    if (!this.searchValue || typeof this.searchValue == undefined) {
      this.getAllUsers();
      return
    }

    this.users = []
    this.store.dispatch(fromUserDetailAction.getUserByID({id: this.searchValue}))
    this.store.dispatch(fromUserDetailAction.isLoading({ payload: true }))

    this.userDetail$ = this.store.select(fromUserDetailSelectors.getUserDetail)
    this.isLoading$ = this.store.select(fromUserDetailSelectors.isLoading)
    this.errorResponse$ = this.store.select(fromUserDetailSelectors.errorResponse)

    this.errorResponse$.subscribe(async (res) => {
      const error = await res
      if (!error) return;
      this.users = [];
    })

    this.userDetail$.subscribe((res) => {
        this.users = [res];
    })
  }

}
