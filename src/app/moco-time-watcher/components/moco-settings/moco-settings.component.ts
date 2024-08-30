import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MocoPersistenceService } from '../../services/moco-persistence.service';

@Component({
  selector: 'app-moco-settings',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, FormsModule, MatButton],
  templateUrl: './moco-settings.component.html',
  styleUrl: './moco-settings.component.css',
})
export class MocoSettingsComponent {
  public mocoAppBaseAddress: string | undefined = undefined;
  public mocoAppToken: string | undefined = undefined;

  constructor(private mocoSettingsPersistence: MocoPersistenceService) {}

  public save() {
    if (this.mocoAppBaseAddress && this.mocoAppToken) {
      this.mocoSettingsPersistence.saveSettings({
        mocoAppBaseAddress: this.mocoAppBaseAddress,
        apiKey: this.mocoAppToken,
      });
    }
  }
}
