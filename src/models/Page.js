import { PriceListItem } from './Article';

export class PageResponse {
  constructor(data) {
    this.content = data.content.map(item => new PriceListItem(item));
    this.totalPages = data.totalPages;
    this.totalElements = data.totalElements;
    this.size = data.size;
    this.number = data.number;
    this.first = data.first;
    this.last = data.last;
    this.empty = data.empty;
  }
} 