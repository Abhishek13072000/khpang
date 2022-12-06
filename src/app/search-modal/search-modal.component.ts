
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { ngxCsv } from 'ngx-csv';
import { Search } from '../search';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {

  searchData:any;
  searchText:any;
  CsvData: any;
  filterdata:any;
  report=[
    {
      value : "location",
      viewValue : "Location wise average"
    },
    {
      value : "every",
      viewValue : "Average of locations"
    },]
  fileTitle = 'Candidate Details';
  Headers = `Location,Average
  `;

  constructor(private _service:UsersService,public dialogRef: MatDialogRef<SearchModalComponent>) { }

    ngOnInit(): void {

    }

    select(value:any) {
      this.filterdata=value.value;
    }

    searchdata(event:any,val:any) {
      console.log(event,val)
      var searchObj = new Search(event, val);
      this._service.storeObj(searchObj);
      this._service.reportData(this.searchData).subscribe(
        (response)=>{
          console.log("done")
          this.searchData=response;
          console.log(this.searchData);
        },
        (error)=>{
          console.log("error"+error)
        });
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

    formatToCsvData() {
      let itemsFormatted:any = [];
      this.searchData.forEach((item:any) => {
        itemsFormatted.push({
          Location:item.filterdata.replace(/,/g, ''), // remove commas
          Average:item.input,
        });
      });

      const jsonObject = JSON.stringify(itemsFormatted);
      const csv = this.convertToCSV(jsonObject);
      this.CsvData = this.Headers + csv;
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

    downloadCSV() {
      var options = {
        title: 'Candidate Details',
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        headers: ["unique_id","age","location","expected_lwd","marital_status","name","relevant_experience","skills","total_experience","technology"],
        showLabels: false,
        noDownload: false,
        showTitle: false,
        useBom: false,
        keys: ["unique_id","age","location","expected_lwd","marital_status","name","relevant_experience","skills","total_experience","technology"]
      };
      const data = new ngxCsv(this.searchData, "Details", options);
      console.log(data);
    }

  closeModal() {
  this.dialogRef.close(false);
  }

}
