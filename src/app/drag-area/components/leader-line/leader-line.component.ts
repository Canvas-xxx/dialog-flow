import { Component, OnInit } from '@angular/core';
declare var LeaderLine: any
import '../../../../../node_modules/leader-line/leader-line.min.js'

@Component({
  selector: 'app-leader-line',
  templateUrl: './leader-line.component.html',
  styleUrls: ['./leader-line.component.css']
})
export class LeaderLineComponent implements OnInit {

  lineArray: Array<LineModel> = []

  constructor() { }

  ngOnInit() {
  }

  createLine = (start: Element, end: Element, label: string, old: boolean): string => {
    let line: any
    switch(old) {
      case true:
        line = this.oldBox(start, end, label)
        break
      default:
        line = this.newBox(start, end, label)
    }
    this.lineArray.push({
      _id: this.randomString(),
      line: line
    })
    const lineList = Array.from(document.querySelectorAll('.leader-line'))
    lineList.forEach(l => {
      document.querySelector('.line-container').appendChild(l)
    })
    return this.lineArray[this.lineArray.length - 1]._id
  }

  newBox = (start: Element, end: Element, label: string): any => {
    let line = new LeaderLine(LeaderLine.pointAnchor({ element: start, x: 20 }), end, { middleLabel: label })
    line.setOptions({ startSocket: 'right', endSocket: 'left' })
    line.startSocketGravity = 100
    return line
  }
  oldBox = (start: Element, end: Element, label: string): any => {
    let line = new LeaderLine(LeaderLine.pointAnchor({ element: start, x: 20 }), end, { middleLabel: label })
    line.setOptions({ startSocket: 'right', endSocket: 'bottom' })
    line.startSocketGravity = [400, 150]
    line.endSocketGravity = [-100, 150]
    return line
  }

  updatePosition = (_id: string): void => {
    this.lineArray.filter(l => {
      if(l._id === _id) {
        l.line.position()
        return l._id
      }
    })
  }

  updateLabel = (_id: string, text: string): void => {
    this.lineArray.filter(l => {
      if(l._id === _id) {
        l.line.middleLabel = text
      }
    })
  }

  deleteLine = (_id: string): void => {
    let lineList = Array.from(document.querySelectorAll('.leader-line'))
    lineList.forEach(l => {
      document.querySelector('body').appendChild(l)
    })
    this.lineArray.forEach((line, index, lines) => {
      if(line._id === _id) {
        line.line.remove()
        lines.splice(index, 1)
      }
    })
    lineList = Array.from(document.querySelectorAll('.leader-line'))
    lineList.forEach(l => {
      document.querySelector('.line-container').appendChild(l)
    })
  }

  randomString = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

}
export interface LineModel {
  _id: string,
  line: any
}
