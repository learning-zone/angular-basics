import { Component, OnInit } from '@angular/core';

import { myAnimeList } from '../shared/mock-data/mock-animes';
import { Anime } from '../shared/interfaces/anime';

import { NgRedux, select } from '@angular-redux/store';
import { AnimeAppState } from '../shared/redux/store';
import { LIKE_ANIME, DISLIKE_ANIME } from '../shared/redux/actions';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
  selector: 'app-popular-anime',
  templateUrl: './popular-anime.component.html',
  styleUrls: ['./popular-anime.component.scss']
})
export class PopularAnimeComponent implements OnInit {
  @select() animes;
  popularAnimes: Array<Anime> = myAnimeList;
  popularAnimeHeading: string = 'Popular Anime Series'; 

  constructor(private ngRedux: NgRedux<AnimeAppState>, public iziToast: Ng2IzitoastService) { }

  // sort anime using rating values
  sortAnime(animeList: Array<Anime>) {
    let sortedArray = animeList.sort((anime1: Anime, anime2:Anime) => {
      return anime2.rating - anime1.rating;
    });
    return sortedArray;
  }

  // slice return portion of data from anime list
  sliceAnime(animeList: Array<Anime>, start: number, end: number) {
    return this.sortAnime(animeList).slice(start, end);
  }

  ngOnInit() {
    // show first 12 popular animes based on rating
    this.popularAnimes = this.sliceAnime(this.popularAnimes, 0, 12);
  }

  // like & dislike anime
  toggleLike(selectedAnime:Anime) : void {
    selectedAnime.isLiked = !selectedAnime.isLiked;
    this.iziToast.destroy();
    if(selectedAnime.isLiked) {
      this.ngRedux.dispatch({type: LIKE_ANIME, anime: selectedAnime});
      this.iziToast.show({
        title: "You liked " + selectedAnime.name, 
        message: selectedAnime.name + " anime added to your favourite list.",
        timeout: 3000,
        position: "topCenter",
        close: true,
        backgroundColor: "green",
        icon: "fa fa-thumbs-o-up"
      });
    } else {
      this.ngRedux.dispatch({type: DISLIKE_ANIME, id: selectedAnime.id});
      this.iziToast.show({
        title: "You disliked " + selectedAnime.name, 
        message: selectedAnime.name + " anime removed from your favourite list.",
        timeout: 3000,
        position: "topCenter",
        close: true,
        backgroundColor: "red",
        icon: "fa fa-thumbs-o-down"
      });
    }
  }

}
