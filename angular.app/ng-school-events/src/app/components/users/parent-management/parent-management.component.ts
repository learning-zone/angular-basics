import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ParentsService } from "../../../services/parents.service";

@Component({
  selector: 'app-parent-management',
  templateUrl: './parent-management.component.html',
  styleUrls: ['./parent-management.component.css']
})
export class ParentManagementComponent implements OnInit {

  closeResult: string;
  parents: any[];
  parentInfo: any;
  constructor(private modalService: NgbModal, 
              private parentsSvc: ParentsService) {
    this.parents = [];
    this.parentInfo = { userType: "parent", password: "password", email: "" };
   }

  ngOnInit() {
    this.loadParents();
  }
  
  loadParents() {
    this.parentsSvc.getParents().subscribe(parents => {
      this.parents = parents;
    });
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  inviteParent() {
    let parentInfo = this.parentInfo;
    this.parentsSvc.registerParent(parentInfo).subscribe(res => {
      this.parentInfo = { userType: "parent", password: "password" };
      this.loadParents();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
