
import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommentService } from '../comment.service';
import { DueDDate } from '../due-ddate';
import { FileService } from '../file.service';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  due_date!:Date;
  gcm4:string="GCM4";
  acqphx:string="ACQ-PHX";
  getdata:any;

  content:string="";
  content_1:string="";
  id_1:string="";
  url:string="";
  fileToUpload!:File;

  selectedFiles!: FileList;
  progressInfos = [];
  message = '';
  fileInfos!: Observable<any>;



  constructor(private _service_3:FileService,private _service_2:TagsService, private _service:CommentService, @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {

    this.getdata=this.data.dataKey;

    //########
    this.fileInfos = this._service_3.getFiles();
    //###########

}

//#################################

File_download(file_id:string){

  this._service_3.donwload(file_id).subscribe(
    data=>{
      console.log("Works :"+data);

      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', 'http://localhost:8080/files/'+file_id);
      link.setAttribute('download', `File`);
      document.body.appendChild(link);
      link.click();
      link.remove();


    },
    err=>{
      console.log("Errors :"+err);
    }
  );
}

downloadMyFile(){
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'abc.net/files/test.ino');
  link.setAttribute('download', `products.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}


//##################################

handleFileInput(event:any ) {
  const file = event.target.files[0];
  this.fileToUpload = file;
}

  closeModal() {
    this.dialogRef.close(false);
  }

  file_upload(iid:string){

    this._service_3.new_file(this.fileToUpload,iid).subscribe(
      data=>{
        console.log("new comment made :"+data);
        window.location.reload();
      },
      err=>{
        console.log("erroe :"+err);
      }
    );
  }

  conn(comentt:string, idd:string){
    console.log("this conn ran ")
    console.log(comentt);
    console.log(idd);

    this._service.new_comment(comentt,idd).subscribe(
      data=>{
        console.log("new comment made :"+data);
        window.location.reload();
      },
      err=>{
        console.log("erroe :"+err);
      }
    );
  }

  Tags(ttg:string,iidd:string){

    console.log("Tags is running");

    this._service_2.new_tag(ttg,iidd).subscribe(
      data=>{
        console.log("New tag added :"+data);
        window.location.reload();
      },
      error=>{
        console.log("Error :"+error);
      }
    );
  }

  change_date(event:any){

    const new_due = event.target.value;

    this.due_date = new_due

    console.log("new due date :"+this.due_date);

  }



  impl_date(iid:string){

    console.log("iid :"+iid);

    const new_due = new DueDDate(this.due_date.toString(),iid);

    this._service.change_date(new_due).subscribe(

      data=>{

        console.log("date Wored :"+data);

      },

      eooro=>{

        console.log("erroe occored date fail :"+eooro.message);
        window.location.reload();
      }

    );

  }

}

