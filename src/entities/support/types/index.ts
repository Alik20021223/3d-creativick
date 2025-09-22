export type Section =
  | { id: string; title: string; type: "text"; content: string }
  | { id: string; title: string; type: "image"; src: string; caption?: string }
  | { id: string; title: string; type: "quote"; content: string }
  | { id: string; title: string; type: "callout"; content: string }
  | { id: string; title: string; type: "list"; items: string[] };