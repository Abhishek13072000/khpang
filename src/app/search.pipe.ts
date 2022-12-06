import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: Array<any>, search: any): any {
    if (data && search)
      return data.filter(
        (d) =>
          d.tag_content.indexOf(search) > -1
      );
    return data;
  }
}
