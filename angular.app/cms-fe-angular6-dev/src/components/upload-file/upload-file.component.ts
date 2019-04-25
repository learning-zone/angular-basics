import { HttpClient } from '@angular/common/http';
import { forwardRef, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.html',
  styles: [`
    .upload-file-wrap:after{
      display: block;
      content: '';
      clear: both;
    }
    .upload-file-input {
        position: absolute;
        clip: rect(0 0 0 0);
    }
    label.bank-logo-label {
        margin-right: 10px;
        float: left;
        position: relative;
        border: 4px solid #ccc;
        width: 80px;
        height: 80px;
        cursor: pointer;
    }
    label.bank-logo-label::before {
        position: absolute;
        content: '';
        display: block;
        width: 4px;
        height: 60px;
        background-color: #ccc;
        top: 6px;
        left: 34px;
    }
    label.bank-logo-label::after {
        position: absolute;
        content: '';
        display: block;
        width: 60px;
        height: 4px;
        background-color: #ccc;
        top: 34px;
        left: 6px;
    }
    .file-uploading{
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      height: 80px;
      background-color: rgba(255,255,255, 0.8);
      font-style: normal;
      text-align: center;
      padding-top: 20px;
    }

    .file-list img{
        cursor: pointer;
      display: block;
      float: left;
      width: 80px;
      height: 80px;
      border:1px solid #ccc;
    }
  `],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi      : true,
    },
  ],
})
export class UploadFileComponent implements ControlValueAccessor {
  public baseUrl: string = '/upload-file';
  @Input('fileUrl') public _value: any;
  public show: boolean = true;
  public uploading: boolean = false;
  @Input() public imgSrc: any;
  @Input() public maxSize: number;
  @ViewChild('preView') private preViewDiv: ElementRef;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  constructor (private http: HttpClient, private notification: NzNotificationService) {}

  public ngOnInit () {
    if (!this.imgSrc) {
      this.imgSrc = '';
      this.show = false;
    }
  }

  public ngOnChanges () {
    this.show = !!this.baseUrl;
  }

  public fileChange (event: any): void {
      if (event.target && event.target.files.length > 0) {
        const reader: FileReader = new FileReader(),
          file = event.target.files[0],
          formData = new FormData();

        formData.append('file', file);
        if (this.maxSize && file.size > this.maxSize * 1024) {
          event.target.value = '';
          this.notification.warning('警告', `图片大小超出${this.maxSize}K！`);
        } else {
          this.uploading = true;
          this.http.post(this.baseUrl, formData)
            .finally(() => this.uploading = false)
            .subscribe((res: any) => {
              reader.onload = (e: any) => {
                this.imgSrc = reader.result;
                this.show = true;
              };
              reader.readAsDataURL(file);
              this.onChange(res.data.path);
            }, (err: any) => {
              event.target.value = '';
            });
        }

      }
  }

  get fileUrl () {
    return this._value;
  }

  set fileUrl (url: any) {
    if ((this._value === url) || (((this._value === undefined) || (this._value === null)) && ((url === undefined) || (url === null)))) {
      return;
    }
    if (url !== this._value) {
      this._value = url;
      this.onChange(url);
    }
  }

  public writeValue (value: any): void {
    this.fileUrl = value;
  }

  public registerOnChange (fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched (fn: () => {}): void {
    this.onTouched = fn;
  }

}
