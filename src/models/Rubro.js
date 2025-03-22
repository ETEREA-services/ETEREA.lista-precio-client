export class Rubro {
  constructor(data) {
    this.id = data.rubroListaPrecioId;
    this.rubroId = data.rubroId;
    this.etiqueta = data.etiqueta;
    this.publicar = data.publicar === 1;
  }
} 