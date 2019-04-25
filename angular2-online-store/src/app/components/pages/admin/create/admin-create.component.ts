import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router }                                          from '@angular/router';
import { Subscription }                                    from 'Rxjs'

import { Computer, DirOptions, Notification } from '../../../../models';

import { ApiService, NotificationService, SubscriptionService } from '../../../../services';

//TODO Add Allow deactivation only if the form is submitted
//TODO Add authentication

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'admin-create',
    templateUrl: 'admin-create.component.html',
    styleUrls: [
        'admin-create.component.css'
    ]
})
export class AdminCreateComponent implements OnInit, OnDestroy {

    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private subscriptionService: SubscriptionService,
        private router: Router
    ) {}

    public ngOnInit(): void {

    }

    public ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

    private createComputer(computer: Computer) {

        const apiServiceSubscription = this.apiService
            .createNewComputer(computer)
            .subscribe(response => {
                    if(response.success){

                        //Notifying the users about the action status
                        this.notificationService.push(new Notification(
                            'The item was successfully created!',
                            '',
                            'assets/images/notifications/success.png',
                            DirOptions.auto
                        ));

                        this.router.navigate(['/admin']);
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
        this.subscriptions.push(apiServiceSubscription);
    }
}