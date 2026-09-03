import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DeviceService } from '../../../core/services/device.service';
import { Device } from '../../../core/models/device.model';
import { DeviceRiskScore } from '../../../core/models/risk-score.model';
import { forkJoin } from 'rxjs';

interface DeviceWithRisk {
  device: Device;
  risk: DeviceRiskScore | null;
}

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  templateUrl: './device-list.html',
  styleUrl: './device-list.scss'
})
export class DeviceList implements OnInit {
  devicesWithRisk: DeviceWithRisk[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private deviceService: DeviceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        this.loadRiskScores(devices);
      },
      error: (error) => {
        this.error = `Erreur ${error.status}: ${error.message}`;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private loadRiskScores(devices: Device[]) {
    if (devices.length === 0) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    const riskRequests = devices.map(device =>
      this.deviceService.getDeviceRiskScore(device.id_device)
    );

    forkJoin(riskRequests).subscribe({
      next: (risks) => {
        this.devicesWithRisk = devices.map((device, i) => ({
          device,
          risk: risks[i]
        }));

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.devicesWithRisk = devices.map(device => ({
          device,
          risk: null
        }));

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getSeverity(label: string): 'success' | 'warn' | 'danger' {
    switch (label) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warn';
      case 'High':
        return 'danger';
      default:
        return 'warn';
    }
  }
}
