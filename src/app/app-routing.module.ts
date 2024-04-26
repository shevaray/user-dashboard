import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: "users",
    loadChildren: () => import("./routes/users/users.module")
      .then((m) => m.UsersModule)
  },
  {
    path: "users/:id",
    loadChildren: () => import('./routes/user-detail/user-detail.module')
      .then((m) => m.UserDetailModule)
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

