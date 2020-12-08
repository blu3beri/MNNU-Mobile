export interface WsResponse {
  topic: string;
  body: ResInvite;
}

export interface ResInvite {
  accept: string;
  alias: string;
  connection_id: string;
  created_at: string;
  initiator: string;
  invitation_key: string;
  invitation_mode: string;
  routing_state: string;
  state: string;
  updated_at: string;
}
