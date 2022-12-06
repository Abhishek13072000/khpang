import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comment';
import { DueDDate } from './due-ddate';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
  };

  constructor(private _http:HttpClient) { }


  base_url:string = "http://localhost:8080/Comments/Candidate/";
  date_url="http://localhost:8080/api/updateDate";
  public new_comment(comm:string,iid:string){

    const new_url = this.base_url + iid + "/comments"

    console.log("http://localhost:8080/Comments/Candidate/{{getdata.wgsid}}/comments")

    console.log(this.base_url);

    const c = new Comment(comm);

    return this._http.post<any>(new_url,c);
  }
  public change_date(new_date:DueDDate):Observable<DueDDate>{

    return this._http.put<any>(this.date_url,new_date);

  }
}
