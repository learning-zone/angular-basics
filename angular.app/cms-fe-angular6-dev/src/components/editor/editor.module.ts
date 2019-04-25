import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EditorComponent } from './editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        EditorComponent,
    ],
    exports: [
        EditorComponent,
    ],
})
export class EditorModule {}
