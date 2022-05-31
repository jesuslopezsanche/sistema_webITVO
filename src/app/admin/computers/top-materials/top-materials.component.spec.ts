import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMaterialsComponent } from './top-materials.component';

describe('TopMaterialsComponent', () => {
  let component: TopMaterialsComponent;
  let fixture: ComponentFixture<TopMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
