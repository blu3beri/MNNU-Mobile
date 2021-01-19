import { Proof } from "./proof.model";

export interface Connection {
  routing_state: string;
  state: string;
  created_at: string;
  their_label: string;
  accept: string;
  invitation_mode: string;
  initiator: string;
  connection_id: string;
  request_id: string;
  invitation_key: string;
  their_did: string;
  updated_at: string;
  alias: string;
  my_did: string;
  proof?: Proof;
}
