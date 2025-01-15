export class Article {
  constructor(data) {
    this.description = data.descripcion;
    this.price = data.precioVentaConIva;
  }

  getFormattedPrice() {
    return this.price.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  hasValidPrice() {
    return this.price > 0;
  }
}

export class PriceListItem {
  constructor(data) {
    this.id = data.articuloListaPrecioId;
    this.article = new Article(data.articulo);
  }

  shouldDisplay() {
    return this.article.hasValidPrice();
  }
} 