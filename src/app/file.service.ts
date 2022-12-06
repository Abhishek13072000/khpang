import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _http:HttpClient) { }

  base_url:string="http://localhost:8080/Candidate/files/";

  base_irl_2:string ="http://localhost:8080/Candidate/files/one_file/"

  public new_file(data:File, iid:string){
    const formData: FormData = new FormData();

    formData.append('file', data);

    const new_url = this.base_url+ iid +"/uploads";
    return this._http.post<any>(new_url,formData);
  }


  upload(file: File,iid:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const new_url = this.base_url+ iid +"/uploads";
    formData.append('file', file);

    const req = new HttpRequest('POST', new_url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._http.request(req);
  }

  donwload(file_id:string){

    const new_uurl = this.base_irl_2+ file_id;
    return this._http.get(new_uurl);
  }

  getFiles(): Observable<any> {
    const new_url = this.base_url + "/files";
    return this._http.get(new_url);
  }

}
