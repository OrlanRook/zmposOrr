import { Pipe, PipeTransform } from '@angular/core';
import { IInput } from './input.interface';

type modelDataType = IInput;

@Pipe({
  name: 'pipeInput'
})
export class InputPipe implements PipeTransform {

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
