import { Search } from './search';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from './status';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  login_url:string = "http://localhost:8080/login/email_2";

  url="http://localhost:8080/api/updateStatus";

  url1="http://localhost:8080/api/all_2";

  search_url="http://localhost:8080/api/searchData";

  report_url="http://localhost:8080/api/average";

  searchObject!:Search;

  constructor(private http:HttpClient) { }

  public loginuser(user:Login):Observable<Login> {
    return this.http.post<any>(this.login_url,user);
  }

  public upStatus(stat:Status):Observable<Status> {
    return this.http.put<any>(this.url,stat);
  }

  public getdata(data:any):Observable<any> {
    return this.http.get<any>(this.url1,data);
  }

  public storeObj(searchObj:any){
    this.searchObject=searchObj;
  }

  public searchData(searchObj:any):Observable<any>{
    searchObj=this.searchObject;
    console.log(searchObj);
    return this.http.post<any>(this.search_url,searchObj)
  }

  public reportData(searchObj:any):Observable<any>{
    searchObj=this.searchObject;
    console.log(searchObj);
    return this.http.post<any>(this.report_url,searchObj)
  }

}
