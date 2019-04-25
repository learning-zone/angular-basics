import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EditorModule } from '@components/editor/editor.module';
import { UploadFileModule } from '@components/upload-file/upload-file.module';
import { AddArticleComponent }  from './addarticle/addarticle';
import { AddArticleService }  from './addarticle/addarticle.service';
import { ArticleComponent }         from './article.component';
import { ArticleRouting }       from './article.routing';
import { ArticleListComponent } from './articlelist/articlelist';
import { ArticleListService } from './articlelist/articlelist.service';
import { EditArticleComponent }  from './editarticle/editarticle';
import { EditArticleService }  from './editarticle/editarticle.service';

@NgModule({
  imports: [
    FormsModule,
    // ReactiveFormsModule,
    CommonModule,
    ArticleRouting,
    NgZorroAntdModule.forRoot(),
    UploadFileModule,
    EditorModule,
  ],
  declarations: [
    ArticleComponent,
    ArticleListComponent,
    AddArticleComponent,
    EditArticleComponent,
  ],
  providers: [
    ArticleListService,
    AddArticleService,
    EditArticleService,
  ],
})
export class ArticleModule {}
