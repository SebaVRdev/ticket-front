import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit: number = 10, trail: string = '...'): string {
    if (!value) {
      return '';
    }
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
