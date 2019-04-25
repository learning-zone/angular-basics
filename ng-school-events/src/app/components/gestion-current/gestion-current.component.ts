import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../services/gestion.service'

@Component({
  selector: 'app-gestion-current',
  templateUrl: './gestion-current.component.html',
  styleUrls: ['./gestion-current.component.css']
})
export class GestionCurrentComponent implements OnInit {

  currentGestion: any;

  constructor(private gestionService: GestionService) { }

  ngOnInit() {
    console.log(this.currentGestion);
    
    this.currentGestion = this.gestionService.getCurrentGestion();
  }

}
