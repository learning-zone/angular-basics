import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgRedux } from '@angular-redux/store';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';

import { FavouriteAnimeComponent } from './favourite-anime.component';
import { LIKE_ANIME, DISLIKE_ANIME, DISLIKE_ALL_ANIME } from '../shared/redux/actions';
import { AnimeAppState } from '../shared/redux/store';

describe('FavouriteAnimeComponent', () => {
  let component: FavouriteAnimeComponent;
  let fixture: ComponentFixture<FavouriteAnimeComponent>;
  let mockNgRedux: NgRedux<AnimeAppState>;   

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteAnimeComponent ],
      imports: [ NgReduxTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    MockNgRedux.reset();
    fixture = TestBed.createComponent(FavouriteAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockNgRedux = MockNgRedux.getInstance();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('hitting like button should dispatch LIKE_ANIME action', () => {
    const expectedAction = { type: LIKE_ANIME };

    const spy = spyOn(mockNgRedux, 'dispatch');

    expect(mockNgRedux.dispatch).toHaveBeenCalled();
    expect(mockNgRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

});
