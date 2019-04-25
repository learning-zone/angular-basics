import { HttpClient } from '@angular/common/http';
import { forwardRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';

const Quill = require('quill');

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],               // custom button values
  [{ list: 'ordered'}, { list: 'bullet' }],
  [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
  [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
  [{ direction: 'rtl' }],                         // text direction

  [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] as any }, { background: [] as any }],          // dropdown with defaults from theme
  [{ font: [] as any }],
  [{ align: [] as any }],

  ['link', 'image'],

  ['clean'],                                         // remove formatting button
];

@Component({
  selector: 'app-editor',
  template: `
    <div #editor></div>
    <input [(ngModel)]="editorVal" style="display:none;"/>
  `,
  styles: [`
    .ql-container{min-height:600px;}
  `],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi      : true,
    },
  ],
})
export class EditorComponent implements ControlValueAccessor {
  public baseUrl: string = '/upload-file';
  public _value: any;
  @ViewChild('editor') private editor: ElementRef;

  @Input() public imgSrc: any;
  @Output() public fileUploaded: EventEmitter<object> = new EventEmitter();

  public quillEditor: any = {};

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  constructor (
    private http: HttpClient,
    private notification: NzNotificationService,
  ) {}

  public ngOnInit () {
    this.quillEditor = new Quill(this.editor.nativeElement, {
      debug: false,
      modules: {
          toolbar: toolbarOptions,
      },
      placeholder: '请在这里写下你的内容...',
      readOnly: false,
      theme: 'snow',
    });
    this.quillEditor.on('editor-change', (delta: any, oldDelta: any, source: any) => {
      console.log('editor-change');
      let _html = this.quillEditor.root.innerHTML;
      if (_html === '<p><br></p>') {
      _html = null; return;
      }
      this.onChange(_html);
    });
    this.quillEditor.getModule('toolbar').addHandler('image', () => {
      this.selectLocalImage();
    });
  }

  private selectLocalImage () {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        const fd = new FormData();
        fd.append('file', file);
        this.http.post(this.baseUrl, fd)
        .finally(() => {})
        .subscribe((res: any) => {
          this.insertToEditor(res.data.path);
        }, (err: any) => {});
      } else {
        this.notification.warning('警告', '请选择图片');
      }
    };
  }

  private insertToEditor (url: string) {
    const range = this.quillEditor.getSelection();
    this.quillEditor.insertEmbed(range.index, 'image', `${url}?Authorization-User=${localStorage.getItem('ACCESS_TOKEN') || 'no_token'}`);
  }

  public ngOnChanges () {
    //
  }

  get editorVal () {
    return this._value;
  }

  set editorVal (val: any) {
    if ((this._value === val) || (((this._value === undefined) || (this._value === null)) && ((val === undefined) || (val === null)))) {
        return;
    }
    if (val !== this._value) {
        this._value = val;
        this.onChange(val);
        this.quillEditor.root.innerHTML = val;
    }
  }

  public writeValue (value: any): void {
    this.editorVal = value;
  }

  public registerOnChange (fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched (fn: () => {}): void {
    this.onTouched = fn;
  }

}
