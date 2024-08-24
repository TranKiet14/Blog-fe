import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { MenuSiderComponent } from './components/menu-sider/menu-sider.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { IconDefinition } from '@ant-design/icons-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { MenuFoldOutline, MenuUnfoldOutline, ArrowLeftOutline, HomeOutline, LogoutOutline, TeamOutline, GoldOutline, GlobalOutline, DashboardOutline, HeartFill, LockOutline, UserOutline, MailOutline, FacebookOutline, GithubOutline, GoogleOutline, KeyOutline, PlusOutline, LoadingOutline, PictureTwoTone, SafetyOutline, FileProtectOutline } from '@ant-design/icons-angular/icons';
import { UserManageComponent } from './pages/admin/user/user-manage/user-manage.component';
import { CategoryManageComponent } from './pages/admin/category/category-manage/category-manage.component';
import { LanguageManageComponent } from './pages/admin/language/language-manage/language-manage.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PermissionRoleComponent } from './pages/admin/permission-role/permission-role.component';
import { EditCategoryComponent } from './pages/admin/category/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './pages/admin/category/delete-category/delete-category.component';
import { UploadDemoComponent } from './components/upload-demo/upload-demo.component';
import { EditLanguageComponent } from './pages/admin/language/edit-language/edit-language.component';
import { DeleteLanguageComponent } from './pages/admin/language/delete-language/delete-language.component';
import { EditUserComponent } from './pages/admin/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './pages/admin/user/delete-user/delete-user.component';
import { CreateUserComponent } from './pages/admin/user/create-user/create-user.component';
import { CreateLanguageComponent } from './pages/admin/language/create-language/create-language.component';
import { CreateCategoryComponent } from './pages/admin/category/create-category/create-category.component';
import { CreateRoleComponent } from './pages/admin/role/create-role/create-role.component';
import { RoleManageComponent } from './pages/admin/role/role-manage/role-manage.component';
import { EditRoleComponent } from './pages/admin/role/edit-role/edit-role.component';
import { DeleteRoleComponent } from './pages/admin/role/delete-role/delete-role.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { HomeComponent } from './pages/client/home/home.component';
import { SideBarComponent } from './pages/client/side-bar/side-bar.component';
import { DetailPostComponent } from './pages/client/detail-post/detail-post.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { CreatePostComponent } from './pages/admin/post/create-post/create-post.component';
import { EditPostComponent } from './pages/admin/post/edit-post/edit-post.component';
import { PostManageComponent } from './pages/admin/post/post-manage/post-manage.component';
import { DeletePostComponent } from './pages/admin/post/delete-post/delete-post.component';
import { DetailCategoryComponent } from './pages/client/detail-category/detail-category.component';
const icons: IconDefinition[] = [MenuFoldOutline, MenuUnfoldOutline, HomeOutline, LogoutOutline, TeamOutline, GoldOutline, GlobalOutline, DashboardOutline, HeartFill, LockOutline, UserOutline, MailOutline, FacebookOutline, GithubOutline, GoogleOutline, KeyOutline, ArrowLeftOutline, PlusOutline, LoadingOutline, PictureTwoTone, SafetyOutline, FileProtectOutline];

@NgModule({
  declarations: [
    AppComponent,
    LayoutAdminComponent,
    MenuSiderComponent,
    UserManageComponent,
    CategoryManageComponent,
    LanguageManageComponent,
    SignInComponent,
    SignUpComponent,
    GoBackComponent,
    PermissionRoleComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    UploadDemoComponent,
    EditLanguageComponent,
    DeleteLanguageComponent,
    EditUserComponent,
    DeleteUserComponent,
    CreateUserComponent,
    CreateLanguageComponent,
    CreateCategoryComponent,
    CreateRoleComponent,
    RoleManageComponent,
    EditRoleComponent,
    DeleteRoleComponent,
    LayoutClientComponent,
    HomeComponent,
    SideBarComponent,
    DetailPostComponent,
    CreatePostComponent,
    EditPostComponent,
    PostManageComponent,
    DeletePostComponent,
    DetailCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzTableModule,
    NzAvatarModule,
    NzTagModule,
    NzToolTipModule,
    BrowserAnimationsModule,
    NzPopconfirmModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NzNotificationModule,
    NzModalModule,
    NzRadioModule,
    NzUploadModule,
    NzSelectModule,
    NzTabsModule,
    NzImageModule,
    NzCommentModule,
    NzListModule,
    EditorModule,
    NzIconModule.forRoot(icons),
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
