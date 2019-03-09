import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QrCodeComponent} from './qr-code/qr-code.component';

const routes: Routes = [
  {path:'',redirectTo:'/qr-code',pathMatch:'full'},
  {path: 'qr-code', component: QrCodeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
