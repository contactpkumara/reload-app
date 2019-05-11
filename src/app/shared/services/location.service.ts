import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation(): localLoaction {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationObj: localLoaction = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude
        };
        return locationObj;
      });
    } else {
      console.log('No support for geolocation');
      const locationObj: localLoaction = {
        latitude: 0.00,
        longitude: 0.00,
        altitude: 0.00
      };
      return locationObj;
    }
  }

}

export interface localLoaction {
  latitude: any;
  longitude: any;
  altitude: any;
}
