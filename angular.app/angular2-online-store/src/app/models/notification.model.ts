export enum DirOptions{
    auto, ltr, rtl
}

interface IOptions {
    body: string,
    icon: string,
    dir:  DirOptions
}

export class Notification {
    public title: string;
    public options : IOptions;

    constructor(title: string, body: string, icon: string, dir: DirOptions) {
        this.title   = title;
        this.options = {body, icon, dir}
    }
}