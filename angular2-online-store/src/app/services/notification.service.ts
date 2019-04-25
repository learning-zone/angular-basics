import { Injectable } from '@angular/core';

import { DirOptions, Notification } from '../models/index';

interface INotificationService {
    push(notification: Notification): void;
}

@Injectable()
export class NotificationService implements INotificationService {

    private NotificationAPI = window['Notification'];
    private permission   = window['Notification'].permission.toLowerCase();

    constructor() {

        if (!("Notification" in window)) {
            console.warn("This browser does not support desktop notification");
        }

        switch ( this.permission ) {
            case "granted":
                console.info('Notification permission is granted');
                break;
            case "denied":
                console.warn('Notification permission is denied');
                break;
            case "default":
                //Asking a user about the permission
                this.NotificationAPI.requestPermission( permission => this.permission = permission);
        }
    }

    public push(notification: Notification): void {
        if(this.permission == 'granted') {
            new this.NotificationAPI(notification.title, Object.assign({}, notification.options, {dir: DirOptions[notification.options.dir]}));
            console.info(`${notification.title}: ${notification.options.body}`);
        } else if (this.permission === 'denied') {
            //Using console instead
            console.info(`${notification.title}: ${notification.options.body}`);
        }
    }
}
