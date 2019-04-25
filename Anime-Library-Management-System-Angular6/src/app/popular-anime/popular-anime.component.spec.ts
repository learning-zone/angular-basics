import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Anime } from '../shared/interfaces/anime';
import { PopularAnimeComponent } from './popular-anime.component';

import { NgReduxModule } from '@angular-redux/store';
import { Ng2IzitoastService } from 'ng2-izitoast';

describe('PopularAnimeComponent', () => {
  let component: PopularAnimeComponent;
  let fixture: ComponentFixture<PopularAnimeComponent>;
  let dummyAnimes: Array<Anime> = [
    { name: "Test",  episodes: 13, genre: "Drama",  rating: 1, popularity: "Low",      isLiked: false, imageUrl: "" },
    { name: "Test1", episodes: 23, genre: "Action", rating: 2, popularity: "Moderate", isLiked: false, imageUrl: "" },
    { name: "Test2", episodes: 33, genre: "Comedy", rating: 3, popularity: "High",     isLiked: false, imageUrl: "" }
  ];   

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularAnimeComponent ],
      imports: [ NgReduxModule ],
      providers: [ Ng2IzitoastService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have heading as 'Popular Anime Series'`, async(() => {
    expect(component.popularAnimeHeading).toEqual(`Popular Anime Series`);
  }));

  it('sortAnime method should sort animes based on rating', () => {
    expect(component.sortAnime(dummyAnimes)[0].rating).toEqual(3, 'anime with highest rating first');
    expect(component.sortAnime(dummyAnimes)[1].rating).toEqual(2, 'anime with second highest rating second');
    expect(component.sortAnime(dummyAnimes)[2].rating).toEqual(1, 'anime with lowest rating last');
  });

  it('sliceAnime method should return sliced animes between array positions', () => {
    expect(component.sliceAnime(dummyAnimes, 2, 3).length).toEqual(1);
    expect(component.sliceAnime(dummyAnimes, 1, 3).length).toEqual(2);
  });

  xit('toggleLike method should toggle anime isLiked', () => {
    expect(dummyAnimes[0].isLiked).toBe(false, 'not liked first');
    component.toggleLike(dummyAnimes[0]);
    expect(dummyAnimes[0].isLiked).toBe(true, 'liked after click');
    component.toggleLike(dummyAnimes[0]);
    expect(dummyAnimes[0].isLiked).toBe(false, 'unliked after second click');
  }); 

});
