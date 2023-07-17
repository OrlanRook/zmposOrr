import { Pipe, PipeTransform } from '@angular/core';
import { IClient } from './client.interface';

type modelDataType = IClient;

@Pipe({
  name: 'pipeClient'
})
export class ClientPipe implements PipeTransform {

  transform(itemList: Array<modelDataType>, search: string, filteredCount: any): Array<modelDataType> {
    
    if( itemList && search )
    {
      let filteredItems = itemList.filter(
        (d) =>
        d.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        d.phone.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        d.state.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        d.city.toLowerCase().indexOf(search.toLowerCase()) > -1 
        );

      filteredCount.count = filteredItems.length;
      return filteredItems;
    }

    filteredCount.count = itemList.length;
    return itemList;

  }

}
