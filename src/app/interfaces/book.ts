export interface Books {
    kind: string;
    totalItems: number;
    items: Book[];
}

export interface Book {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo?: SearchInfo;
}

interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Pdf;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

interface Pdf {
    isAvailable: boolean;
}

interface Epub {
    isAvailable: boolean;
    acsTokenLink: string;
}

interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
}

interface LayerInfo {
    layers: Layer[];
}

interface Layer {
    layerId: string;
    volumeAnnotationsVersion: string;
}

interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printedPageCount: number;
    dimensions: Dimensions;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}

interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

interface Dimensions {
    height: string;
    width: string;
    thickness: string;
}

interface ReadingModes {
    text: boolean;
    image: boolean;
}

interface IndustryIdentifier {
    type: string;
    identifier: string;
}

interface SearchInfo {
    textSnippet: string;
}