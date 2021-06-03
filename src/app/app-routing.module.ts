import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
const routes: Routes = [{
  path:"",component:IndexComponent
},{
  path:"home",component:HomeComponent,canActivate:[AuthGuard],
},
  {path: "chatroom/:id", component:ChatroomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
