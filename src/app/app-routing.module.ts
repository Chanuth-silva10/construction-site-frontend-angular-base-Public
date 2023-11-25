import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


const appRoutes:Routes = [
  {path:'login', component: LoginComponent},

]
@NgModule({
  imports: [

    RouterModule.forRoot(appRoutes,{enableTracing:false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
