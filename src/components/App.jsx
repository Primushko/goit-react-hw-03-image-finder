import { Component } from 'react';
// бібліотеку react-toastify для стилізації та відображення спливаючих повідомлень.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsApiService from 'services/PostApiService';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { AppContent } from './App.module';

const postApiService = new PostsApiService();

export class App extends Component {
  state = {
    searchQuery: ``,
    galleryItems: [],
    galleryPage: 1,
    loading: false,
    isButtonShow: false,
    error: true,
  };

  componentDidUpdate(_, prevState) {
    // Метод `componentDidUpdate`, який викликається після оновлення компонента і порівнює попередній
    // стан з поточним станом. Він виконує дії залежно від змін у searchQuery та galleryPage.
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.galleryPage;
    const nextPage = this.state.galleryPage;
    // Якщо змінився пошуковий запит 'searchQuery', він скидає `galleryPage` на 1 і очищує galleryItems
    // Якщо `galleryPage` залишається 1, він викликає `fetchGalleryItems` для отримання нових елементів галереї.
    if (prevQuery !== nextQuery) {
      this.setState({ galleryPage: 1, galleryItems: [], isButtonShow: false });
      if (nextPage === 1) {
        this.fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage) => {
    // виконує запит до API для отримання елементів галереї з вказаним запитом та сторінкою.
    // Він також оновлює стан компонента залежно від результатів запиту.
    this.setState({ loading: true, error: false });

    postApiService.query = nextQuery;
    postApiService.page = nextPage;

    postApiService.fetchPost().then(data => {
      const { totalHits, hits } = data;
      const newData = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      }));
      const updatedGalleryItems = [...this.state.galleryItems, ...newData];
      this.setState({
        galleryItems: updatedGalleryItems,
      });
      // Якщо немає збігів (`totalHits`), встановлюється стан `error` на `true` і виводиться повідомлення про помилку.
      if (!totalHits) {
        this.setState({ loading: false, error: true });
        toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        // Якщо кількість елементів галереї (`updatedGalleryItems`) дорівнює загальній кількості збігів (`totalHits`),
        // то встановлюються стани `loading` та `isButtonShow` на `false`. Якщо сторінка галереї
        //(`nextPage`) дорівнює 1, то виводиться повідомлення про успіх
      } else if (updatedGalleryItems.length >= totalHits) {
        this.setState({
          loading: false,
          isButtonShow: false,
          error: false,
        });
      } else if (nextPage === 1) {
        toast.success(`Hooray! We found ${totalHits} images.`);
        this.setState({
          loading: false,
          isButtonShow: true,
          error: false,
        });
      } else {
        this.setState({
          loading: false,
          isButtonShow: true,
          error: false,
        });
      }
    });
  };
  // Метод `handleFormSubmit` викликається при поданні форми пошуку і оновлює стан `searchQuery` з переданим пошуковим запитом.
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  // Метод `onLoadMore` викликаємо при натисканні на "Завантажити ще" і оновлює стан `galleryPage`, збільшуючи його значення на 1.
  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };
  // В методі `render` відбувається відображення компонентів на основі стану.
  render() {
    const { galleryItems, loading, isButtonShow, error } = this.state;
    return (
      // `Searchbar` для введення пошукового запиту.
      //Якщо `error` має значення `false`, показується компонент `ImageGallery` з переданими елементами галереї.
      //Якщо `loading` має значення `true`, показується компонент `Loader` для відображення індікатора завантаження.
      //Якщо `isButtonShow` має значення `true`, показується кнопка "Завантажити ще"
      // (`Button`) для завантаження наступної сторінки галереї.
      <AppContent>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && <Button onClick={this.onLoadMore} />}
        <ToastContainer autoClose={3000} theme="dark" />
        {/* 'ToastContainer' відображення спливаючих повідомлень. */}
      </AppContent>
    );
  }
}
