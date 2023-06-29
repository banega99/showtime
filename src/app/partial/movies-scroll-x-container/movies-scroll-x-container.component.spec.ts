import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesScrollXContainerComponent } from './movies-scroll-x-container.component';

describe('MoviesScrollXContainerComponent', () => {
  let component: MoviesScrollXContainerComponent;
  let fixture: ComponentFixture<MoviesScrollXContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesScrollXContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesScrollXContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
