import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Credential } from "../models/apiResponse.model";

@Injectable({
  providedIn: "root",
})
export class ApiHandlerService {
  endPoints = {
    connections: "connections",
    credentials: "credentials",
    issueCredential: {},
    presentProof: {},
  };

  apiUrl = environment.ngrokDomain;

  constructor(private http: HttpClient) {}

  getConnections(): Observable<[]> {
    return this.http.get(this.apiUrl + this.endPoints.connections).pipe(map((res: any) => res.results));
  }

  getCredentials(): Observable<Credential[]> {
    return this.http.get(this.apiUrl + this.endPoints.credentials).pipe(map((res: any) => res.results));
  }
}
