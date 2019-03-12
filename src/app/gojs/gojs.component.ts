import { Component, OnInit } from '@angular/core';
import * as go from 'gojs'
import { MatDialog } from '@angular/material'
import { DialogComponent } from './component/dialog/dialog.component'

@Component({
  selector: 'app-gojs',
  templateUrl: './gojs.component.html',
  styleUrls: ['./gojs.component.css']
})
export class GojsComponent implements OnInit {

  $: any
  myDiagram: any
  model: any

  constructor(public dialog: MatDialog) {
    this.$ = go.GraphObject.make
    this.$(go.TextBlock, { text: "Hello World", stroke: "gray" })
    this.$(go.TextBlock, "Hello World", { stroke: "gray" })
  }

  ngOnInit() {
    const that = this
    this.myDiagram = this.$(go.Diagram, 'myDiagramDiv', { layout: this.$(go.TreeLayout, { angle: 90, nodeSpacing: 100, layerSpacing: 100 }), allowMove: false })
    this.model = new go.GraphLinksModel([
      { key: 'Hello' },
      { key: 'World!' }
    ], [
      { from: 'Hello', to: 'World!' }
    ])
    this.myDiagram.nodeTemplate = this.$(go.Node, 'Auto',
      this.$(go.Shape, 'RoundedRectangle', { fill: 'lightYellow', stroke: 'lightgrey' }),
      this.$(go.TextBlock, { margin: 5, editable: true, isMultiline: true }, new go.Binding('text', 'key')),
      {
        selectionAdornmentTemplate:
          this.$(go.Adornment, 'Spot',
            this.$(go.Panel, 'Auto',
              this.$(go.Shape, { fill: null, stroke: 'dodgerblue', strokeWidth: 3 }),
              this.$(go.Placeholder)
            ),
            this.$('Button',
              { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top, click: that.addNodeAndLink },
              this.$(go.TextBlock, 'ADD', { font: "bold 6pt sans-serif" })
            )
          )
      }
    )
    this.myDiagram.linkTemplate = this.$(go.Link, 
      this.$(go.Shape),
        this.$(go.Shape,
          { toArrow: 'Standard' }),
        this.$(go.Panel, 'Horizontal',
          { segmentOffset: new go.Point(0, -20) },
          this.$(go.Panel, 'Auto',
            this.$(go.Shape, 'RoundedRectangle', { fill: 'yellow', stroke: 'grey' }),
            this.$(go.TextBlock, 'Click me')
          ),
          this.$('Button', {
            click: function(e, obj) {
              const dialogRef = that.dialog.open(DialogComponent, {
                width: '250px',
                data: { animal: 'Dog' }
              })
              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
              })
            }
          }, { desiredSize: new go.Size(8, 8) })
        )
    )
    this.myDiagram.model = this.model
  }

  addNodeAndLink = (e, b): void => {
    let node = b.part.adornedPart
    let diagram = node.diagram
    diagram.startTransaction("add node and link")
    let newnode = { key: "New Dialog" }
    diagram.model.addNodeData(newnode)
    diagram.findNodeForData(newnode).location = node.location
    let newlink = { from: node.data.key, to: newnode.key }
    diagram.model.addLinkData(newlink)
    diagram.commitTransaction("add node and link")
  }

}
