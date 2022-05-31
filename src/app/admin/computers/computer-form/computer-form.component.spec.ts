import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerFormComponent } from './computer-form.component';

describe('ComputerFormComponent', () => {
  let component: ComputerFormComponent;
  let fixture: ComponentFixture<ComputerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
