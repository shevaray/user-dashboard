import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalStorageItem(key: string){
    return JSON.parse(localStorage.getItem(key)!);
  }

  setLocalStorageItem(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
