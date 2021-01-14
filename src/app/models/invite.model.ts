export interface Invitation {
  "@type": string;
  "@id": string;
  recipientKeys: string[];
  serviceEndpoint: string;
  label: string;
}

// {"connection_id":"31c8767b-fd3a-4615-9045-b6d3aea4a14b","invitation":{"@type":"did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation","@id":"4d6fd877-4ed3-4070-8ea4-ced146fb9c52","label":"MOBILE_AGENT","serviceEndpoint":"https://dd6fdc55f63e.eu.ngrok.io","recipientKeys":["HZ2HrzoRz8rG1v2zeBYebszKbLJtASAbW5N5AfqR1bqQ"]},"invitation_url":"https://dd6fdc55f63e.eu.ngrok.io?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiNGQ2ZmQ4NzctNGVkMy00MDcwLThlYTQtY2VkMTQ2ZmI5YzUyIiwgImxhYmVsIjogIk1PQklMRV9BR0VOVCIsICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cHM6Ly9kZDZmZGM1NWY2M2UuZXUubmdyb2suaW8iLCAicmVjaXBpZW50S2V5cyI6IFsiSFoySHJ6b1J6OHJHMXYyemVCWWVic3pLYkxKdEFTQWJXNU41QWZxUjFicVEiXX0=","alias":"SELF_CONNECTION"}
