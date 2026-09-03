import { BmsSubsystem } from './subsystem.model';

export interface DeviceType {
  id_device_type: string;
  name: string;
  primary_data_collected: string | null;
  id_subsystem: string;
  subsystem?: BmsSubsystem;
}