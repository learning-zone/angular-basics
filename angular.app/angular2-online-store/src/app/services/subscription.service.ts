import { Injectable }   from '@angular/core';
import { Subscription } from 'Rxjs';

interface ISubscriptionService {
    unsubscribeFromAllObservables(subscriptions: Array<Subscription>): void;
}

@Injectable()
export class SubscriptionService implements ISubscriptionService{
    public unsubscribeFromAllObservables(subscriptions: Array<Subscription>): void {
        for (let subscription of subscriptions) {
            subscription.unsubscribe();
        }
    }
}