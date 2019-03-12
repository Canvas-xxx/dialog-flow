import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatDialogModule } from '@angular/material/dialog'
import { Ng2PanZoomModule } from 'ng2-panzoom'
import { MatInputModule, MatButtonModule } from '@angular/material'
import { MatSelectModule } from '@angular/material/select'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { GojsComponent } from './gojs/gojs.component';
import { DialogComponent } from './gojs/component/dialog/dialog.component';
import { DragAreaComponent } from './drag-area/drag-area.component';
import { LeaderLineComponent } from './drag-area/components/leader-line/leader-line.component'
import { DialogComponent as DComponent } from './drag-area/components/dialog/dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    GojsComponent,
    DialogComponent,
    DComponent,
    DragAreaComponent,
    LeaderLineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    Ng2PanZoomModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  entryComponents: [ DialogComponent, DComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
