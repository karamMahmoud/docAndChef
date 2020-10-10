import { BaseComponent } from '../base/base.component';
import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ObjectArray } from './../helper/object-pipe';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    BaseComponent,
    ObjectArray
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({
    	loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
  })
  ],
  bootstrap: [BaseComponent],
  exports: [
    BaseComponent,
    ObjectArray,
    TranslateModule,
]
})
export class BaseModule { }
