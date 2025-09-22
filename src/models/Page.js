import { PriceListItem } from './Article';

export class PageResponse {
  constructor(data) {
    // Extraer la lista de artículos del _embedded
    this.content = data._embedded?.articuloListaPrecioDtoList?.map(item => new PriceListItem(item)) || [];
    
    // Extraer información de paginación de los links
    const lastLink = data._links?.last?.href || '';
    const pageMatch = lastLink.match(/page=(\d+)/);
    // Si no hay lastLink, asumimos que hay al menos una página
    this.totalPages = pageMatch ? parseInt(pageMatch[1]) + 1 : 1;
    
    // Información adicional
    this.number = 0; // Simplificamos esto ya que no viene en la respuesta
    this.size = 24;
    this.first = true; // Simplificamos estos valores
    this.last = !data._links?.next;
    this.empty = this.content.length === 0;

    // Asegurarnos que totalPages sea al menos 1
    if (this.totalPages < 1) this.totalPages = 1;

    // Debug
    console.log('Datos recibidos:', data);
    console.log('Artículos procesados:', this.content);
  }
} 