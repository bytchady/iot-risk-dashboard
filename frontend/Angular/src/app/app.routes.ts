import { Routes } from '@angular/router';
import { DeviceList } from './features/devices/device-list/device-list';

export const routes: Routes = [
  { path: 'devices', component: DeviceList },
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
];