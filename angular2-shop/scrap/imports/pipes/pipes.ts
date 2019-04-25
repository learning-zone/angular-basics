import 'reflect-metadata';
import { Pipe } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Parties } from '../../../collections/parties.ts';
import { MeteorComponent } from 'angular2-meteor';

@Pipe({
  name: 'displayName'
})
export class DisplayName {
  transform(user: Meteor.User): string {
    if (!user) {
      return '';
    }

    if (user.username) {
      return user.username;
    }

    if (user.emails) {
      return user.emails[0].address;
    }

    return '';
  }
}


@Pipe({
  name: 'rsvp',
  pure: false
})
export class RsvpPipe extends MeteorComponent {
  init: boolean = false;
  total: number = 0;

  transform(party: Party, args: any[]): number {
    let type = args[0];
    if (!type) {
      return 0;
    }

    if (!this.init) {
      this.autorun(() => {
        party = Parties.findOne(party._id);
        if (party) {
          this.total = party.rsvps ?
            party.rsvps.filter(rsvp => rsvp.response === type).length : 0;
        }
      }, true);
      this.init = true;
    }

    return this.total;
  }
}