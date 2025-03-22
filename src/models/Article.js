export class Article {
  constructor(data) {
    this.description = data.descripcion;
    this.price = data.precioVentaConIva || 0;
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
    this.id = data.articuloListaPrecioId || data.articuloId;
    this.article = new Article(data.articulo || data);
    this.publish = data.publicar === 1;
    this.links = data._links;
  }

  shouldDisplay() {
    return this.article.hasValidPrice() && this.publish;
  }
} 