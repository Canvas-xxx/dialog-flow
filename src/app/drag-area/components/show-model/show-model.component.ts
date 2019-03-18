import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { NodeModel } from '../../drag-area.component'
import { RestfulService } from '../../services/restful-service.service'
import { ConverterService } from '../../services/converter-service.service'

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

  constructor(public dialogRef: MatDialogRef<ShowModelComponent>, @Inject(MAT_DIALOG_DATA) public data: Array<NodeModel>,
  private restfulService: RestfulService, private converterService: ConverterService) {
    this.data.forEach(d => {
      this.dataSourceNodes.push({
        _id: d._id,
        name: d.name,
        questionlist: d.qustionList,
        errorintent: d.error
      })

      d.port.forEach(p => {
        if(p.data.type && p.data.data && p.from && p.to)
          this.dataSourceEdges.push({
            type: p.data.type,
            data: p.data.data,
            fromnode: this.data[this.data.findIndex(i => i._id === p.from)]._id,
            tonode: this.data[this.data.findIndex(i => i._id === p.to)]._id
          })
      })
    })
  }

  convertNodeIdToName = (_id: string): string => {
    return this.dataSourceNodes[this.dataSourceNodes.findIndex(i => i._id === _id)].name
  }

  onInsertDialog = (): void => {
    const dialogModel = this.converterService.convertToInsertDialogFormat('Dialog1', this.dataSourceNodes, this.dataSourceEdges)
    console.log(dialogModel)
    // this.restfulService.postInsertDialog({}).subscribe((response) => {
    //   console.log(response)
    // }, (error) => {
    //   console.log(error)
    // })
  }
  
}
export interface NodeListModel {
  _id: string,
  name: string,
  questionlist: Array<string>,
  errorintent: string
}
export interface EdgeListModel {
  type: string,
  data: string,
  fromnode: string,
  tonode: string
}
