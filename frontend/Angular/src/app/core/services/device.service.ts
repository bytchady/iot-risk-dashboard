import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Device } from '../models/device.model';
import { DeviceRiskScore, RiskScoreHistoryEntry } from '../models/risk-score.model';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private api: ApiService) {}

  getDevices() {
    return this.api.get<Device[]>('/devices');
  }

  getDevice(id: string) {
    return this.api.get<Device>(`/devices/${id}`);
  }

  createDevice(device: Partial<Device>) {
    return this.api.post<Device>('/devices', device);
  }

  getDeviceRiskScore(id: string) {
    return this.api.get<DeviceRiskScore>(`/devices/${id}/risk-score`);
  }

  saveDeviceRiskScore(id: string) {
    return this.api.post<DeviceRiskScore>(`/devices/${id}/risk-score`, {});
  }

  getDeviceRiskHistory(id: string) {
    return this.api.get<RiskScoreHistoryEntry[]>(`/devices/${id}/risk-score/history`);
  }
}