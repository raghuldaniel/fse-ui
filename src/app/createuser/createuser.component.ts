import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { CreateuserService } from '../services/createuser.service';
import { Form } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  public user : User;

  constructor(private createUserService : CreateuserService,
  private authService : AuthenticationService) { }
  
  public submitMessage: string;

  public successMessage: string;

  ngOnInit() {
    this.user = new User();
  }

  createUser(createUserForm : NgForm){
    this.createUserService.createUser(this.user).subscribe(res => {
      console.log("res"+res);
      this.successMessage = "User saved successfully!!!";
      
    },
    error => {
     
        this.submitMessage = error.message;
        
      });
      this.submitMessage = '';
      createUserForm.resetForm();
      
  }

}
