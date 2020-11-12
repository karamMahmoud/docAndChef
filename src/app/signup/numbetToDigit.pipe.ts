import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberToWord',
pure: false})
export class numberToWord implements PipeTransform {
    transform(number) {
        switch( number){
        case 1 : return 'One'
        break;
        case 2 : return 'Two'
        break;
        case 3 : return 'Three'
        break;
        }
    }
}