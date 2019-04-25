import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    // styleUrls  : ['./breadcrumb.component.less'],
})
export class BreadCrumbComponent implements OnInit {
    public currentTitle: string = '';
    public currentUrl: string = '';

    constructor (
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.currentUrl = router.url;
        const children = router.config[0].children;
    }

    public ngOnInit () {
        //
    }

    public dashBoard () {
        this.router.navigate(['./dashboard']);
    }
}
