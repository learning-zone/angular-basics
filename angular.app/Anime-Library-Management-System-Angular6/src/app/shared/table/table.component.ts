import { Component, OnInit } from '@angular/core';
import { Anime } from '../interfaces/anime';
import { myAnimeList } from '../mock-data/mock-animes';

import { NgRedux, select } from '@angular-redux/store';
import { AnimeAppState } from '../redux/store';
import { LIKE_ANIME, DISLIKE_ANIME } from '../redux/actions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  isLiked: boolean = false;
  allAnimes: Array<Anime> = myAnimeList;   
  
  constructor(private ngRedux: NgRedux<AnimeAppState>) { }

  ngOnInit() { }
  
  // like / dislike anime
  toggleLike(selectedAnime:Anime) : void {
    selectedAnime.isLiked = !selectedAnime.isLiked;
    if(selectedAnime.isLiked) {
      this.ngRedux.dispatch({type: LIKE_ANIME, anime: selectedAnime});
    } else {
      this.ngRedux.dispatch({type: DISLIKE_ANIME, id: selectedAnime.id});
    }
  }

}
