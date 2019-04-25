import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
    selector: '[preViewImg]',
})
export class PreViewDirective {

    constructor (private eleRef: ElementRef) { }

    public wrapEle: any;
    public divEle: any;
    public btnEle: any;
    public imgEle: any;
    public timer: any;

    @Input('preViewImg') private preViewImgSrc: string;

    @HostListener('click')
    public onClick () {
        if (this.preViewImgSrc)
            document.body.appendChild(this.createModal());
    }

    public ngOnInit () {
        //
    }

    public createModal () {
        if (!this.wrapEle) {
            this.wrapEle = document.createElement('div');
            this.wrapEle.className = 'pre-view-wrap';
        }
        if (!this.divEle) {
            this.divEle = document.createElement('div');
            this.divEle.className = 'pre-view-content';
        } else {
            this.divEle.className = 'pre-view-content';
        }
        if (!this.btnEle) {
            this.btnEle = document.createElement('button');
            this.btnEle.className = 'pre-close-btn';
        }
        if (!this.imgEle) {
            this.imgEle = document.createElement('img');
            this.imgEle.src = this.preViewImgSrc;
        }
        this.divEle.appendChild(this.btnEle);
        this.divEle.appendChild(this.imgEle);
        this.wrapEle.appendChild(this.divEle);

        this.divEle.addEventListener('click', (e: any) => {e.stopPropagation(); });
        this.wrapEle.addEventListener('click', this.closeModal.bind(this), false);
        this.btnEle.addEventListener('click', this.closeModal.bind(this), false);
        return this.wrapEle;
    }

    public closeModal (event: any) {
        this.divEle.className = 'pre-view-content view-fade-out';
        this.timer = setTimeout(() => {
            const wrapEle = document.getElementsByClassName('pre-view-wrap')[0];
            if (wrapEle) {
                document.body.removeChild(wrapEle);
            }
        }, 300);
    }

    //
    public ngOnDestroy () {
        clearTimeout(this.timer);
    }
}
