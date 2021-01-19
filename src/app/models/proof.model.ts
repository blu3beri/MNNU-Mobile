export interface Proof {
  connection_id: string;
  created_at: string;
  initiator: string;
  presentation: {
    identifiers: {
      cred_def_id: string;
      rev_reg_id?: string;
      schema_id: string;
      timestamp?: string;
    }[];
    proof: {
      aggregated_proof: {
        c_hash: string;
        c_list: [];
      };
      proofs: {
        non_revoc_proof?: string;
        primary_proof: {
          eq_proof: {
            revealed_attrs: {};
            a_prime: string;
            e: string;
            m: {
              master_secret: string;
            };
            m2: string;
            v: string;
          };
          ge_proof: [];
        };
        presentation_exhange_id: string;
        presentation_request: {
          name: string;
          nonce: string;
          requested_attributes: {};
          requested_predicated: {};
        };
        role: string;
        state: string;
        thread_id: string;
        trace: boolean;
        updated_at: string;
      }[];
    };
    requested_proof: {
      predicated: {};
      revealed_attrs: {};
      self_attested_attrs: {};
      unrevealed_attrs: {};
    };
  };
  presentation_exchange_id: string;
  presentation_request: {
    name: string;
    nonce: string;
    requested_attributes: {};
    requested_predicated: {};
  };
  role: string;
  state: string;
  thread_id: string;
  trace: boolean;
  updated_at: string;
}
