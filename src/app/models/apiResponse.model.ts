export interface Credentials {
  results: Credential[];
}

export interface Credential {
  attrs: {};
  cred_def_id: string;
  cred_rev_id?: any;
  referent: string;
  rev_reg_id?: any;
  schema_id: string;
}
