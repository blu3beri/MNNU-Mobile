import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiHandlerService {
  baseUrl = "http://localhost:7003";

  constructor(private http: HttpClient) {}

  getInvitations(): Observable<any> {
    const body = {
      alias: "test",
      auto_accept: false,
      multi_use: false,
    };
    return this.http.post(this.baseUrl + "/connections/receive-invitations", body).pipe(map((result) => result));
  }
}
