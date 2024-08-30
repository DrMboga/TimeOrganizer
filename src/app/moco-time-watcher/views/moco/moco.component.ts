import { Component, OnInit } from '@angular/core';
import { MocoPersistenceService } from '../../services/moco-persistence.service';
import { MocoService } from '../../services/moco.service';
import { MocoSettingsComponent } from '../../components/moco-settings/moco-settings.component';

@Component({
  selector: 'app-moco',
  standalone: true,
  imports: [MocoSettingsComponent],
  templateUrl: './moco.component.html',
  styleUrl: './moco.component.css',
})
export class MocoComponent implements OnInit {
  public mocoSettings = this.mocoPersistenceService.mocoSettings;
  public mocoActivities = this.mocoService.activities;

  constructor(
    private mocoPersistenceService: MocoPersistenceService,
    private mocoService: MocoService,
  ) {}

  ngOnInit(): void {
    this.mocoService.pullActivities.set(new Date());
  }
}
