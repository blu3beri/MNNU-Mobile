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
    connections: {
      connections: "/connections",
      receiveInvitation: "/connections/receive-invitation",
      createInvitation: "/connections/create-invitation",
    },
    credentials: "/credentials",
    sendPresentation: "/send-presentation",
    issueCredential: {
      send: "/issue-credential/send",
    },
    presentProof: {
      records: "/present-proof/records",
    },
    schema: {
      schemas: "/schemas",
      created: "/schemas/created",
    },
    credentialDefinition: {
      credentialDefinitions: "/credential-definitions",
      created: "/credential-definitions/created",
    },
  };

  apiUrl = environment.ngrokDomain;

  constructor(private http: HttpClient) {}

  postCreateInvitation(alias: string, autoAccept = "false", multiUse = "false", pub = "false") {
    const options = {
      params: {
        alias,
        auto_accept: autoAccept,
        multi_use: multiUse,
        public: pub,
      },
    };

    return this.http
      .post(this.apiUrl + this.endPoints.connections.createInvitation, {}, options)
      .pipe(map((res: any) => res))
      .toPromise();
  }

  getConnections(): Promise<any> {
    return this.http
      .get(this.apiUrl + this.endPoints.connections.connections)
      .pipe(map((res: any) => res.results))
      .toPromise();
  }

  getConnectionById(connectionId: string): Promise<any> {
    return this.http
      .get(this.apiUrl + this.endPoints.connections.connections + "/" + connectionId)
      .pipe(map((res: any) => res))
      .toPromise();
  }

  getCredentials(): Promise<Credential[]> {
    return this.http
      .get(this.apiUrl + this.endPoints.credentials)
      .pipe(map((res: any) => res.results))
      .toPromise();
  }

  getCredentialByName(name: string): Promise<Credential> {
    return this.http
      .get(this.apiUrl + this.endPoints.credentials)
      .pipe(map((res: any) => res.results.find((item: Credential) => item.cred_def_id.split(":")[4] === name)))
      .toPromise();
  }

  postReceiveInvitation(invitation: {}, autoAccept = "true", alias: string): Promise<any> {
    return this.http
      .post(this.apiUrl + this.endPoints.connections.receiveInvitation, invitation, {
        params: { alias, auto_accept: autoAccept },
      })
      .pipe(map((res: any) => res))
      .toPromise();
  }

  getPresentProofRecords() {
    const options = {
      params: {
        state: "request_received",
      },
    };
    return this.http
      .get(this.apiUrl + this.endPoints.presentProof.records, options)
      .pipe(map((res: any) => res.results));
  }

  getCredentialDefinitionByTag(name: string) {
    const options = {
      params: {
        schema_name: name,
      },
    };
    return this.http
      .get(this.apiUrl + this.endPoints.credentialDefinition.created, options)
      .pipe(map((res: any) => res.credential_definition_ids[0]))
      .toPromise();
  }

  getSchemaByName(name: string) {
    const options = {
      params: {
        schema_name: name,
      },
    };
    return this.http
      .get(this.apiUrl + this.endPoints.schema.created, options)
      .pipe(map((res: any) => res.schema_ids[0]))
      .toPromise();
  }

  postPresentation(requestedAttributes = {}, requestedPredicates = {}, selfAttestedAttributes = {}, trace = false) {
    const presentation = {
      requested_attributes: requestedAttributes,
      requested_predicated: requestedPredicates,
      self_attested_attributes: selfAttestedAttributes,
      trace,
    };
    return this.http
      .post(this.apiUrl + this.endPoints.sendPresentation, presentation)
      .pipe(map((res: any) => res.results));
  }

  postSchema(schema: {}): Promise<any> {
    return this.http.post(this.apiUrl + this.endPoints.schema.schemas, schema).toPromise();
  }

  postCredentialDefinition(schema: any): Promise<any> {
    const body = {
      schema_id: schema.schema_id,
      tag: schema.schema.name,
    };

    return this.http.post(this.apiUrl + this.endPoints.credentialDefinition.credentialDefinitions, body).toPromise();
  }

  postCredential(credentialDefinitionId: string, schema: any, connenctionId: string, attributes: {}[], comment = "") {
    const did = credentialDefinitionId.split(":")[0];
    const body = {
      connection_id: connenctionId,
      auto_remove: "false",
      cred_def_id: credentialDefinitionId,
      comment,
      credential_proposal: {
        "@type": "issue-credential/1.0/credential-preview",
        attributes,
      },
      issuer_did: did,
      schema_id: schema.schema_id,
      schema_issuer_did: did,
      schema_name: schema.schema.name,
      schema_version: schema.schema.version,
      trace: "false",
    };

    return this.http
      .post(this.apiUrl + this.endPoints.issueCredential.send, body)
      .pipe(map((res: any) => res))
      .toPromise();
  }

  deleteConnection(connectionId: string) {
    return this.http.delete(this.apiUrl + this.endPoints.connections.connections + "/" + connectionId).toPromise();
  }
}
