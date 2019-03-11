import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Device } from '../_models/device.model';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDevices(page, itemsPerPage, name?, type?, property?, operator?, price?): Observable<Device[]> {

    let params = new HttpParams();
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);

    if (name != null) {
      params = params.append('name', name);

    }
    if (type != null) {
      params = params.append('type', type);
    }

    if (property != null) {
      params = params.append('propertyValue', property);

    }
    if (price != null && operator != null) {
      params = params.append('compareOperator', operator);
      params = params.append('price', price);

    }
    return this.http.get<Device[]>(this.baseUrl + 'devices', { params: params });
  }

  deleteDevice(id: number) {
    return this.http.delete(this.baseUrl + 'devices/' + id);
  }

  createOrUpdateDevice(device: Device) {
    return this.http.post(this.baseUrl + 'devices', device);
  }

}
