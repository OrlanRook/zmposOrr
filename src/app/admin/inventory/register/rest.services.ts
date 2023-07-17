import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class RestService {

  constructor(private http: HttpClient) { }

  public get(url:string){
    return this.http.get(url); // GET  
  }

  public post(url:string, body:any){
    return this.http.post(url,body); // POST  
  }
}