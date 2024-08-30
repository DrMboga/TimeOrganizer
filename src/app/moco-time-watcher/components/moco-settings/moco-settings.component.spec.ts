import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MocoSettingsComponent } from './moco-settings.component';

describe('MocoSettingsComponent', () => {
  let component: MocoSettingsComponent;
  let fixture: ComponentFixture<MocoSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MocoSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MocoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
