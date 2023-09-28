
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.filter((num:any)=>{
      if(num%2==0){
        return num;
      }
    }); 
  }
}
