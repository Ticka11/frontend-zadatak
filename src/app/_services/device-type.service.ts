import { DeviceType } from './../_models/deviceType.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {
  baseUrl = environment.apiUrl;
  deviceTypes = new BehaviorSubject<DeviceType[]>(null);

  currentDeviceTypes = this.deviceTypes.asObservable();

  sendDeviceTypes(deviceTypes: DeviceType[]) {
    this.deviceTypes.next(deviceTypes);
  }

  constructor(private http: HttpClient) { }

  getDeviceTypes(): Observable<DeviceType[]> {
    return this.http.get<DeviceType[]>(this.baseUrl + 'deviceTypes');
  }

  getDeviceType(id: number): Observable<DeviceType> {
    return this.http.get<DeviceType>(this.baseUrl + 'deviceTypes/' + id);
  }
  createOrUpdateDeviceType(deviceType: DeviceType) {
    return this.http.post<DeviceType>(this.baseUrl + 'deviceTypes', deviceType);
  }
  deleteDeviceType(id: number) {
    return this.http.delete(this.baseUrl + 'deviceTypes/' + id);
  }

}