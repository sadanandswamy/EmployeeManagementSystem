import { Injectable, Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'searchfilter'  
})  
  
@Injectable()  
export class SearchFilterPipe implements PipeTransform {  
    transform(items: any[], searchText: string): any[] { 
         if (searchText!=undefined){
            debugger
            return items.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
         }
         else{
             return items;
         }
      
    }
 
  
 
} 