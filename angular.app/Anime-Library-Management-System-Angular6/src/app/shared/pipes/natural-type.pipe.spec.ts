import { ChangeDetectorRef, NgZone } from '@angular/core';
import { NaturalType } from './natural-type.pipe';

describe('NaturalTypePipe', () => {
    let changeDetector: ChangeDetectorRef;
    let ngZone: NgZone;
    let pipe: NaturalType;

    beforeEach(() => {
        pipe = new NaturalType(changeDetector, ngZone);  
    });

    it('should create an instance of natural pipe', () => {
        expect(pipe).toBeTruthy();
    });

    xit('transforms "abc" to "abc"', () => {
        expect(pipe.transform('abc')).toBe('abc');
    });
});