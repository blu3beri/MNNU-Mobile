import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Credential } from "../models/apiResponse.model";
import { Invitation } from "../models/invite.model";

@Injectable({
  providedIn: "root",
})
export class ApiHandlerService {
  endPoints = {
    connections: {
      connections: "/connections",
      receiveInvitation: "/connections/receive-invitation",
      createInvitation: "/connections/create-invitation"
    },
    credentials: "/credentials",
    sendPresentation: "/send-presentation",
    issueCredential: {},
    presentProof: {},
  };

  apiUrl = environment.ngrokDomain;

  constructor(private http: HttpClient) {}

  getConnections(): Observable<[]> {
    return this.http.get(this.apiUrl + this.endPoints.connections.connections).pipe(map((res: any) => res.results));
  }

  getCredentials(): Observable<Credential[]> {
    return this.http.get(this.apiUrl + this.endPoints.credentials).pipe(map((res: any) => res.results));
  }

  getInvitation(): Observable<Invitation> {
    return this.http.get(this.apiUrl + this.endPoints.connections.receiveInvitation).pipe(map((res: any) => res.results));
  }

  postPresentation(requestedAttributes = {}, requestedPredicates = {}, selfAttestedAttributes = {}, trace = false) {
    const presentation = {
      requested_attributes: requestedAttributes,
      requested_predicated: requestedPredicates,
      self_attested_attributes: selfAttestedAttributes,
      trace
    }
    return this.http.post(this.apiUrl + this.endPoints.sendPresentation, presentation).pipe(map((res: any) => res.results));
  }

}
