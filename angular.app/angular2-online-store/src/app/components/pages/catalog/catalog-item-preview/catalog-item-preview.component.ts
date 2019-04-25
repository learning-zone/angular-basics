import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { Subscription }                                    from 'Rxjs'

import { Computer } from '../../../../models';

import { ApiService, SubscriptionService } from '../../../../services';

//TODO remove interfaces and make the props and methods private
interface ICatalogItemPreview {
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    details: Array<string>;
    date: number;
}

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-item-preview',
    templateUrl: 'catalog-item-preview.component.html',
    styleUrls: [
        'catalog-item-preview.component.css'
    ]
})
export class CatalogItemPreviewComponent implements OnInit, OnDestroy, ICatalogItemPreview{
    public brand: string;
    public title: string;
    public price: number;
    public image: string;
    public description: string;
    public details: Array<string>;
    public date: number;

    private previewItem: Computer;
    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private subscriptionService: SubscriptionService,
        private route: ActivatedRoute
    ){}

    public ngOnInit(): void {
        const routerSubscription = this.route.params.subscribe(params => {

            let id = params['id'];

            const apiServiceSubscription = this.apiService
                .getComputerById(id)
                .subscribe(response => {
                        if(response.success){

                            this.previewItem = response.data[0];

                            Object.assign(this, this.previewItem);
                        }
                    },
                    error => console.error(`An error has occurred! ${error}`));
            this.subscriptions.push(apiServiceSubscription);
        });

        this.subscriptions.push(routerSubscription);
    }

    public ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }
}

