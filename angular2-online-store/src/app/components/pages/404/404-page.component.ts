import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'page-404',
    templateUrl: '404-page.component.html',
    styleUrls: [
        '404-page.component.css'
    ]
})
export class PageNotFoundComponent {
    private imageUrl = "http://72gpf1za5iq428ekh3r7qjc1.wpengine.netdna-cdn.com/wp-content/uploads/2015/11/error.jpg";
    private message = "The page you requested is not found!";
}