import { Component } from '@angular/core';
import { MocoPersistenceService } from '../../services/moco-persistence.service';
import { JsonPipe } from '@angular/common';
import { MocoSettingsComponent } from '../../components/moco-settings/moco-settings.component';

@Component({
  selector: 'app-moco',
  standalone: true,
  imports: [JsonPipe, MocoSettingsComponent],
  templateUrl: './moco.component.html',
  styleUrl: './moco.component.css',
})
export class MocoComponent {
  public mocoSettings = this.mocoPersistenceService.mocoSettings;
  constructor(private mocoPersistenceService: MocoPersistenceService) {}
}
