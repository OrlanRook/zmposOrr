import { Pipe, PipeTransform } from '@angular/core';
import { IRegister } from './register.interface';

type modelDataType = IRegister;

@Pipe({
  name: 'pipeRegister'
})
export class RegisterPipe implements PipeTransform {

  transform(itemList: Array<modelDataType>, search: string, filteredCount: any): Array<modelDataType> {
    
    if( itemList && search )
    {
      let filteredItems = itemList.filter(
        (d) => 
          d.file.original_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        );

      filteredCount.count = filteredItems.length;
      return filteredItems;
    }

    filteredCount.count = itemList.length;
    return itemList;

  }

}
