import { SearchModalComponent } from './../search-modal/search-modal.component';
import { Status } from './../status';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Candidate } from '../candidate';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { TagsService } from '../tags.service';
import { Search } from '../search';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  c:Candidate=new Candidate();
  data:any[]=[];
  backlog:any [] = [];
  done:any [] = [];
  progress:any [] = [];
  review:any [] = [];
  change:any="";
  filterdata:any;
  searchData:any;
  CsvData: any;
  fileTitle = 'Candidate Details';
  Headers = `Unique_id,Name, Location, Technology, Skill, Total Experience, Relevant Experience, Expected LWD
  `;

  choice=[
    {
      value : "all",
      viewValue : "Raw Data"
    },
    {
      value : "month",
      viewValue : "Monthly"
    },{
      value : "quater_1",
      viewValue : "1st Quater"
    },{
      value : "quater_2",
      viewValue : "2nd Quater"
    },{
      value : "quater_3",
      viewValue : "3rd Quater"
    },{
      value : "quater_4",
      viewValue : "4th Quater"
    },{
    value : "wgsid",
    viewValue : "CandidateId"
  },{
    value : "name",
    viewValue : "CandidateName"
  },{
    value : "skill",
    viewValue : "Skills"
  },{
    value : "location",
    viewValue : "Location"
  },{
    value : "technology",
    viewValue : "Technology"
  },{
    value : "Tags",
    viewValue : "Tags"
  }];
  searchText:any="";
  search:any="";
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private _service_tag:TagsService,private http:HttpClient,public matDialog: MatDialog,private _service:UsersService, private _router : Router){}

  ngOnInit(): void {

    this._service.getdata(this.data).subscribe(
      (response)=>{
        console.log("done")
        this.data=response;
        console.log(response)
        for(let i=0;i<this.data.length;i++)
        {
          if(this.data[i].status=="backlog")
          {
            this.backlog.push(this.data[i]);
          }
          else if(this.data[i].status=="progress")
          {
            this.progress.push(this.data[i]);
          }
          else if(this.data[i].status=="review")
          {
            this.review.push(this.data[i]);
          }
          else if(this.data[i].status=="done")
          {
            this.done.push(this.data[i]);
          }
        }
      },
      (error)=>{
        console.log("error"+error)
      });

  }

  onDrop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
    }
     else
    {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      status=event.container.element.nativeElement.id;
      console.log(status);
      console.log(event);

      if(status=="backlog")
      {
      var ind=this.backlog[event.currentIndex].wgsid;
      console.log(ind);
      var cont=new Status("backlog",ind);
      this._service.upStatus(cont).subscribe(
        response=>{
          console.log("done")
        },
        error=>{
          console.log("error"+error)
        }
        );
      }
      else if(status=="progress")
      {
        var ind=this.progress[event.currentIndex].wgsid;
        console.log(ind);
        var cont=new Status("progress",ind);
        this._service.upStatus(cont).subscribe(
          response=>{
            console.log("done")
          },
          error=>{
            console.log("error"+error)
          }
          );
        }
      else if(status=="review")
      {
        var ind=this.review[event.currentIndex].wgsid;
        console.log(ind);
        var cont=new Status("review",ind);
        this._service.upStatus(cont).subscribe(
          response=>{
            console.log("done")
          },
          error=>{
            console.log("error"+error)
          }
          );
        }
      else if(status=="done")
      {
        var ind=this.done[event.currentIndex].wgsid;
        console.log(ind);
        var cont=new Status("done",ind);
        this._service.upStatus(cont).subscribe(
          response=>{
            console.log("done")
          },
          error=>{
            console.log("error"+error)
          }
          );
        }
    }
  }

  open(value:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(ModalComponent,  {data: {dataKey: value}});
  }

  report() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "search-modal-component";
    const modalDialog = this.matDialog.open(SearchModalComponent);
  }

  select(value:any) {
    this.filterdata=value.value;
  }

  searchdata(event:any,val:any) {
    var searchObj = new Search(event, val);
    this._service.storeObj(searchObj);
    this._service.searchData(this.searchData).subscribe(
      (response)=>{
        this.searchData=response;
        this.download();
        console.log(this.searchData);
      },
      (error)=>{
        console.log("error"+error)
      });

  }

  download() {
    this.formatToCsvData();
    const filename = this.fileTitle + '.csv';

    const blob = new Blob([this.CsvData], {
      type: 'text/csv;charset=utf-8;',
    });

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }


  formatToCsvData() {
    let itemsFormatted:any = [];
    this.searchData.forEach((item:any) => {
      itemsFormatted.push({
        Unique_id:item.wgsid.replace(/,/g, ''), // remove commas
        Name:item.name,
        Location:item.location,
        Technology:item.technology,
        Skill:item.skill,
        Total_Experience:item.total_exp,
        Relevant_Experience:item.relevant_exp,
        Expected_LWD:item.lwd,
      });
    });

    const jsonObject = JSON.stringify(itemsFormatted);
    const csv = this.convertToCSV(jsonObject);
    this.CsvData = this.Headers + csv;
  }

   convertToCSV(objArray:any) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';

      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ',';
          line += array[i][index];
        }
        str += line + '\r\n';
      }
      return str;
    }

  add(event: MatChipInputEvent, iid:string): void {
    const value = (event.value || '').trim();
    console.log("Value:"+value);
    console.log("id:"+iid);
    if (value) {
      this._service_tag.new_tag(value,iid).subscribe(
        data=>{
          console.log("tag added "+data);
          window.location.reload();
        },
        error=>{
          console.log("error "+error)
        }
      );
    }
    event.chipInput!.clear();
  }

  remove(fruit: string): void {
   console.log("id tag :"+fruit);

   this._service_tag.delete_tag(fruit).subscribe(
    data=>{
      console.log("deleaed tag "+data)
      window.location.reload();
    },
    error=>{
      console.log("Eror deleting tag "+error)
    }
   );
 }

}


