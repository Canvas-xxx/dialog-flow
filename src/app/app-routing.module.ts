import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragAreaComponent } from './drag-area/drag-area.component'
import { GojsComponent } from './gojs/gojs.component'

const routes: Routes = [
  { path: 'drag', component: DragAreaComponent },
  { path: 'gojs', component: GojsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'drag' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
