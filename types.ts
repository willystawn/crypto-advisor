export interface Recommendation {
  frequency: "Daily" | "Weekly" | "Bi-Weekly" | "Monthly" | "One-Time" | "As Needed";
  actions: string[];
  reasoning: string[];
}
