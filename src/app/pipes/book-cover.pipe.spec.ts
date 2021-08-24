import { BookCoverPipe } from './book-cover.pipe';

describe('BookCoverPipe', () => {
  it('create an instance', () => {
    const pipe = new BookCoverPipe();
    expect(pipe).toBeTruthy();
  });
});
