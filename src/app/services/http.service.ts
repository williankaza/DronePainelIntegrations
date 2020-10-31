import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from "rxjs/operators";

const httpUri = 'uri/'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headerParams: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json"})
  optionParams: HttpParams  = new HttpParams();
  constructor(private http: HttpClient) { }
  
  restore(){
    this.headerParams = new HttpHeaders({ "Content-Type": "application/json"})
    this.optionParams = new HttpParams();
  }

  get(url: string, uri: string = httpUri){
    return this.http.get<any>(httpUri + url, {
      headers: this.headerParams,
      params: this.optionParams
    }).pipe(tap(), catchError(this.showError.bind(this)))
  }

  post(url: string, body: string, uri: string = httpUri){
    return this.http.post<any>(httpUri + url, body, {
      headers: this.headerParams,
      params: this.optionParams
    }).pipe(tap(), catchError(this.showError.bind(this)))
  }

  showError(error: HttpErrorResponse){
    console.error("Erro na requisição: " + error)
  }
}
