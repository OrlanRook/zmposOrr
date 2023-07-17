import { Pipe, PipeTransform } from '@angular/core';
import { ISale } from '../sales/sales.interface';

@Pipe({
  name: 'warehouse'
})
export class WarehousePipe implements PipeTransform {

  transform(itemList: Array<ISale>, search: string, filteredCount: any): Array<ISale> {
    if( itemList && search == ''){
      filteredCount.count = itemList.length;
      return itemList;
    }

    if( itemList && search )
    {
      let filteredItems = itemList.filter(
        (d) =>
          String(d.id).indexOf(search) > -1
        );

      filteredCount.count = filteredItems.length;
      return filteredItems;
    }

    filteredCount.count = 0;
    return [];
  }

}
