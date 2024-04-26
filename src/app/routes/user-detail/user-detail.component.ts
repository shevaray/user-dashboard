import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../core/store/app/app.reducer'
import * as fromUserDetail from '../../core/store/user-detail/user-detail.reducer'
import * as fromUserDetailAction from '../../core/store/user-detail/user-detail.action'
import * as fromUserDetailSelectors from '../../core/store/user-detail/user-detail.selector'
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userDetail$!: Observable<fromUserDetail.UserDetail>;
  isLoading$!: Observable<boolean>;
  errorResponse$!: Observable<string | null>;
  userDetail: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getUserID();
  }

  getUserID() {
    this.route.params
      .subscribe({
        next: (params) => {
          if (Object.keys(params)) {
            this.getUserDetail(params);
            return
          }
        }
      });
  }

  getUserDetail(param: any) {
    this.store.dispatch(fromUserDetailAction.getUserByID(param))
    this.store.dispatch(fromUserDetailAction.isLoading({ payload: true }))

    this.userDetail$ = this.store.select(fromUserDetailSelectors.getUserDetail)
    this.isLoading$ = this.store.select(fromUserDetailSelectors.isLoading)
    this.errorResponse$ = this.store.select(fromUserDetailSelectors.errorResponse)
  }

  goBack() {
    this.router.navigate(['/users'])
  }

}
