import { Pipe, PipeTransform } from '@angular/core';
import { IProfile } from 'src/app/site/profile/profile.interface';

type modelDataType = IProfile;

@Pipe({
  name: 'pipeEmployee'
})
export class EmployeePipe implements PipeTransform {

  transform(itemList: Array<modelDataType>, search: string, filteredCount: any): Array<modelDataType> {
    
    if( itemList && search )
    {
      let filteredItems = itemList.filter(
        (d) =>
        d.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        d.phone.toLowerCase().indexOf(search.toLowerCase()) > -1
        );

      filteredCount.count = filteredItems.length;
      return filteredItems;
    }

    filteredCount.count = itemList.length;
    return itemList;

  }

}
