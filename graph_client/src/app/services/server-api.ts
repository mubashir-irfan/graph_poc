import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:5555/api'

@Injectable( {
  providedIn: 'root',
})
export class ServerApi {

  constructor(
    private http: HttpClient,
  ) { }

    public get<T>(
      endpointUrl: string,
      payload: any
    ) {
      let reqParams = new HttpParams().set("requestData", JSON.stringify(payload))

      return this.http.get<T>(`${API_URL}/${endpointUrl}`, {
        params: reqParams,
      });
    }
}