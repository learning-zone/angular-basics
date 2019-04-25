import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UploadFileComponent } from './upload-file.component';
import { PreViewDirective } from './upload-file.directvie';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        UploadFileComponent,
        PreViewDirective,
    ],
    providers: [
        //
    ],
    exports: [
        UploadFileComponent,
    ],
})
export class UploadFileModule {}
