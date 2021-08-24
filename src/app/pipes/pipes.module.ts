import { NgModule } from '@angular/core';
import { BookCoverPipe } from './book-cover.pipe';
import { TrimStringPipe } from './trimString.pipe';

@NgModule({
    declarations: [BookCoverPipe, TrimStringPipe],
    imports: [],
    exports: [BookCoverPipe, TrimStringPipe],
})

export class PipesModule { }