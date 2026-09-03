export interface RiskFactor {
  id_factor: string;
  name: string;
}

export interface DeviceFactorScore {
  id_device_factore_score: string;
  rating: number;
  rated_at: string;
  id_device: string;
  id_factor: string;
  factor?: RiskFactor;
}