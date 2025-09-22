import axiosInstance from '../config/axios';
import { PriceListItem } from '../models/Article';
import { PageResponse } from '../models/Page';

const PAGE_SIZE = 24;

export class ArticleService {
  static instance;

  static getInstance() {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

  async getArticlesPaginated(page = 0, size = PAGE_SIZE) {
    try {
      const { data } = await axiosInstance.get(`/articuloListaPrecio/page`, {
        params: { page, size }
      });
      
      if (!data._embedded?.articuloListaPrecioList) {
        if (page > 0) {
          return this.getArticlesPaginated(0, size);
        }
        throw new Error('Formato de respuesta inválido');
      }
      
      return new PageResponse(data);
    } catch (error) {
      console.error('Error en articleService:', error);
      throw error;
    }
  }

  async getArticleById(id) {
    try {
      const { data } = await axiosInstance.get(`/articuloListaPrecio/${id}`);
      return new PriceListItem(data);
    } catch (error) {
      console.error(`Error al obtener el artículo ${id}:`, error);
      throw error;
    }
  }

  async getArticlesPaginatedByRubro(rubroId, page = 0, size = PAGE_SIZE) {
    try {
      const { data } = await axiosInstance.get(`/articuloListaPrecio/rubro/${rubroId}/page`, {
        params: { 
          page, 
          size
        }
      });

      if (!data._embedded?.articuloListaPrecioDtoList) {
        return new PageResponse({ _embedded: { articuloListaPrecioDtoList: [] } });
      }
      console.log("getArticlesPaginatedByRubro -> ", data);

      return new PageResponse(data);
    } catch (error) {
      console.error('Error en articleService:', error);
      throw error;
    }
  }
}

export const articleService = ArticleService.getInstance(); 