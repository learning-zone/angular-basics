import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Carousel } from '../shared/interfaces/carousel';
import { Villain } from '../shared/interfaces/villain';

import { sliderImages } from '../shared/mock-data/mock-carousel';
import { villains } from '../shared/mock-data/mock-villains';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])  
  ]
})
export class LandingPageComponent implements OnInit {
  carouselHeight: number = 500;
  allVillains: Array<Villain>;
  animeVillains: Array<Villain>;
  carouselImages: Array<Carousel>;
  searchTitle: string = 'Search Anime Manga And Videos';
  animeVillainsTitle: string = 'Popular Anime Villains'; 
  
  constructor() { }

  ngOnInit(): void {
    // set anime villains from data
    this.allVillains = villains;
    // anime villains section set to show 4 anime villains 
    this.sliceData('backward');    
    // input to carousel component
    this.carouselImages = sliderImages;   
    // set all anime villains flip to inactive initially
    this.setFlip(this.animeVillains);
  }

  // set flip property to inactive
  setFlip(villains: Array<Villain>): void {
    villains.forEach(villain => {
      villain['flip'] = "inactive";
    });
  }

  // toggle flip to show/hide villain details
  toggleFlip(villain: Villain): void {
   villain['flip'] = (villain['flip'] == 'active') ? 'inactive' : 'active';
  }

  // slide data to show for villains section
  sliceData(direction: string): void {   
    if(direction === 'backward') {
      this.animeVillains = this.allVillains.slice(0,4);
    } else if(direction === 'forward') {
      this.animeVillains = this.allVillains.slice(4,8);
    }    
  }

}
