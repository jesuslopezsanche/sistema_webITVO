import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaNavigationComponent } from './area-navigation.component';

describe('SideNavigationComponent', () => {
  let component: AreaNavigationComponent;
  let fixture: ComponentFixture<AreaNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
