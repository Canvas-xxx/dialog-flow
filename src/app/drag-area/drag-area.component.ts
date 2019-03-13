import { Component, OnInit } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop'
import { LeaderLineComponent } from './components/leader-line/leader-line.component'
import { MatDialog } from '@angular/material'
import { DialogComponent } from './components/dialog/dialog.component'
import { ShowModelComponent } from './components/show-model/show-model.component'

@Component({
  selector: 'app-drag-area',
  templateUrl: './drag-area.component.html',
  styleUrls: ['./drag-area.component.css'],
  providers: [ LeaderLineComponent ]
})
export class DragAreaComponent implements OnInit {

  nodesArray: Array<NodeModel> = []

  constructor( private line: LeaderLineComponent, public dialog: MatDialog ) { }

  ngOnInit() {
    this.nodesArray.push({
      _id: this.randomString(),
      name: 'Element1',
      qustionList: [''],
      port: [],
      line: [],
      error: ''
    })
  }

  onDragMoved = ($e: CdkDragMove, item: NodeModel): void => {
    item.line.forEach(l => {
      this.line.updatePosition(l.lineId)
    })
  }

  addQuestion = (node: NodeModel): void => {
    node.qustionList.push('')
  }

  addPort = (node: NodeModel): void => {
    let _id: string = this.randomString()
    node.port.push({
      _id: _id,
      from: node._id,
      to: null,
      data: { type: '', data: '' }
    })
  }

  addLine = (node: NodeModel, port: PortModel): void => {
    const that = this
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { type: port.data.type, data: port.data.data }
    })
    let currentNode = document.getElementById(node._id)
    dialogRef.afterClosed().subscribe((result: PortDataModel) => {
      if(result) {
        switch(null) {
          case port.to:
            const _id: string = that.randomString()
            that.nodesArray.push({
              _id: _id,
              name: 'Element' + (this.nodesArray.length + 1),
              qustionList: [],
              port: [],
              line: [],
              error: ''
            })
            setTimeout(() => {
              let newNode = document.getElementById(_id)
              that.createNewNode(newNode, currentNode)
              setTimeout(() => {
                let line = that.line.createLine(document.getElementById(port._id), newNode, result.data)
                port.to = _id
                node.line.push({ portId: port._id, lineId: line})
                that.nodesArray[that.nodesArray.length - 1].line.push({ portId: port._id, lineId: line})
              }, 300)
            })
          default:
            const lineId = node.line.find( l => port._id === l.portId)
            if(lineId)
              that.line.updateLabel(lineId.lineId, result.data)
            port.data = { type: result.type, data: result.data }
        }
      }
    })
  }

  createNewNode = (newNode: HTMLElement, currentNode: HTMLElement): void => {
    let top = (currentNode.style.top.length > 0 ? parseInt(currentNode.style.top.replace('px', '')) : 0)
    let left = (currentNode.style.left.length > 0 ? parseInt(currentNode.style.left.replace('px', '')) : 0)
    if(!currentNode.style.transform) {
      newNode.style.left = (currentNode.offsetLeft + left + 300) + 'px'
      newNode.style.top = currentNode.offsetTop + top + 'px'
    }
    if(currentNode.style.transform) {
      let tranform = currentNode.style.transform
      let position = tranform.replace('translate3d(', '').replace(')', '').replace(/ /g, '').replace(/px/g, '').split(',')
      newNode.style.left = (parseInt(position[0]) + 300 + left) + 'px'
      newNode.style.top = (parseInt(position[1]) + top) + 'px'
    }
  }

  saveModel = (): void => {
    const dialogRef = this.dialog.open(ShowModelComponent, {
      width: '700px',
      data: this.nodesArray
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    })
  }

  randomString = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  indexTracker(index: number, value: any) {
    return index;
  }
}
export interface NodeModel {
  _id: string,
  name: string,
  qustionList: Array<string>,
  port: Array<PortModel>,
  line: Array<LineModel>,
  error: string
}
export interface LineModel {
  portId: string,
  lineId: string
}
export interface PortModel {
  _id: string,
  from: string,
  to: string,
  data: PortDataModel
}
export interface PortDataModel {
  type: string,
  data: string
}
