export interface Credentials {
  results: Credential[];
}

export interface Credential {
  attrs: {};
  cred_def_id: string;
  cred_rev_id?: string;
  referent: string;
  rev_reg_id?: string;
  schema_id: string;
}
