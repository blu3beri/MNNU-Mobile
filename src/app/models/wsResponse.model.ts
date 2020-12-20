export interface WsResponse {
  topic: string;
  body: {};
}

export interface ResInvite {
  accept: string;
  alias: string;
  connection_id: string;
  created_at: string;
  initiator: string;
  invitation_key: string;
  my_did?: string;
  request_id?: string;
  invitation_mode: string;
  routing_state: string;
  state: string;
  their_did?: string;
  their_label?: string;
  updated_at: string;
}
