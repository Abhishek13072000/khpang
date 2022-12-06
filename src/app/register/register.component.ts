import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  url="http://localhost:8080/login/new_login";

  change:any="";

  u:Login=new Login();

  constructor(private http:HttpClient, private _router : Router) { }

  ngOnInit(): void {
  }

  userreg()
  {
       console.log(this.u);
       this.http.post<Login>(this.url,this.u).subscribe(data=>{console.log(data)},
       error=>console.log("error"),
       ()=>console.log("done"));
       this.change="A";
       alert("Register Successfully");
       this._router.navigate(['/login']);
  }

}
