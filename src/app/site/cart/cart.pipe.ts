import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from 'src/app/admin/items/item/item.interface';


@Pipe({
  name: 'cart'
})
export class CartPipe implements PipeTransform {

  transform(itemList: Array<IItem>, search: string, filteredCount: any): Array<IItem> {
    if( itemList && search && search == '*'){
      filteredCount.count = itemList.length;
      return itemList;
    }

    if( itemList && search )
    {
      let filteredItems = itemList.filter(
        (d) =>
        d.sku.indexOf(search) > -1 ||
        d.description.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        d.shortname.toLowerCase().indexOf(search.toLowerCase()) > -1
        );

      filteredCount.count = filteredItems.length;
      return filteredItems;
    }

    filteredCount.count = 0;
    return [];
  }

}
