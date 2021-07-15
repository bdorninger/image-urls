import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'svgpipe'
})
export class SvgpipePipe implements PipeTransform {

  transform(value: string, args?: string): string {
    return args? args+value:'nix:'+value;
  }

}