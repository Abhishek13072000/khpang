import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from './tag'

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private _http:HttpClient) { }

  base_url ="http://localhost:8080/tags/Candidate/";
  delete_url="http://localhost:8080/tags/tag/";

  public new_tag(tt:string,iidd:string){

    const new_url = this.base_url + iidd + "/tags";
    const t = new Tag(tt);

    return this._http.post<any>(new_url,t);

  }

  public delete_tag(tag_id:string){
    const new_dele = this.delete_url + tag_id;
    //console.log("------>"+new_dele);
    return this._http.delete(new_dele);
  }

}
