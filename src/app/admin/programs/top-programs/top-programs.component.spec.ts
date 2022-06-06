import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProgramsComponent } from './top-programs.component';

describe('TopProgramsComponent', () => {
  let component: TopProgramsComponent;
  let fixture: ComponentFixture<TopProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
