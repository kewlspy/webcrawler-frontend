export interface URLResult {
  ID: number;
  Link: string;
  Title: string;
  HTMLVersion: string;
  InternalLinks: number;
  ExternalLinks: number;
  BrokenLinks: number;
  HasLoginForm: boolean;
  Status: "queued" | "running" | "done" | "error";
  CreatedAt: string;
}
