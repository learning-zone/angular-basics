import {Component} from '@angularcore';
import {MeteorComponent} from 'angular2-meteor';

@Component({
  selector: 'login',
  templateUrl: '/packages/socially-mobile/auth/login.html'
})
export class MobileLogin extends MeteorComponent {
  constructor() {
    super();
  }
}
