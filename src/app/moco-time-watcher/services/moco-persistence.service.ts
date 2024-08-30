import { Injectable, signal } from '@angular/core';
import { MocoSettings } from '../model';

const MOCO_LOCAL_STORAGE_KEY = 'moco-settings';

@Injectable({
  providedIn: 'root',
})
export class MocoPersistenceService {
  public mocoSettings = signal<MocoSettings | undefined>(undefined);

  constructor() {
    const settings: MocoSettings | undefined =
      JSON.parse(localStorage.getItem(MOCO_LOCAL_STORAGE_KEY) ?? '{}') ?? undefined;
    this.mocoSettings.set(settings);
  }

  public saveSettings(settings: MocoSettings): void {
    localStorage.setItem(MOCO_LOCAL_STORAGE_KEY, JSON.stringify(settings));
    this.mocoSettings.set(settings);
  }
}
