import axiosInstance from '../config/axios';
import { Rubro } from '../models/Rubro';

export class RubroService {
  static instance;

  static getInstance() {
    if (!RubroService.instance) {
      RubroService.instance = new RubroService();
    }
    return RubroService.instance;
  }

  async getRubros() {
    try {
      const { data } = await axiosInstance.get('/rubroListaPrecio/');
      console.log("getRubros -> ", data);
      // Transformar la respuesta HAL en objetos Rubro
      const rubros = data._embedded?.rubroListaPrecioDtoList || [];
      console.log("rubros -> ", rubros);
      return rubros.map(rubro => new Rubro(rubro)).filter(rubro => rubro.publicar);
    } catch (error) {
      console.error('Error en rubroService:', error);
      throw error;
    }
  }
}

export const rubroService = RubroService.getInstance(); 