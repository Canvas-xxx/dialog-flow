import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { NodeModel } from '../../drag-area.component'

@Component({
  selector: 'app-show-model',
  templateUrl: './show-model.component.html',
  styleUrls: ['./show-model.component.css']
})
export class ShowModelComponent {

  dataSourceNodes: Array<NodeListModel> = []
  displayedNodesColumns: string[] = ['name', 'questionlist', 'errorintent']

  dataSourceEdges: Array<EdgeListModel> = []
  displayedEdgesColumns: string[] = ['type', 'data', 'fromnode', 'tonode']

  constructor(public dialogRef: MatDialogRef<ShowModelComponent>, @Inject(MAT_DIALOG_DATA) public data: Array<NodeModel>) {
    this.data.forEach(d => {
      this.dataSourceNodes.push({
        name: d.name,
        questionlist: d.qustionList,
        errorintent: d.error
      })

      d.port.forEach(p => {
        if(p.data.type && p.data.data && p.from && p.to)
          this.dataSourceEdges.push({
            type: p.data.type,
            data: p.data.data,
            fromnode: this.data[this.data.findIndex(i => i._id === p.from)].name,
            tonode: this.data[this.data.findIndex(i => i._id === p.to)].name
          })
      })
    })
  }
  
}
interface NodeListModel {
  name: string,
  questionlist: Array<string>,
  errorintent: string
}
interface EdgeListModel {
  type: string,
  data: string,
  fromnode: string,
  tonode: string
}
