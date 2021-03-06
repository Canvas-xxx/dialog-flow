import { Component, OnInit } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop'
import { LeaderLineComponent } from './components/leader-line/leader-line.component'
import { MatDialog } from '@angular/material'
import { DialogComponent, PortDialogModel } from './components/dialog/dialog.component'
import { ShowModelComponent } from './components/show-model/show-model.component'

@Component({
  selector: 'app-drag-area',
  templateUrl: './drag-area.component.html',
  styleUrls: ['./drag-area.component.css'],
  providers: [ LeaderLineComponent ]
})
export class DragAreaComponent implements OnInit {

  nodesArray: Array<NodeModel> = []
  nodesElement: Array<NodeElementModel> = []

  constructor( private line: LeaderLineComponent, public dialog: MatDialog ) { }

  ngOnInit() {
    this.createNewElement(this.randomString(), 'Element1')
  }

  onDragMoved = ($e: CdkDragMove, item: NodeModel): void => {
    item.line.forEach(l => {
      this.line.updatePosition(l.lineId)
    })
  }

  addQuestion = (node: NodeModel): void => {
    node.qustionList.push('')
  }

  createNewElement = (_id: string, name: string): void => {
    this.nodesElement.push({
      _id: _id,
      name: name
    })
    this.nodesArray.push({
      _id: _id,
      name: name,
      qustionList: [''],
      port: [],
      line: [],
      error: ''
    })
  }

  deleteElement = (node: NodeModel): void => {
    if(this.nodesArray.length > 1) {
      const rootIndex = this.nodesArray.findIndex(i => i._id === node._id)
      node.line.forEach( l => {
        this.line.deleteLine(l.lineId)
        this.nodesArray.forEach(n => {
          n.port.some((p, index, ports) => {
            if(p._id === l.portId && n._id !== node._id) {
              ports.splice(index, 1)
              return true
            }
          })
          n.line.some((parentLine, index, parentLines) => {
            if(parentLine.portId === l.portId && n._id !== node._id) {
              parentLines.splice(index, 1)
              return true
            }
          })
        })
      })
      node.port.forEach( p => {
        const childIndex = this.nodesArray.findIndex(i => i._id === p.to)
        if(childIndex !== -1)
          this.nodesArray[childIndex].line = this.nodesArray[childIndex].line.filter( cl => cl.portId !== p._id)
      })
      this.nodesArray.splice(rootIndex, 1)
      this.nodesElement.splice(rootIndex, 1)
    }
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
      width: '300px',
      data: { _id: port._id, from: port.from, to: port.to, data: port.data, nodeElement: this.nodesElement }, 
    })
    let currentNode = document.getElementById(node._id)
    dialogRef.afterClosed().subscribe((result: PortDialogModel) => {
      if(result) {
        if(typeof(result) === 'string') {
          that.deleteLine(node, port, result)
          return
        }
        switch(null) {
          case result.to:
            that.createNewElementConnectLine(node, port, result, currentNode)
            break
          default:
            const lineId = node.line.find( l => port._id === l.portId)
            if(lineId) {
              switch(true) {
                case port.to === result.to:
                  that.line.updateLabel(lineId.lineId, result.data.data)
                  port.data = { type: result.data.type, data: result.data.data }
                  break
                default:
                  that.line.deleteLine(lineId.lineId)
                  if(result.to) {
                    port.to = result.to
                    that.createNewLine(node, port, port._id, result.to, result, true)
                    return
                  }
                  that.createNewElementConnectLine(node, port, result, currentNode)
              }
            }
            if(!lineId)
              that.createNewLine(node, port, port._id, result.to, result, true)
        }
      }
    })
  }

  createNewElementConnectLine = (node: NodeModel, port: PortModel, result: PortDialogModel, currentNode: HTMLElement): void => {
    const that = this
    const _id: string = that.randomString()
    this.createNewElement(_id, 'Element' + (that.nodesArray.length + 1))
    setTimeout(() => {
      let newNode = document.getElementById(_id)
      that.createNewNode(newNode, currentNode)
      setTimeout(() => {
        that.createNewLine(node, port, port._id, _id, result, false)
      }, 500)
    })
  }

  createNewNode = (newNode: HTMLElement, currentNode: HTMLElement): void => {
    let top = (currentNode.style.top.length > 0 ? parseInt(currentNode.style.top.replace('px', '')) : 0)
    let left = (currentNode.style.left.length > 0 ? parseInt(currentNode.style.left.replace('px', '')) : 0)
    if(!currentNode.style.transform) {
      newNode.style.left = (currentNode.offsetLeft + left + 250) + 'px'
      newNode.style.top = (currentNode.offsetTop + top) + 'px'
    }
    if(currentNode.style.transform) {
      let tranform = currentNode.style.transform
      let position = tranform.replace('translate3d(', '').replace(')', '').replace(/ /g, '').replace(/px/g, '').split(',')
      newNode.style.left = (parseInt(position[0]) + 250 + left) + 'px'
      newNode.style.top = (parseInt(position[1]) + top) + 'px'
    }
  }

  createNewLine = (node: NodeModel, port: PortModel, startId: string, endId: string, result: PortDialogModel, old: boolean): void => {
    let line = this.line.createLine(document.getElementById(startId), document.getElementById(endId), result.data.data, old)
    port.to = endId
    port.data = { type: result.data.type, data: result.data.data }
    node.line.push({ portId: port._id, lineId: line})
    this.nodesArray[this.nodesArray.findIndex(n => n._id === endId)].line.push({ portId: port._id, lineId: line})
  }

  deleteLine = (node: NodeModel, port: PortModel, _id: string): void => {
    node.line.some((line, index, lines) => {
      if(line.portId === _id) {
        this.line.deleteLine(line.lineId)
        lines.splice(index, 1)
        return true
      }
    })
    const childIndex = this.nodesArray.findIndex(n => n._id === port.to)
    if(childIndex !== -1) {
      this.nodesArray[childIndex].line = this.nodesArray[childIndex].line.filter( cl => cl.portId !== _id)
      port.data = { type: '', data: '' }
      port.to = undefined
    }
  }

  saveModel = (): void => {
    const dialogRef = this.dialog.open(ShowModelComponent, {
      width: '700px',
      data: this.nodesArray,
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    })
  }

  inputTricker = ($e: KeyboardEvent, list: Array<string>, index: number): void => {
    if($e.keyCode === 13 && (index + 1) === list.length)
      list.push('')
    if($e.keyCode === 8 && list[index].length === 0 && list.length > 1) {
      list.splice(index, 1)
    }
  }

  randomString = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  indexTracker(index: number, value: any) {
    return index;
  }
}
export interface NodeElementModel {
  _id: string,
  name: string
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
