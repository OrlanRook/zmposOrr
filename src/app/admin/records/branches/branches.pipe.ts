import { Pipe, PipeTransform } from '@angular/core';
import { IBranch } from './branches.interface';

type modelDataType = IBranch;

@Pipe({
  name: 'pipeBranch'
})
export class BranchPipe implements PipeTransform {

  transform(itemList: Array<modelDataType>, search: string, filteredCount: any): Array<modelDataType> {
    
    if( itemList && search )
    {
      let filteredItems = itemList.filter(
        (d) =>
        d.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        d.email.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        d.phone.toLowerCase().indexOf(search.toLowerCase()) > -1
        );

      filteredCount.count = filteredItems.length;
      return filteredItems;
    }

    filteredCount.count = itemList.length;
    return itemList;

  }

}
