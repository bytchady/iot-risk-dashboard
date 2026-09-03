import { injectQuery as __vite__injectQuery } from "/@vite/client";import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/main.js");var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/main.ts
import { bootstrapApplication } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_platform-browser.js?v=05c9e3a0";

// src/app/features/devices/device-list/device-list.ts
import { Component } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_core.js?v=05c9e3a0";
import { CommonModule } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_common.js?v=05c9e3a0";
import { TableModule } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/primeng_table.js?v=05c9e3a0";
import { TagModule } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/primeng_tag.js?v=05c9e3a0";
import { forkJoin } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/rxjs.js?v=05c9e3a0";
import * as i03 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_core.js?v=05c9e3a0";

// src/app/core/services/device.service.ts
var device_service_exports = {};
__export(device_service_exports, {
  DeviceService: () => DeviceService
});
import { Injectable as Injectable2 } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_core.js?v=05c9e3a0";
import * as i02 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_core.js?v=05c9e3a0";

// src/app/core/services/api.service.ts
import { Injectable } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_core.js?v=05c9e3a0";
import * as i0 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_core.js?v=05c9e3a0";
import * as i1 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_common_http.js?v=05c9e3a0";
var ApiService = class _ApiService {
  constructor(http) {
    this.http = http;
  }
  http;
  baseUrl = "/api";
  get(endpoint) {
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }
  post(endpoint, body) {
    return this.http.post(`${this.baseUrl}${endpoint}`, body);
  }
  static \u0275fac = function ApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiService)(i0.\u0275\u0275inject(i1.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: i1.HttpClient }], null);
})();

// src/app/core/services/device.service.ts
var DeviceService = class _DeviceService {
  constructor(api) {
    this.api = api;
  }
  api;
  getDevices() {
    return this.api.get("/devices");
  }
  getDevice(id) {
    return this.api.get(`/devices/${id}`);
  }
  createDevice(device) {
    return this.api.post("/devices", device);
  }
  getDeviceRiskScore(id) {
    return this.api.get(`/devices/${id}/risk-score`);
  }
  saveDeviceRiskScore(id) {
    return this.api.post(`/devices/${id}/risk-score`, {});
  }
  getDeviceRiskHistory(id) {
    return this.api.get(`/devices/${id}/risk-score/history`);
  }
  static \u0275fac = function DeviceService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeviceService)(i02.\u0275\u0275inject(ApiService));
  };
  static \u0275prov = /* @__PURE__ */ i02.\u0275\u0275defineInjectable({ token: _DeviceService, factory: _DeviceService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassMetadata(DeviceService, [{
    type: Injectable2,
    args: [{ providedIn: "root" }]
  }], () => [{ type: ApiService }], null);
})();

// src/app/features/devices/device-list/device-list.ts
import * as i2 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_common.js?v=05c9e3a0";
import * as i3 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/primeng_table.js?v=05c9e3a0";
import * as i4 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/primeng_api.js?v=05c9e3a0";
import * as i5 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/primeng_scroller.js?v=05c9e3a0";
import * as i6 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/primeng_tag.js?v=05c9e3a0";
var DeviceList = class _DeviceList {
  constructor(deviceService) {
    this.deviceService = deviceService;
  }
  deviceService;
  devicesWithRisk = [];
  loading = true;
  error = null;
  ngOnInit() {
    console.log("\u{1F525}\u{1F525}\u{1F525} VERSION TEST 123 \u{1F525}\u{1F525}\u{1F525}");
    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        console.log("DEVICES RECEIVED:", devices);
        console.log("NUMBER OF DEVICES:", devices.length);
        this.loadRiskScores(devices);
      },
      error: (error) => {
        console.error("========== DEVICES ERROR ==========");
        console.error("STATUS:", error.status);
        console.error("STATUS TEXT:", error.statusText);
        console.error("URL:", error.url);
        console.error("ERROR:", error.error);
        console.error("MESSAGE:", error.message);
        console.error("FULL ERROR:", error);
        console.error("===================================");
        this.error = `Erreur ${error.status}: ${error.message}`;
        this.loading = false;
      }
    });
  }
  loadRiskScores(devices) {
    if (devices.length === 0) {
      this.loading = false;
      return;
    }
    const riskRequests = devices.map((device) => {
      console.log("\u27A1\uFE0F RISK REQUEST:", device.id_device);
      return this.deviceService.getDeviceRiskScore(device.id_device);
    });
    console.log("\u27A1\uFE0F FORKJOIN START");
    forkJoin(riskRequests).subscribe({
      next: (risks) => {
        console.log("\u2705 FORKJOIN NEXT");
        console.log("RISKS RECEIVED:", risks);
        this.devicesWithRisk = devices.map((device, i) => ({
          device,
          risk: risks[i]
        }));
        console.log("DEVICES WITH RISK:", this.devicesWithRisk);
        this.loading = false;
        console.log("\u{1F534} LOADING =", this.loading);
      },
      error: (error) => {
        console.error("\u274C FORKJOIN ERROR:", error);
        this.devicesWithRisk = devices.map((device) => ({
          device,
          risk: null
        }));
        this.loading = false;
        console.log("\u{1F534} LOADING =", this.loading);
      },
      complete: () => {
        console.log("\u2705 FORKJOIN COMPLETE");
      }
    });
  }
  // PrimeNG p-tag attend une "severity" (success/warn/danger...), pas une couleur CSS brute
  getSeverity(label) {
    switch (label) {
      case "Low":
        return "success";
      case "Medium":
        return "warn";
      case "High":
        return "danger";
      default:
        return "warn";
    }
  }
  static \u0275fac = function DeviceList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeviceList)(i03.\u0275\u0275directiveInject(DeviceService));
  };
  static \u0275cmp = /* @__PURE__ */ i03.\u0275\u0275defineComponent({ type: _DeviceList, selectors: [["app-device-list"]], decls: 2, vars: 0, template: function DeviceList_Template(rf, ctx) {
    if (rf & 1) {
      i03.\u0275\u0275elementStart(0, "h1");
      i03.\u0275\u0275text(1, "TEST COMPLET 987654");
      i03.\u0275\u0275elementEnd();
    }
  }, dependencies: [CommonModule, i2.NgClass, i2.NgComponentOutlet, i2.NgForOf, i2.NgIf, i2.NgTemplateOutlet, i2.NgStyle, i2.NgSwitch, i2.NgSwitchCase, i2.NgSwitchDefault, i2.NgPlural, i2.NgPluralCase, TableModule, i3.Table, i4.Header, i4.Footer, i4.PrimeTemplate, i3.SortableColumn, i3.FrozenColumn, i3.RowGroupHeader, i3.SelectableRow, i3.RowToggler, i3.ContextMenuRow, i3.ResizableColumn, i3.ReorderableColumn, i3.EditableColumn, i3.CellEditor, i3.SortIcon, i3.TableRadioButton, i3.TableCheckbox, i3.TableHeaderCheckbox, i3.ReorderableRowHandle, i3.ReorderableRow, i3.SelectableRowDblClick, i3.EditableRow, i3.InitEditableRow, i3.SaveEditableRow, i3.CancelEditableRow, i3.ColumnFilter, i3.ColumnFilterFormElement, i5.Scroller, TagModule, i6.Tag, i2.AsyncPipe, i2.UpperCasePipe, i2.LowerCasePipe, i2.JsonPipe, i2.SlicePipe, i2.DecimalPipe, i2.PercentPipe, i2.TitleCasePipe, i2.CurrencyPipe, i2.DatePipe, i2.I18nPluralPipe, i2.I18nSelectPipe, i2.KeyValuePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassMetadata(DeviceList, [{
    type: Component,
    args: [{ selector: "app-device-list", standalone: true, imports: [CommonModule, TableModule, TagModule], template: "<h1>TEST COMPLET 987654</h1>" }]
  }], () => [{ type: DeviceService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassDebugInfo(DeviceList, { className: "DeviceList", filePath: "src/app/features/devices/device-list/device-list.ts", lineNumber: 22 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fdevices%2Fdevice-list%2Fdevice-list.ts%40DeviceList";
  function DeviceList_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i03.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i03.\u0275\u0275replaceMetadata(DeviceList, m.default, [i03, i2, i3, i4, i5, i6, device_service_exports], [CommonModule, TableModule, TagModule, Component], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && DeviceList_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && DeviceList_HmrLoad(d.timestamp)));
})();

// src/app/app.routes.ts
var routes = [
  { path: "devices", component: DeviceList },
  { path: "", redirectTo: "devices", pathMatch: "full" }
];

// src/app/app.config.ts
import { provideHttpClient } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_common_http.js?v=05c9e3a0";
import { providePrimeNG } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/primeng_config.js?v=05c9e3a0";
import Aura from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@primeuix_themes_aura.js?v=05c9e3a0";
import { provideRouter } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_router.js?v=05c9e3a0";
var appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
    // ... vos autres providers existants
  ]
};

// src/app/app.ts
import { Component as Component2 } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_core.js?v=05c9e3a0";
import { RouterOutlet } from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_router.js?v=05c9e3a0";
import * as i04 from "/@fs/app/.angular/cache/22.1.6/dashboard-frontend/vite/deps/@angular_core.js?v=05c9e3a0";
var App = class _App {
  title = "dashboard-frontend";
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ i04.\u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      i04.\u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassMetadata(App, [{
    type: Component2,
    args: [{ selector: "app-root", standalone: true, imports: [RouterOutlet], template: "<router-outlet />" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 11 });
})();
(() => {
  const id = "src%2Fapp%2Fapp.ts%40App";
  function App_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i04.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i04.\u0275\u0275replaceMetadata(App, m.default, [i04], [RouterOutlet, Component2], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && App_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && App_HmrLoad(d.timestamp)));
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# debugId=c365ccfd-986e-5751-818e-a06373abdf1e


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tYWluLnRzIiwic3JjL2FwcC9mZWF0dXJlcy9kZXZpY2VzL2RldmljZS1saXN0L2RldmljZS1saXN0LnRzIiwic3JjL2FwcC9mZWF0dXJlcy9kZXZpY2VzL2RldmljZS1saXN0L2RldmljZS1saXN0Lmh0bWwiLCJzcmMvYXBwL2NvcmUvc2VydmljZXMvZGV2aWNlLnNlcnZpY2UudHMiLCJzcmMvYXBwL2NvcmUvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiLCJzcmMvYXBwL2FwcC5yb3V0ZXMudHMiLCJzcmMvYXBwL2FwcC5jb25maWcudHMiLCJzcmMvYXBwL2FwcC50cyIsInNyYy9hcHAvYXBwLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdHN0cmFwQXBwbGljYXRpb24gfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGFwcENvbmZpZyB9IGZyb20gJy4vYXBwL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAvYXBwJztcblxuYm9vdHN0cmFwQXBwbGljYXRpb24oQXBwLCBhcHBDb25maWcpXG4gIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUYWJsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdGFibGUnO1xuaW1wb3J0IHsgVGFnTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90YWcnO1xuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvZGV2aWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGV2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvZGV2aWNlLm1vZGVsJztcbmltcG9ydCB7IERldmljZVJpc2tTY29yZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL3Jpc2stc2NvcmUubW9kZWwnO1xuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcblxuaW50ZXJmYWNlIERldmljZVdpdGhSaXNrIHtcbiAgZGV2aWNlOiBEZXZpY2U7XG4gIHJpc2s6IERldmljZVJpc2tTY29yZSB8IG51bGw7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kZXZpY2UtbGlzdCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFRhYmxlTW9kdWxlLCBUYWdNb2R1bGVdLFxuICB0ZW1wbGF0ZVVybDogJy4vZGV2aWNlLWxpc3QuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9kZXZpY2UtbGlzdC5zY3NzJ1xufSlcbmV4cG9ydCBjbGFzcyBEZXZpY2VMaXN0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZGV2aWNlc1dpdGhSaXNrOiBEZXZpY2VXaXRoUmlza1tdID0gW107XG4gIGxvYWRpbmcgPSB0cnVlO1xuICBlcnJvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZXZpY2VTZXJ2aWNlOiBEZXZpY2VTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnNvbGUubG9nKCfwn5Sl8J+UpfCflKUgVkVSU0lPTiBURVNUIDEyMyDwn5Sl8J+UpfCflKUnKTtcblxuICAgIHRoaXMuZGV2aWNlU2VydmljZS5nZXREZXZpY2VzKCkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChkZXZpY2VzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdERVZJQ0VTIFJFQ0VJVkVEOicsIGRldmljZXMpO1xuICAgICAgICBjb25zb2xlLmxvZygnTlVNQkVSIE9GIERFVklDRVM6JywgZGV2aWNlcy5sZW5ndGgpO1xuXG4gICAgICAgIHRoaXMubG9hZFJpc2tTY29yZXMoZGV2aWNlcyk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCc9PT09PT09PT09IERFVklDRVMgRVJST1IgPT09PT09PT09PScpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTVEFUVVM6JywgZXJyb3Iuc3RhdHVzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignU1RBVFVTIFRFWFQ6JywgZXJyb3Iuc3RhdHVzVGV4dCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VSTDonLCBlcnJvci51cmwpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjonLCBlcnJvci5lcnJvcik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01FU1NBR0U6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZVTEwgRVJST1I6JywgZXJyb3IpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCc9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuXG4gICAgICAgIHRoaXMuZXJyb3IgPSBgRXJyZXVyICR7ZXJyb3Iuc3RhdHVzfTogJHtlcnJvci5tZXNzYWdlfWA7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUmlza1Njb3JlcyhkZXZpY2VzOiBEZXZpY2VbXSkge1xuICAgIGlmIChkZXZpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgcmlza1JlcXVlc3RzID0gZGV2aWNlcy5tYXAoZGV2aWNlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCfinqHvuI8gUklTSyBSRVFVRVNUOicsIGRldmljZS5pZF9kZXZpY2UpO1xuXG4gICAgICByZXR1cm4gdGhpcy5kZXZpY2VTZXJ2aWNlLmdldERldmljZVJpc2tTY29yZShkZXZpY2UuaWRfZGV2aWNlKTtcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKCfinqHvuI8gRk9SS0pPSU4gU1RBUlQnKTtcblxuICAgIGZvcmtKb2luKHJpc2tSZXF1ZXN0cykuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChyaXNrcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn4pyFIEZPUktKT0lOIE5FWFQnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1JJU0tTIFJFQ0VJVkVEOicsIHJpc2tzKTtcblxuICAgICAgICB0aGlzLmRldmljZXNXaXRoUmlzayA9IGRldmljZXMubWFwKChkZXZpY2UsIGkpID0+ICh7XG4gICAgICAgICAgZGV2aWNlLFxuICAgICAgICAgIHJpc2s6IHJpc2tzW2ldXG4gICAgICAgIH0pKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnREVWSUNFUyBXSVRIIFJJU0s6JywgdGhpcy5kZXZpY2VzV2l0aFJpc2spO1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5S0IExPQURJTkcgPScsIHRoaXMubG9hZGluZyk7XG4gICAgICB9LFxuXG4gICAgICBlcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBGT1JLSk9JTiBFUlJPUjonLCBlcnJvcik7XG5cbiAgICAgICAgdGhpcy5kZXZpY2VzV2l0aFJpc2sgPSBkZXZpY2VzLm1hcChkZXZpY2UgPT4gKHtcbiAgICAgICAgICBkZXZpY2UsXG4gICAgICAgICAgcmlzazogbnVsbFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ/CflLQgTE9BRElORyA9JywgdGhpcy5sb2FkaW5nKTtcbiAgICAgIH0sXG5cbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfinIUgRk9SS0pPSU4gQ09NUExFVEUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFByaW1lTkcgcC10YWcgYXR0ZW5kIHVuZSBcInNldmVyaXR5XCIgKHN1Y2Nlc3Mvd2Fybi9kYW5nZXIuLi4pLCBwYXMgdW5lIGNvdWxldXIgQ1NTIGJydXRlXG4gIGdldFNldmVyaXR5KGxhYmVsOiBzdHJpbmcpOiAnc3VjY2VzcycgfCAnd2FybicgfCAnZGFuZ2VyJyB7XG4gICAgc3dpdGNoIChsYWJlbCkge1xuICAgICAgY2FzZSAnTG93JzogcmV0dXJuICdzdWNjZXNzJztcbiAgICAgIGNhc2UgJ01lZGl1bSc6IHJldHVybiAnd2Fybic7XG4gICAgICBjYXNlICdIaWdoJzogcmV0dXJuICdkYW5nZXInO1xuICAgICAgZGVmYXVsdDogcmV0dXJuICd3YXJuJztcbiAgICB9XG4gIH1cbn0iLCI8aDE+VEVTVCBDT01QTEVUIDk4NzY1NDwvaDE+IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9hcGkuc2VydmljZSc7XHJcbmltcG9ydCB7IERldmljZSB9IGZyb20gJy4uL21vZGVscy9kZXZpY2UubW9kZWwnO1xyXG5pbXBvcnQgeyBEZXZpY2VSaXNrU2NvcmUsIFJpc2tTY29yZUhpc3RvcnlFbnRyeSB9IGZyb20gJy4uL21vZGVscy9yaXNrLXNjb3JlLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBEZXZpY2VTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSkge31cclxuXHJcbiAgZ2V0RGV2aWNlcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8RGV2aWNlW10+KCcvZGV2aWNlcycpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGV2aWNlKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8RGV2aWNlPihgL2RldmljZXMvJHtpZH1gKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURldmljZShkZXZpY2U6IFBhcnRpYWw8RGV2aWNlPikge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8RGV2aWNlPignL2RldmljZXMnLCBkZXZpY2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGV2aWNlUmlza1Njb3JlKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8RGV2aWNlUmlza1Njb3JlPihgL2RldmljZXMvJHtpZH0vcmlzay1zY29yZWApO1xyXG4gIH1cclxuXHJcbiAgc2F2ZURldmljZVJpc2tTY29yZShpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxEZXZpY2VSaXNrU2NvcmU+KGAvZGV2aWNlcy8ke2lkfS9yaXNrLXNjb3JlYCwge30pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGV2aWNlUmlza0hpc3RvcnkoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxSaXNrU2NvcmVIaXN0b3J5RW50cnlbXT4oYC9kZXZpY2VzLyR7aWR9L3Jpc2stc2NvcmUvaGlzdG9yeWApO1xyXG4gIH1cclxufSIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlIHtcclxuICBwcml2YXRlIGJhc2VVcmwgPSAnL2FwaSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgZ2V0PFQ+KGVuZHBvaW50OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFQ+KGAke3RoaXMuYmFzZVVybH0ke2VuZHBvaW50fWApO1xyXG4gIH1cclxuXHJcbiAgcG9zdDxUPihlbmRwb2ludDogc3RyaW5nLCBib2R5OiB1bmtub3duKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4oYCR7dGhpcy5iYXNlVXJsfSR7ZW5kcG9pbnR9YCwgYm9keSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERldmljZUxpc3QgfSBmcm9tICcuL2ZlYXR1cmVzL2RldmljZXMvZGV2aWNlLWxpc3QvZGV2aWNlLWxpc3QnO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHsgcGF0aDogJ2RldmljZXMnLCBjb21wb25lbnQ6IERldmljZUxpc3QgfSxcbiAgeyBwYXRoOiAnJywgcmVkaXJlY3RUbzogJ2RldmljZXMnLCBwYXRoTWF0Y2g6ICdmdWxsJyB9LFxuXTsiLCJpbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuL2FwcC5yb3V0ZXMnO1xuaW1wb3J0IHsgQXBwbGljYXRpb25Db25maWcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgcHJvdmlkZVByaW1lTkcgfSBmcm9tICdwcmltZW5nL2NvbmZpZyc7XG5pbXBvcnQgQXVyYSBmcm9tICdAcHJpbWV1aXgvdGhlbWVzL2F1cmEnO1xuaW1wb3J0IHsgcHJvdmlkZVJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmV4cG9ydCBjb25zdCBhcHBDb25maWc6IEFwcGxpY2F0aW9uQ29uZmlnID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlUm91dGVyKHJvdXRlcyksXG4gICAgcHJvdmlkZUh0dHBDbGllbnQoKSxcbiAgICBwcm92aWRlUHJpbWVORyh7XG4gICAgICB0aGVtZToge1xuICAgICAgICBwcmVzZXQ6IEF1cmFcbiAgICAgIH1cbiAgICB9KSxcbiAgICAvLyAuLi4gdm9zIGF1dHJlcyBwcm92aWRlcnMgZXhpc3RhbnRzXG4gIF1cbn07IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcm9vdCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtSb3V0ZXJPdXRsZXRdLFxuICB0ZW1wbGF0ZVVybDogJy4vYXBwLmh0bWwnLFxuICBzdHlsZVVybDogJy4vYXBwLnNjc3MnXG59KVxuZXhwb3J0IGNsYXNzIEFwcCB7XG4gIHByb3RlY3RlZCByZWFkb25seSB0aXRsZSA9ICdkYXNoYm9hcmQtZnJvbnRlbmQnO1xufSIsIjxyb3V0ZXItb3V0bGV0IC8+Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsU0FBUyw0QkFBNEI7OztBQ0FyQyxTQUFTLGlCQUF5QjtBQUNsQyxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLG1CQUFtQjtBQUM1QixTQUFTLGlCQUFpQjtBQUkxQixTQUFTLGdCQUFnQjs7OztBRVB6Qjs7OztTQUFTLGNBQUFBLG1CQUFrQjs7OztBQ0EzQixTQUFTLGtCQUFrQjs7O0FBSXJCLElBQU8sYUFBUCxNQUFPLFlBQVU7RUFHckIsWUFBb0IsTUFBZ0I7QUFBaEI7RUFBbUI7RUFBbkI7RUFGWixVQUFVO0VBSWxCLElBQU8sVUFBZ0I7QUFDckIsV0FBTyxLQUFLLEtBQUssSUFBTyxHQUFHLEtBQUssT0FBTyxHQUFHLFFBQVEsRUFBRTtFQUN0RDtFQUVBLEtBQVEsVUFBa0IsTUFBYTtBQUNyQyxXQUFPLEtBQUssS0FBSyxLQUFRLEdBQUcsS0FBSyxPQUFPLEdBQUcsUUFBUSxJQUFJLElBQUk7RUFDN0Q7O3FDQVhXLGFBQVUsc0JBQUEsYUFBQSxDQUFBO0VBQUE7K0VBQVYsYUFBVSxTQUFWLFlBQVUsV0FBQSxZQURHLE9BQU0sQ0FBQTs7OytFQUNuQixZQUFVLENBQUE7VUFEdEI7V0FBVyxFQUFFLFlBQVksT0FBTSxDQUFFOzs7OztBREc1QixJQUFPLGdCQUFQLE1BQU8s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LFlBQVUsWUFDUixNQUFJLFNBQ1AsQ0FBQyxZQUFZLEdBQUMsVUFBQSxvQkFBQSxDQUFBOzs7O2lGQUlaLEtBQUcsRUFBQSxXQUFBLE9BQUEsVUFBQSxrQkFBQSxZQUFBLEdBQUEsQ0FBQTtBQUFBLEdBQUE7Ozs7Ozs7K0RBQUgsS0FBRyxFQUFBLFNBQUEsQ0FBQUMsR0FBQSxHQUFBLENBQUEsY0FBQUQsVUFBQSxHQUFBLGFBQUEsRUFBQSxDQUFBO0VBQUE7QUFBQSxHQUFBLE9BQUEsY0FBQSxlQUFBLGNBQUEsWUFBQSxLQUFBLElBQUEsQ0FBQTtBQUFBLEdBQUEsT0FBQSxjQUFBLGVBQUEsZUFBQSxZQUFBLE9BQUEsWUFBQSxJQUFBLEdBQUEsNEJBQUEsQ0FBQSxNQUFBLEVBQUEsT0FBQSxNQUFBLFlBQUEsRUFBQSxTQUFBLENBQUE7QUFBQSxHQUFBOzs7QVBOaEIscUJBQXFCLEtBQUssU0FBUyxFQUNoQyxNQUFNLENBQUMsUUFBUSxRQUFRLE1BQU0sR0FBRyxDQUFDOyIsIm5hbWVzIjpbIkluamVjdGFibGUiLCJJbmplY3RhYmxlIiwiaTAiLCJDb21wb25lbnQiLCJpMCJdLCJkZWJ1Z0lkIjoiYzM2NWNjZmQtOTg2ZS01NzUxLTgxOGUtYTA2MzczYWJkZjFlIn0=