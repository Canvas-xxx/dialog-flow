import { Injectable } from '@angular/core';
import { NodeListModel, EdgeListModel } from '../components/show-model/show-model.component'

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }

  convertToInsertDialogFormat = (name: string, nodes: Array<NodeListModel>, edges: Array<EdgeListModel>): InsertDialogModel => {
    return {
      dialogname: name,
      edgelist: edges,
      nodelist: nodes
    }
  }
}
interface InsertDialogModel {
  dialogname: string,
  edgelist: Array<EdgeListModel>,
  nodelist: Array<NodeListModel>
}
