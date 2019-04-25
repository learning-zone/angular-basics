import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription }                                    from 'Rxjs'

//Computer model
import { Computer, DirOptions, Notification } from '../../../../models/index';

//Api service
import { ApiService, NotificationService, SubscriptionService } from '../../../../services/index';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'admin-store',
    templateUrl: 'admin-store.component.html',
    styleUrls: [
        'admin-store.component.css'
    ]
})
export class AdminStoreComponent implements OnInit, OnDestroy{

    private storeItems:    Computer[];
    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private subscriptionService: SubscriptionService
    ){}

    public ngOnInit(): void {
        const apiServiceSubscription = this.apiService
            .getAllComputers()
            .subscribe(response => {
                    if(response.success){
                        this.storeItems = response.data;
                    }
                },
                error => console.error(`An error has occurred! ${error}`));

        this.subscriptions.push(apiServiceSubscription);
    }

    public ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

    private isEmptyStore(): boolean {
        return !!this.storeItems && this.storeItems.length === 0;
    }

    private removeFromStore(storeItem: Computer): void {
        let index = this.storeItems.indexOf(storeItem);

        //Removing the item not mutating the data
        this.storeItems = [...this.storeItems.slice(0, index), ...this.storeItems.slice(index+1)];

        //Removing from backend
        const apiServiceSubscription = this.apiService
            .removeComputer(storeItem._id)
            .subscribe(response => {
                    if(response.success){

                        //Notifying the users about the action status
                        this.notificationService.push(new Notification(
                            'The item was successfully removed!',
                            '',
                            'assets/images/notifications/success.png',
                            DirOptions.auto
                        ));

                    }
                },
                error => console.error(`An error has occurred! ${error}`));

        this.subscriptions.push(apiServiceSubscription);
    }
}