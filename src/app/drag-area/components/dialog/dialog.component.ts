import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  nodeElement: Array<NodeElementModel>

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PortDialogModel) {
    this.nodeElement = this.data.nodeElement.filter(node => node._id !== this.data.from)
    if(!this.data.data.type)
      this.data.data.type = 'Keyword'
  }

  onCancle(): void {
    this.dialogRef.close();
  }

}
export interface PortDialogModel {
  from: string,
  to: string,
  data: PortDataModel,
  nodeElement: Array<NodeElementModel>
}
export interface PortDataModel {
  type: string,
  data: string
}
export interface NodeElementModel {
  _id: string,
  name: string
}
