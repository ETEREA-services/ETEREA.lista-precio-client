import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';
import { rubroService } from '../services/rubroService';
import axios from 'axios';
import './PriceList.css';

function PriceList() {
  const [articles, setArticles] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [currentRubroIndex, setCurrentRubroIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRubro, setCurrentRubro] = useState(null);

  // Cargar rubros al inicio
  useEffect(() => {
    loadRubros();
  }, []);

  // Efecto para cambiar de página/rubro cada 10 segundos
  useEffect(() => {
    if (rubros.length === 0) return;

    const checkAndUpdatePage = async () => {
      try {
        const response = await articleService.getArticlesPaginatedByRubro(
          rubros[currentRubroIndex]?.rubroId,
          currentPage
        );

        // Si no hay artículos o la lista está vacía, pasar al siguiente rubro
        if (!response.content || response.content.length === 0) {
          setCurrentRubroIndex(current => (current + 1) % rubros.length);
          setCurrentPage(0); // Reiniciar la página para el nuevo rubro
          return;
        }

        setCurrentPage(current => current + 1);
      } catch (error) {
        console.error('Error en la paginación automática:', error);
        // Si hay error, intentar con el siguiente rubro
        setCurrentRubroIndex(current => (current + 1) % rubros.length);
        setCurrentPage(0);
      }
    };

    const timer = setInterval(checkAndUpdatePage, 10000);
    return () => clearInterval(timer);
  }, [rubros, currentRubroIndex]);

  // Efecto para cargar artículos cuando cambia el rubro o la página
  useEffect(() => {
    if (rubros.length > 0) {
      const rubro = rubros[currentRubroIndex];
      setCurrentRubro(rubro);
      loadArticles(currentPage);
      console.log('Cambiando a rubro:', rubro?.etiqueta);
    }
  }, [currentRubroIndex, currentPage, rubros]);

  const loadRubros = async () => {
    try {
      const rubrosData = await rubroService.getRubros();
      console.log("loadRubros -> ", rubrosData);
      setRubros(rubrosData);
      setError(null);
    } catch (error) {
      setError('Error al cargar los rubros');
    }
  };

  const loadArticles = async (page) => {
    try {
      setIsLoading(true);
      const currentRubroId = rubros[currentRubroIndex]?.rubroId;
      if (!currentRubroId) return;

      const response = await articleService.getArticlesPaginatedByRubro(currentRubroId, page);
      console.log(response)
      
      // Si no hay artículos en esta página, cambiar al siguiente rubro
      if (!response.content || response.content.length === 0) {
        setCurrentRubroIndex(current => (current + 1) % rubros.length);
        setCurrentPage(0);
        return;
      }

      setArticles(response.content);
      setError(null);
    } catch (error) {
      let errorMessage = 'Error al cargar los artículos';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="price-list">
        <div className="container text-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="price-list">
        <div className="container">
          <div className="alert alert-danger" role="alert">
            {error}
            <button 
              className="btn btn-outline-light ms-3"
              onClick={() => loadArticles(currentPage)}
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="price-list">
      {currentRubro && (
        <div className="rubro-header">
          <div className="container">
            <h2 className="rubro-title">{currentRubro.etiqueta}</h2>
          </div>
        </div>
      )}
      <div className="container-fluid px-4 price-list-container">
        <div className="price-cards-container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4">
            {articles.map((item) => (
              <div key={item.id} className="col">
                <div className="price-card card">
                  <div className="card-body">
                    <h5 className="price-title">{item.article.description}</h5>
                    <div className="price-value">
                      ${item.article.getFormattedPrice()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceList; 