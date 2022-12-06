
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mes ="";
  u:Login=new Login();

  constructor(private _service:UsersService, private _router : Router) { }

  ngOnInit(): void {
  }

  userlog()
  {
    console.log(this.u)

    this._service.loginuser(this.u).subscribe(
      data=> {console.log("Response submited :"+data)
               this._router.navigate(['board'])
    },
      err=> {console.log("This function ran but error occured "+err)
    this.mes = " Bad credentilas please check Email id and Password"}
    );
  }

  login(){

    console.log(this.u)

    this._service.loginuser(this.u).subscribe(
      data=> {console.log("Recponse submited :"+data)
               this._router.navigate(['board'])
    },
      err=> {console.log("This function ran but error occured "+err)
    this.mes = err}
    );
  }

  gotoreg(){
    this._router.navigate(['/register'])
  }

}
