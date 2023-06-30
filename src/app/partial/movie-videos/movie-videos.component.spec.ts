import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieVideosComponent } from './movie-videos.component';

describe('MovieVideosComponent', () => {
  let component: MovieVideosComponent;
  let fixture: ComponentFixture<MovieVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
