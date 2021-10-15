import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'biblio-client/config/environment';

const BOOKS_URL_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';

export default class SearchService extends Service {
  @service router;
  @tracked searchQuery = '';
  @tracked searchResults = null;
  @tracked isLoading = false;
  _prevSearch = null;

  get token() {
    const token = ENV.APP.GOOGLE_API_KEY;
    if (typeof token === 'string') {
      return encodeURIComponent(token);
    }
    return null;
  }

  _getValidQuery() {
    const query = this.searchQuery.trim();
    if (!query.length) return;
    return encodeURIComponent(query);
  }

  _handleResponse(searchResults) {
    if (this.searchResults) {
      this.searchResults = {
        ...this.searchResults,
        items: this.searchResults.items.concat(searchResults.items),
      };
    } else {
      this.searchResults = searchResults;
    }
  }

  _handleError(err) {
    console.log('err:', err);
  }

  _handleCleanup(query) {
    this.searchQuery = '';
    this._prevSearch = query;
    this.isLoading = false;
  }

  @action submitSearch() {
    const query = this._getValidQuery();
    if (!query || this.isLoading) return;
    this.router.transitionTo('search-results');
    this.searchResults = null;
    this._prevSearch = null;
    this.isLoading = true;

    fetch(`${BOOKS_URL_BASE}${query}&key=${this.token}`)
      .then((res) => res.json())
      .then((data) => this._handleResponse(data))
      .catch((err) => this._handleError(err))
      .finally(() => this._handleCleanup(query));
  }

  @action loadMore() {
    if (!this._prevSearch || this.isLoading) return;
    this.isLoading = true;

    const itemCount = this.searchResults.items.length;
    fetch(
      `${BOOKS_URL_BASE}${this._prevSearch}&startIndex=${itemCount}&key=${this.token}`
    )
      .then((res) => res.json())
      .then((data) => this._handleResponse(data))
      .catch((err) => this._handleError(err))
      .finally(() => this._handleCleanup(this._prevSearch));
  }
}

export const fakeData = {
  kind: 'books#volumes',
  totalItems: 1757,
  items: [
    {
      kind: 'books#volume',
      id: 'HHIcCgAAQBAJ',
      etag: 'l8YXUsekJCY',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/HHIcCgAAQBAJ',
      volumeInfo: {
        title: 'Macbeth',
        authors: ['William Shakespeare'],
        publisher: 'Penguin',
        publishedDate: '2016-06-14',
        description:
          'The acclaimed Pelican Shakespeare series, now in a dazzling new series design Winner of the 2016 AIGA + Design Observer 50 Books | 50 Covers competition Gold Medal Winner of the 3x3 Illustration Annual No. 14 This edition of Macbeth is edited with an introduction by series editor Stephen Orgel. and was recently repackaged with cover art by Manuja Waldia. Waldia received a Gold Medal from the Society of Illustrators for the Pelican Shakespeare series. Cover artist Manuja Waldia received a Gold Medal from the Society of Illustrators for the Pelican Shakespeare series. The legendary Pelican Shakespeare series features authoritative and meticulously researched texts paired with scholarship by renowned Shakespeareans. Each book includes an essay on the theatrical world of Shakespeare’s time, an introduction to the individual play, and a detailed note on the text used. Updated by general editors Stephen Orgel and A. R. Braunmuller, these easy-to-read editions incorporate over thirty years of Shakespeare scholarship undertaken since the original series, edited by Alfred Harbage, appeared between 1956 and 1967. With stunning new covers, definitive texts, and illuminating essays, the Pelican Shakespeare will remain a valued resource for students, teachers, and theater professionals for many years to come. For more than seventy years, Penguin has been the leading publisher of classic literature in the English-speaking world. With more than 1,700 titles, Penguin Classics represents a global bookshelf of the best works throughout history and across genres and disciplines. Readers trust the series to provide authoritative texts enhanced by introductions and notes by distinguished scholars and contemporary authors, as well as up-to-date translations by award-winning translators.',
        industryIdentifiers: [
          {
            type: 'ISBN_13',
            identifier: '9780698410732',
          },
          {
            type: 'ISBN_10',
            identifier: '0698410734',
          },
        ],
        readingModes: {
          text: true,
          image: false,
        },
        pageCount: 144,
        printType: 'BOOK',
        categories: ['Drama'],
        averageRating: 5,
        ratingsCount: 4,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: true,
        contentVersion: '1.3.3.0.preview.2',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=HHIcCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=HHIcCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=HHIcCgAAQBAJ&printsec=frontcover&dq=macbeth&hl=&cd=1&source=gbs_api',
        infoLink:
          'https://play.google.com/store/books/details?id=HHIcCgAAQBAJ&source=gbs_api',
        canonicalVolumeLink:
          'https://play.google.com/store/books/details?id=HHIcCgAAQBAJ',
      },
      saleInfo: {
        country: 'US',
        saleability: 'FOR_SALE',
        isEbook: true,
        listPrice: {
          amount: 7.99,
          currencyCode: 'USD',
        },
        retailPrice: {
          amount: 7.99,
          currencyCode: 'USD',
        },
        buyLink:
          'https://play.google.com/store/books/details?id=HHIcCgAAQBAJ&rdid=book-HHIcCgAAQBAJ&rdot=1&source=gbs_api',
        offers: [
          {
            finskyOfferType: 1,
            listPrice: {
              amountInMicros: 7990000,
              currencyCode: 'USD',
            },
            retailPrice: {
              amountInMicros: 7990000,
              currencyCode: 'USD',
            },
            giftable: true,
          },
        ],
      },
      accessInfo: {
        country: 'US',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED_FOR_ACCESSIBILITY',
        epub: {
          isAvailable: true,
          acsTokenLink:
            'http://books.google.com/books/download/Macbeth-sample-epub.acsm?id=HHIcCgAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=HHIcCgAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'The acclaimed Pelican Shakespeare series, now in a dazzling new series design Winner of the 2016 AIGA + Design Observer 50 Books | 50 Covers competition Gold Medal Winner of the 3x3 Illustration Annual No. 14 This edition of Macbeth is ...',
      },
    },
    {
      kind: 'books#volume',
      id: 'Lm2OzgEACAAJ',
      etag: 'YZnV/Z7I5XQ',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/Lm2OzgEACAAJ',
      volumeInfo: {
        title: 'Macbeth',
        authors: ['William Shakespeare'],
        publishedDate: '2021-03-10',
        description:
          'Macbeth is among the best-known of William Shakespeare\'s plays, and is his shortest tragedy, believed to have been written between 1603 and 1606. It is frequently performed at both amateur and professional levels, and has been adapted for opera, film, books, stage and screen. Often regarded as archetypal, the play tells of the dangers of the lust for power and the betrayal of friends. For the plot Shakespeare drew loosely on the historical account of King Macbeth of Scotland by Raphael Holinshed and that by the Scottish philosopher Hector Boece. There are many superstitions centred on the belief the play is somehow "cursed", and many actors will not mention the name of the play aloud, referring to it instead as "The Scottish play".',
        industryIdentifiers: [
          {
            type: 'ISBN_13',
            identifier: '9798720038823',
          },
        ],
        readingModes: {
          text: false,
          image: false,
        },
        pageCount: 131,
        printType: 'BOOK',
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: 'preview-1.0.0',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=Lm2OzgEACAAJ&dq=macbeth&hl=&cd=2&source=gbs_api',
        infoLink:
          'http://books.google.com/books?id=Lm2OzgEACAAJ&dq=macbeth&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Macbeth.html?hl=&id=Lm2OzgEACAAJ',
      },
      saleInfo: {
        country: 'US',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'US',
        viewability: 'NO_PAGES',
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=Lm2OzgEACAAJ&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'NONE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'Macbeth is among the best-known of William Shakespeare&#39;s plays, and is his shortest tragedy, believed to have been written between 1603 and 1606.',
      },
    },
    {
      kind: 'books#volume',
      id: 'C20JtxCw-6MC',
      etag: 'JdTGnr8vgWI',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/C20JtxCw-6MC',
      volumeInfo: {
        title: 'Macbeth for Kids',
        authors: ['Lois Burdett', 'William Shakespeare'],
        publisher: 'Firefly Books',
        publishedDate: '1996',
        description:
          'Retells in rhyming couplets the Shakespearean tragedy about the eleventh-century Scottish king.',
        industryIdentifiers: [
          {
            type: 'ISBN_10',
            identifier: '0887532799',
          },
          {
            type: 'ISBN_13',
            identifier: '9780887532795',
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 64,
        printType: 'BOOK',
        categories: ['Juvenile Nonfiction'],
        averageRating: 4,
        ratingsCount: 2,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '0.1.1.0.preview.1',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=C20JtxCw-6MC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=C20JtxCw-6MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=C20JtxCw-6MC&printsec=frontcover&dq=macbeth&hl=&cd=3&source=gbs_api',
        infoLink:
          'http://books.google.com/books?id=C20JtxCw-6MC&dq=macbeth&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Macbeth_for_Kids.html?hl=&id=C20JtxCw-6MC',
      },
      saleInfo: {
        country: 'US',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'US',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=C20JtxCw-6MC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'Retells in rhyming couplets the Shakespearean tragedy about the eleventh-century Scottish king.',
      },
    },
    {
      kind: 'books#volume',
      id: '5BoYxQEACAAJ',
      etag: 'MvbQRwbi17I',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/5BoYxQEACAAJ',
      volumeInfo: {
        title: 'Macbeth',
        authors: ['William Shakespeare'],
        publisher: 'Collins',
        publishedDate: '2019-09-02',
        description:
          "Exam board: AQA, Edexcel, OCR, Eduqas; Cambridge Assessment International EducationLevel & Subject: GCSE 9-1 English Literature; IGCSE Literature in EnglishFirst teaching: September 2015; September 2018First examination: June 2017; June 2020This edition of Macbeth is perfect for GCSE-level students, with the complete play in an accessible format, on-page notes, introduction setting the context, timeline, character and theme indexes.* Affordable high quality complete play for Macbeth, ideal for GCSE 9-1 and IGCSE* Demystify vocabulary with notes on the page and concise commentary* Set the scene with perfectly pitched introductions that introduce key contexts, concerns and stylistic features, and examine different performances and interpretations* Recall plot summaries at the beginning of each scene* Support GCSE revision and essay writing with theme and character indexes* Help students with social, historical and literary context with the bespoke timeline of Shakespeare's life and times",
        industryIdentifiers: [
          {
            type: 'ISBN_10',
            identifier: '0008363609',
          },
          {
            type: 'ISBN_13',
            identifier: '9780008363604',
          },
        ],
        readingModes: {
          text: false,
          image: false,
        },
        pageCount: 240,
        printType: 'BOOK',
        averageRating: 5,
        ratingsCount: 4,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: 'preview-1.0.0',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=5BoYxQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=5BoYxQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=5BoYxQEACAAJ&dq=macbeth&hl=&cd=4&source=gbs_api',
        infoLink:
          'http://books.google.com/books?id=5BoYxQEACAAJ&dq=macbeth&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Macbeth.html?hl=&id=5BoYxQEACAAJ',
      },
      saleInfo: {
        country: 'US',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'US',
        viewability: 'NO_PAGES',
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=5BoYxQEACAAJ&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'NONE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'Exam board: AQA, Edexcel, OCR, Eduqas; Cambridge Assessment International EducationLevel &amp; Subject: GCSE 9-1 English Literature; IGCSE Literature in EnglishFirst teaching: September 2015; September 2018First examination: June 2017; June ...',
      },
    },
    {
      kind: 'books#volume',
      id: 'deksDwAAQBAJ',
      etag: 'asKbZDITO60',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/deksDwAAQBAJ',
      volumeInfo: {
        title: 'Macbeth',
        subtitle: "William Shakespeare's Macbeth Retold: A Novel",
        authors: ['Jo Nesbo'],
        publisher: 'Hogarth',
        publishedDate: '2018-04-10',
        description:
          "A NEW YORK TIMES NOTABLE BOOK OF 2018 Shakespeare’s dark and tragic play retold in a heart-pounding New York Times bestselling thriller from the author of The Snowman and The Thirst. Set in the 1970s in a run-down, rainy industrial town, Jo Nesbo's Macbeth centers around a police force struggling to shed an incessant drug problem. Duncan, chief of police, is idealistic and visionary, a dream to the townspeople but a nightmare for criminals. The drug trade is ruled by two drug lords, one of whom—a master of manipulation named Hecate—has connections with the highest in power, and plans to use them to get his way. Hecate’s plot hinges on steadily, insidiously manipulating Inspector Macbeth: the head of SWAT and a man already susceptible to violent and paranoid tendencies. What follows is an unputdownable story of love and guilt, political ambition, and greed for more, exploring the darkest corners of human nature, and the aspirations of the criminal mind.",
        industryIdentifiers: [
          {
            type: 'ISBN_13',
            identifier: '9780553419061',
          },
          {
            type: 'ISBN_10',
            identifier: '0553419064',
          },
        ],
        readingModes: {
          text: true,
          image: false,
        },
        pageCount: 464,
        printType: 'BOOK',
        categories: ['Fiction'],
        averageRating: 3,
        ratingsCount: 24,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: true,
        contentVersion: '1.5.5.0.preview.2',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=deksDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=deksDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=deksDwAAQBAJ&pg=PP1&dq=macbeth&hl=&cd=5&source=gbs_api',
        infoLink:
          'https://play.google.com/store/books/details?id=deksDwAAQBAJ&source=gbs_api',
        canonicalVolumeLink:
          'https://play.google.com/store/books/details?id=deksDwAAQBAJ',
      },
      saleInfo: {
        country: 'US',
        saleability: 'FOR_SALE',
        isEbook: true,
        listPrice: {
          amount: 7.99,
          currencyCode: 'USD',
        },
        retailPrice: {
          amount: 7.99,
          currencyCode: 'USD',
        },
        buyLink:
          'https://play.google.com/store/books/details?id=deksDwAAQBAJ&rdid=book-deksDwAAQBAJ&rdot=1&source=gbs_api',
        offers: [
          {
            finskyOfferType: 1,
            listPrice: {
              amountInMicros: 7990000,
              currencyCode: 'USD',
            },
            retailPrice: {
              amountInMicros: 7990000,
              currencyCode: 'USD',
            },
            giftable: true,
          },
        ],
      },
      accessInfo: {
        country: 'US',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED_FOR_ACCESSIBILITY',
        epub: {
          isAvailable: true,
          acsTokenLink:
            'http://books.google.com/books/download/Macbeth-sample-epub.acsm?id=deksDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=deksDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'Set in the 1970s in a run-down, rainy industrial town, Jo Nesbo&#39;s Macbeth centers around a police force struggling to shed an incessant drug problem.',
      },
    },
    {
      kind: 'books#volume',
      id: 'khVwAgAAQBAJ',
      etag: 'mS9ZZXjFZAM',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/khVwAgAAQBAJ',
      volumeInfo: {
        title: 'The Oxford Shakespeare: The Tragedy of Macbeth',
        authors: ['William Shakespeare', 'Nicholas Brooke'],
        publisher: 'Oxford Paperbacks',
        publishedDate: '2008-04-17',
        description:
          "Dark and violent, Macbeth is also the most theatrically spectacular of Shakespeare's tragedies. Indeed, for 250 years - until early this century - it was performed with grand operatic additions set to baroque music. In his introduction Nicholas Brooke relates the play's changing fortunes to changes within society and the theatre and investigates the sources of its enduring appeal. He examines its many layers of illusion and interprets its linguistic turns and echoes, arguing that the earliest surviving text is an adaptation, perhaps carried out by Shakespeare himself in collaboration with Thomas Middleton. This fully annotated edition reconsiders textual and staging problems, appraises past and present critical views, and represents a major contribution to our understanding of Macbeth. ABOUT THE SERIES: For over 100 years Oxford World's Classics has made available the widest range of literature from around the globe. Each affordable volume reflects Oxford's commitment to scholarship, providing the most accurate text plus a wealth of other valuable features, including expert introductions by leading authorities, helpful notes to clarify the text, up-to-date bibliographies for further study, and much more.",
        industryIdentifiers: [
          {
            type: 'ISBN_13',
            identifier: '9780199535835',
          },
          {
            type: 'ISBN_10',
            identifier: '0199535833',
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 249,
        printType: 'BOOK',
        categories: ['Drama'],
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '1.1.0.0.preview.1',
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=khVwAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=khVwAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=khVwAgAAQBAJ&printsec=frontcover&dq=macbeth&hl=&cd=6&source=gbs_api',
        infoLink:
          'http://books.google.com/books?id=khVwAgAAQBAJ&dq=macbeth&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/The_Oxford_Shakespeare_The_Tragedy_of_Ma.html?hl=&id=khVwAgAAQBAJ',
      },
      saleInfo: {
        country: 'US',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'US',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=khVwAgAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'This fully annotated edition reconsiders textual and staging problems, appraises past and present critical views, and represents a major contribution to our understanding of Macbeth.',
      },
    },
    {
      kind: 'books#volume',
      id: 'emcIO1ClmPAC',
      etag: 'zG7j99QQFgM',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/emcIO1ClmPAC',
      volumeInfo: {
        title: 'Macbeth',
        subtitle: 'The Graphic Novel: Quick Text',
        authors: ['William Shakespeare'],
        publisher: 'Classical Comics',
        publishedDate: '2008',
        description:
          "A revolution in graphic novels! Macbeth is probablythe most dramatic of Shakespeare's tragedies and thisabridged version is presented in full colour graphicnovel format.The dialogue is reduced to as few words as possiblewhile keeping the essence of the story. Coupled withstunning artwork, this publication is a must-have foranyone wanting to understand Shakespeare quickly.Key sales points:? The full story with less dialogue for a fast-pacedread.? Full colour graphic novel format.",
        industryIdentifiers: [
          {
            type: 'ISBN_13',
            identifier: '9781906332051',
          },
          {
            type: 'ISBN_10',
            identifier: '1906332053',
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 144,
        printType: 'BOOK',
        categories: ['Drama'],
        averageRating: 5,
        ratingsCount: 1,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '1.2.0.0.preview.1',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=emcIO1ClmPAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=emcIO1ClmPAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=emcIO1ClmPAC&printsec=frontcover&dq=macbeth&hl=&cd=7&source=gbs_api',
        infoLink:
          'http://books.google.com/books?id=emcIO1ClmPAC&dq=macbeth&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Macbeth.html?hl=&id=emcIO1ClmPAC',
      },
      saleInfo: {
        country: 'US',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'US',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=emcIO1ClmPAC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'Includes the story with less dialogue for a fast-paced read. It&#39;s 11th century Scotland. Macbeth, Thane of Glamis, is one of King Duncan&#39;s greatest war captains.',
      },
    },
    {
      kind: 'books#volume',
      id: '2WJ9x_PVVOQC',
      etag: 'mE+y58wuxcM',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/2WJ9x_PVVOQC',
      volumeInfo: {
        title: 'Macbeth',
        authors: ['William Shakespeare'],
        publisher: 'Oxford University Press, USA',
        publishedDate: '1871',
        description:
          "This exclusive collection of the Bard's works has been designed specifically for readers new to Shakespeare's rich literary legacy. Each of the plays is presented unabridged and in large print, copiously annotated and preceded by a character summary and commentary. Brief scene synopses clarify confusing plots, while incisive essays describe the historical context and Shakespeare's sources.",
        industryIdentifiers: [
          {
            type: 'OTHER',
            identifier: 'HARVARD:32044086738333',
          },
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 110,
        printType: 'BOOK',
        categories: ['English drama'],
        averageRating: 3,
        ratingsCount: 18,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '0.5.6.0.full.3',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=2WJ9x_PVVOQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=2WJ9x_PVVOQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=2WJ9x_PVVOQC&printsec=frontcover&dq=macbeth&hl=&cd=8&source=gbs_api',
        infoLink:
          'https://play.google.com/store/books/details?id=2WJ9x_PVVOQC&source=gbs_api',
        canonicalVolumeLink:
          'https://play.google.com/store/books/details?id=2WJ9x_PVVOQC',
      },
      saleInfo: {
        country: 'US',
        saleability: 'FREE',
        isEbook: true,
        buyLink:
          'https://play.google.com/store/books/details?id=2WJ9x_PVVOQC&rdid=book-2WJ9x_PVVOQC&rdot=1&source=gbs_api',
      },
      accessInfo: {
        country: 'US',
        viewability: 'ALL_PAGES',
        embeddable: true,
        publicDomain: true,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: true,
          downloadLink:
            'http://books.google.com/books/download/Macbeth.epub?id=2WJ9x_PVVOQC&hl=&output=epub&source=gbs_api',
        },
        pdf: {
          isAvailable: true,
          downloadLink:
            'http://books.google.com/books/download/Macbeth.pdf?id=2WJ9x_PVVOQC&hl=&output=pdf&sig=ACfU3U0CHNvpbWuzF40fCESrwcIMpR0meA&source=gbs_api',
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=2WJ9x_PVVOQC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'FULL_PUBLIC_DOMAIN',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'This exclusive collection of the Bard&#39;s works has been designed specifically for readers new to Shakespeare&#39;s rich literary legacy.',
      },
    },
    {
      kind: 'books#volume',
      id: 'PhQIGO82fbMC',
      etag: 'EoCanmVCpco',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/PhQIGO82fbMC',
      volumeInfo: {
        title: 'The Tragedie of Macbeth',
        subtitle: 'A Frankly Annotated First Folio Edition',
        authors: ['William Shakespeare', 'Demitra Papadinis'],
        publisher: 'McFarland',
        publishedDate: '2012-09-12',
        description:
          '"Preserves the First Folio of 1623 while at the same time providing the most comprehensive and plainspoken annotation to date. Shakespeare\'s plays were written as popular entertainments for adult audiences, this candid text offers anyone with interest inShakespeare a unique resource to gain valuable insights into the play and the world in which Shakespeare wrote"--Provided by publisher.',
        industryIdentifiers: [
          {
            type: 'ISBN_13',
            identifier: '9780786464791',
          },
          {
            type: 'ISBN_10',
            identifier: '0786464798',
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 434,
        printType: 'BOOK',
        categories: ['Literary Criticism'],
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '0.1.0.0.preview.1',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=PhQIGO82fbMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=PhQIGO82fbMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=PhQIGO82fbMC&printsec=frontcover&dq=macbeth&hl=&cd=9&source=gbs_api',
        infoLink:
          'http://books.google.com/books?id=PhQIGO82fbMC&dq=macbeth&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/The_Tragedie_of_Macbeth.html?hl=&id=PhQIGO82fbMC',
      },
      saleInfo: {
        country: 'US',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'US',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            'http://books.google.com/books/download/The_Tragedie_of_Macbeth-sample-pdf.acsm?id=PhQIGO82fbMC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=PhQIGO82fbMC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'As Shakespeare&#39;s works are most accessible when viewed as working theatrical playscripts, &quot;The Tragedie of Macbeth: A Frankly Annotated First Folio Edition&quot; preserves the spelling, capitalization, and punctuation of the First Folio of 1623 ...',
      },
    },
    {
      kind: 'books#volume',
      id: 'n_z06OOUlosC',
      etag: 'FmyVzjZZeog',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/n_z06OOUlosC',
      volumeInfo: {
        title: "William Shakespeare's Macbeth",
        subtitle: 'A Sourcebook',
        authors: ['Alexander Leggatt'],
        publisher: 'Taylor & Francis',
        publishedDate: '2006',
        description:
          "Containing annotated extracts from key sources, this guide to William Shakespeare's Macbeth explores the heated debates that this play has sparked. Looking at issues, such as the representation of gender roles, political violence and the dramatisation of evil, this volume provides a way through the wealth of contextual and critical material that surrounds Shakespeare's text.",
        industryIdentifiers: [
          {
            type: 'ISBN_10',
            identifier: '0415238242',
          },
          {
            type: 'ISBN_13',
            identifier: '9780415238243',
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 197,
        printType: 'BOOK',
        categories: ['Literary Criticism'],
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '0.1.3.0.preview.1',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=n_z06OOUlosC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=n_z06OOUlosC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com/books?id=n_z06OOUlosC&printsec=frontcover&dq=macbeth&hl=&cd=10&source=gbs_api',
        infoLink:
          'http://books.google.com/books?id=n_z06OOUlosC&dq=macbeth&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/William_Shakespeare_s_Macbeth.html?hl=&id=n_z06OOUlosC',
      },
      saleInfo: {
        country: 'US',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'US',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=n_z06OOUlosC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'Containing annotated extracts from key sources, this guide to William Shakespeare&#39;s Macbeth explores the heated debates that this play has sparked.',
      },
    },
  ],
};
