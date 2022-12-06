import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../candidate';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  change:any="";

  url="http://localhost:8080/api/new_candidate";

  c:Candidate=new Candidate();

  constructor(private http:HttpClient, private _router : Router){}

  ngOnInit(): void {
  }

  putData()
  {
       console.log(this.c);
       this.http.post<Candidate>(this.url,this.c).subscribe(data=>{console.log(data)},
       error=>console.log("error"),
       ()=>console.log("done"));
       this.change="A";
       alert("Data Submitted Successfully");
       this._router.navigate(['/board']);
  }

}
