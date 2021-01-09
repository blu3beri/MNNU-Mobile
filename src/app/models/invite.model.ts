export interface Invitation {
  "@type": string;
  "@id": string;
  recipientKeys: string[];
  serviceEndpoint: string;
  label: string;
}
