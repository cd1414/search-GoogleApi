import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimString'
})
export class TrimStringPipe implements PipeTransform {

  transform(text: string, ...args: any[]): string {
    let param = [args];
    let size = args[0] || 100;

    return text.length > size ?
      text.substring(0, size) + '...' : text;
  }

}
