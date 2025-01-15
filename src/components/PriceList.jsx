import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';
import axios from 'axios';
import './PriceList.css';

function PriceList() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage(current => (current + 1) % totalPages);
    }, 10000);

    return () => clearInterval(timer);
  }, [totalPages]);

  const loadArticles = async (page) => {
    try {
      setIsLoading(true);
      const response = await articleService.getArticlesPaginated(page);
      const validArticles = response.content.filter(item => item.shouldDisplay());
      setArticles(validArticles);
      setTotalPages(response.totalPages);
      setError(null);
    } catch (error) {
      let errorMessage = 'Error al cargar los artículos. Por favor, intente nuevamente.';
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