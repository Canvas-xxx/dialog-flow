import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  constructor( private http: HttpClient ) { }

  postInsertDialog = (body: any): Observable<ResponseHttpModel> => {
    return this.http.post<ResponseHttpModel>('https://botnoidialogapi.herokuapp.com/insertdialog', body)
  }
}
interface ResponseHttpModel {
  status: string
}
