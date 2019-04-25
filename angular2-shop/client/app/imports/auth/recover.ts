import {Component} from '@angularcore';
import {MeteorComponent} from 'angular2-meteor';
import {Router} from '@angularrouter';
import {FormBuilder, ControlGroup, Validators} from '@angularcommon';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {RouterLink} from '@angularrouter';

@Component({
  selector: 'recover',
  directives: [MATERIAL_DIRECTIVES, RouterLink],
  templateUrl: '/client/imports/auth/recover.html'
})
export class Recover extends MeteorComponent {
  recoverForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.recoverForm = fb.group({
      email: ['', Validators.required]
    });

    this.error = '';
  }

  recover(credentials) {
    if (this.recoverForm.valid) {
      Accounts.forgotPassword({ email: credentials.email}, (err) => {
        if (err) {
          this.error = err;
        }
        else {
          this.router.navigate(['/PartiesList']);
        }
      });
    }
  }
}