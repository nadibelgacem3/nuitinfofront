import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SauveteurComponent } from './sauveteur.component';

describe('SauveteurComponent', () => {
  let component: SauveteurComponent;
  let fixture: ComponentFixture<SauveteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SauveteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SauveteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
