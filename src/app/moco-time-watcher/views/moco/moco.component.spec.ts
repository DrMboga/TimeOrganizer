import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MocoComponent } from './moco.component';

describe('MocoComponent', () => {
  let component: MocoComponent;
  let fixture: ComponentFixture<MocoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MocoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
