import 'reflect-metadata';
import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Parties } from '../../../collections/parties.ts';
import { Meteor } from 'meteor/meteor';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';


@Component({
  selector: 'parties-form',
  templateUrl: '/client/imports/parties-form/parties-form.html',
  directives: [MATERIAL_DIRECTIVES]
})
export class PartiesForm {
  partiesForm: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.partiesForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      'public': [false]
    });
  }

  addParty(party) {
    if (this.partiesForm.valid) {
      if (Meteor.userId()) {
        Parties.insert(<Party>{
          name: party.name,
          description: party.description,
          location: {
            name: party.location
          },
          'public': party.public,
          owner: Meteor.userId()
        });

        (<Control>this.partiesForm.controls['name']).updateValue('');
        (<Control>this.partiesForm.controls['description']).updateValue('');
        (<Control>this.partiesForm.controls['location']).updateValue('');
        (<Control>this.partiesForm.controls['public']).updateValue(false);
      } else {
        alert('Please log in to add a party');
      }
    }
  }
}