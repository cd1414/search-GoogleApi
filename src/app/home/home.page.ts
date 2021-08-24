import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonInfiniteScroll } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Book, Books } from '../interfaces/book';
import { BookInfoService } from '../services/book-info.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;

  _isbn: string;
  _intitle: string;
  _inauthor: string;
  _baseUrl: string;
  _bookList: Book[];
  _rating: number[];
  _currentPage: number;
  _maxResults: number;
  _totalResults: number;

  constructor(
    private bookInfoService: BookInfoService,
    private alertControl: AlertController,
    private barcodeScanner: BarcodeScanner) {
  }

  ngOnInit() {
    this.setDefaults();
    this.setDummyData();
    this.searchBook();
    this.setRatings(5);
  }

  setDefaults(): void {
    this._bookList = null;
  }

  setDummyData() {
    // this._isbn = '9781402726668';
    this._inauthor = 'mary';
  }

  setRatings(max: number): void {
    this._rating = Array(max);
  }

  searchBook(): void {
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
    this._bookList = null;
    this._currentPage = 0;
    this.loadData(null);
  }

  getFilter(): string {

    let filter: string[] = [];
    let encodeValue = '';

    if (this._isbn) {
      encodeValue = encodeURIComponent(this._isbn);
      filter.push(`isbn:${encodeValue}`);
    }
    if (this._inauthor) {
      encodeValue = encodeURIComponent(this._inauthor);
      filter.push(`inauthor:${encodeValue}`);
    }
    if (this._intitle) {
      encodeValue = encodeURIComponent(this._intitle);
      filter.push(`intitle:${encodeValue}`);
    }

    return filter.join('+');
  }

  loadData(event): void {

    this._totalResults = 0;
    if (this._bookList === null) {
      this.bookInfoService._page = 0;
      this._bookList = [];
    } else {
      this.bookInfoService._page += 1;
    }

    this.bookInfoService._filter = this.getFilter();
    this.bookInfoService.getBookInfo()
      .subscribe((data: Books) => {
        this._totalResults = data.totalItems;
        if (data.items) {
          this._bookList.push(...data.items);
        }
        if (event && event.target) {
          event.target.complete();

          event.target.disabled = this._bookList.length === data.totalItems;
        }
      })
  }


  toggleShow(event, element): void {
    if (element.el.classList.toggle('show-more')) {
      event.target.innerHTML = "SHOW LESS";
    } else {
      event.target.innerHTML = "SHOW MORE";
    }
  }

  scrollToTop(): void {
    this.ionContent.scrollToTop(1500);
  }

  openLink(link): void {
    window.open(link, "_blank");
  }

  scanBarcode(): void {
    this.barcodeScanner.scan()
      .then(barcodeData => {
        this._isbn = barcodeData.text;
      }).catch(err => this.showMessage('Error', err))
  }

  async showMessage(header: string, message: string): Promise<void> {
    const alert = await this.alertControl.create({
      header,
      message,
      buttons: ['OK']
    })
    alert.present();
  }
}
