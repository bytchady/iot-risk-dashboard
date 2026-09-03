export interface RiskScoreClassificationSummary {
  label: string;
  color: string;
}

export interface DeviceRiskScore {
  id_device: string;
  raw_score: number;
  normalized_score: number;
  classification: RiskScoreClassificationSummary;
}

export interface RiskScoreHistoryEntry {
  raw_score: number;
  normalized_score: number;
  classification: string;
  computed_at: string;
}