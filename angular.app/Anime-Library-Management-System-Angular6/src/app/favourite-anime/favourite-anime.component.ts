import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Anime } from '../shared/interfaces/anime';
import { LIKE_ANIME, DISLIKE_ANIME, DISLIKE_ALL_ANIME } from '../shared/redux/actions';
import { AnimeAppState } from '../shared/redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourite-anime',
  templateUrl: './favourite-anime.component.html',
  styleUrls: ['./favourite-anime.component.scss']
})
export class FavouriteAnimeComponent implements OnInit {
  @select() favAnimes$: Observable<any>;

  constructor(private ngRedux: NgRedux<AnimeAppState>) { }

  ngOnInit() {
  }

  likeAnime(): void {
    this.ngRedux.dispatch({type: LIKE_ANIME});
  }

  disLikeAnime(): void {

  }

  clearAllFavouriteAnimes(): void {

  }

}
