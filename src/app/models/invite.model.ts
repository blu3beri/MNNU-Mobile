export interface Invite {
  "@type": string;
  "@id": string;
  recipientKeys: string[];
  serviceEndpoint: string;
  label: string;
}
