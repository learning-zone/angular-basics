import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'home-page',
    templateUrl: 'home-page.component.html',
    styleUrls: [
        'home-page.component.css'
    ]
})
export class HomePageComponent {
    private applicationTitle = "angular2-online-store";
    private bannerImageUrl = "http://localhost:4200/assets/images/angular2.png";
    private description    = "This is simple online store of computers implemented with Angular2 to demonstrate how the framework shines and makes the way we create apps more logical and straightforward.";
    private repositoryLink = "https://github.com/IvanDobrovolsky/angular2-online-store";
}