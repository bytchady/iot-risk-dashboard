import { DeviceType } from './device-type.model';

export interface Device {
  id_device: string;
  name: string;
  created_at: string;
  id_device_type: string;
  device_type?: DeviceType;
}