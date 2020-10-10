import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'objectArray',
pure: false})
export class ObjectArray implements PipeTransform {
    transform(object: {}) {
        return object ? Object.keys(object) : [];
    }
}