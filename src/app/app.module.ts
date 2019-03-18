import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule, MatButtonModule } from '@angular/material'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { GojsComponent } from './gojs/gojs.component';
import { DialogComponent } from './gojs/component/dialog/dialog.component';
import { DragAreaComponent } from './drag-area/drag-area.component';
import { LeaderLineComponent } from './drag-area/components/leader-line/leader-line.component'
import { DialogComponent as DComponent } from './drag-area/components/dialog/dialog.component';
import { ShowModelComponent } from './drag-area/components/show-model/show-model.component'

@NgModule({
  declarations: [
    AppComponent,
    GojsComponent,
    DialogComponent,
    DComponent,
    DragAreaComponent,
    LeaderLineComponent,
    ShowModelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule
  ],
  entryComponents: [ DialogComponent, DComponent, ShowModelComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
