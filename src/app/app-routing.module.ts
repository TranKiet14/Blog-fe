import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { UserManageComponent } from './pages/admin/user/user-manage/user-manage.component';
import { CategoryManageComponent } from './pages/admin/category/category-manage/category-manage.component';
import { LanguageManageComponent } from './pages/admin/language/language-manage/language-manage.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { AuthService } from './services/auth.service';
import { PermissionRoleComponent } from './pages/admin/permission-role/permission-role.component';
import { RoleManageComponent } from './pages/admin/role/role-manage/role-manage.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { HomeComponent } from './pages/client/home/home.component';
import { DetailPostComponent } from './pages/client/detail-post/detail-post.component';
import { PostManageComponent } from './pages/admin/post/post-manage/post-manage.component';
import { CreatePostComponent } from './pages/admin/post/create-post/create-post.component';
import { EditPostComponent } from './pages/admin/post/edit-post/edit-post.component';
import { DetailCategoryComponent } from './pages/client/detail-category/detail-category.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutClientComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "detail/:slug",
        component: DetailPostComponent
      },
      {
        path: "categories/:slug",
        component: DetailCategoryComponent
      },
    ]
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [AuthService],
    canActivateChild: [AuthService],
    children: [
      {
        path: '',
        redirectTo: 'user-manage',
        pathMatch: 'full',
        data: { permission_id : 1}
      },
      {
        path: 'user-manage',
        data: { permission_id : 1},
        component: UserManageComponent
      },
      {
        path: 'category-manage',
        data: { permission_id : 5},
        component: CategoryManageComponent
      },
      {
        path: 'language-manage',
        data: { permission_id : 9},
        component: LanguageManageComponent
      },
      {
        path: 'post-manage',
        data: { permission_id : 18},
        component: PostManageComponent
      },
      {
        path: 'create-post',
        data: { permission_id : 19},
        component: CreatePostComponent
      },
      {
        path: 'edit-post/:id',
        data: { permission_id : 20},
        component: EditPostComponent
      },
      {
        path: 'role-manage',
        data: { permission_id : 13},
        component: RoleManageComponent
      },
      {
        path: 'permission',
        data: { permission_id : 17},
        component: PermissionRoleComponent
      },
    ]
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
