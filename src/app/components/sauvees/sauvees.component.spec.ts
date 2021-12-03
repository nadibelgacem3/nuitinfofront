import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SauveesComponent } from './sauvees.component';

describe('SauveesComponent', () => {
  let component: SauveesComponent;
  let fixture: ComponentFixture<SauveesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SauveesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SauveesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
