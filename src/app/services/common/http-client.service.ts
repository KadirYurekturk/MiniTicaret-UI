import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("API_URL") private apiUrl: string) { }


  private url(request: Partial<RequestParameters>): string {
    return `${request.fullEndPoint ? request.fullEndPoint :
      `${request.apiUrl ? request.apiUrl : this.apiUrl}${request.controller}${request.action ? `/${request.action}` : ""}`}`;
  }
  get<T>(request: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";
    url = `${this.url(request)}${id ? `/${id}` : ""}${request.queryString ? `?${request.queryString}` : ""}`;
    return this.httpClient.get<T>(url, { headers: request.headers });
  }
  post<T>(request: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    url = `${this.url(request)}${request.queryString ? `?${request.queryString}` : ""}`;
    return this.httpClient.post<T>(url, body, { headers: request.headers });
  }
  put<T>(request: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    url = `${this.url(request)}${request.queryString ? `?${request.queryString}` : ""}`;
    return this.httpClient.put<T>(url, body, { headers: request.headers });
  }
  delete<T>(request: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = "";
    url = `${this.url(request)}/${id}${request.queryString ? `?${request.queryString}` : ""}`;
    return this.httpClient.delete<T>(url, { headers: request.headers });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;
  
  headers?: HttpHeaders;
  apiUrl?: string;
  fullEndPoint?: string;  
}
