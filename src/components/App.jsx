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
    // Якщо змінився пошуковий запит, він скидає `galleryPage` на 1 і очищує galleryItems
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
      postApiService.hits = data.totalHits;

      const newData = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
      const currentData = [...this.state.galleryItems, ...newData];

      this.setState(prevState => ({
        galleryItems: [...prevState.galleryItems, ...newData],
      }));

      if (!data.totalHits) {
        this.setState({ loading: false, error: true });
        return toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (currentData.length >= data.totalHits) {
        this.setState({
          loading: false,
          isButtonShow: false,
          error: false,
        });
        return;
      }

      if (nextPage === 1) {
        toast.success(`Hooray! We found ${postApiService.hits} images.`);
      }

      this.setState({
        loading: false,
        isButtonShow: true,
        error: false,
      });
    });
  };

  handleFormSubmit = searchQuery => {
    // викликається при відправці форми пошуку і оновлює `searchQuery` у стані компонента.
    this.setState({ searchQuery });
  };

  onLoadMore = () => {
    // викликається при натисканні на кнопку "Load More" і збільшує значення `galleryPage` у стані компонента.
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    // рендерить компонент і його дочірні елементи, включаючи пошукову панель,
    // галерею зображень, індикатор завантаження та кнопку "Load More".
    const { galleryItems, loading, isButtonShow, error } = this.state;

    return (
      <AppContent>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* відображає компонент `Searchbar` і передає йому функцію `handleFormSubmit` як властивість `onSubmit`. */}
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {/* відображає компонент `ImageGallery` лише в тому випадку, якщо `error` дорівнює `false`.  */}
        {loading && <Loader />}
        {/*  відображає компонент `Loader` лише тоді, коли `loading` дорівнює `true` */}
        {isButtonShow && <Button onClick={this.onLoadMore} />}
        {/*  відображає компонент `Button` лише тоді, коли `isButtonShow` дорівнює `true`. */}
        <ToastContainer autoClose={3000} theme="dark" />
      </AppContent>
      // компонент ToastContainer використовується для відображення спливаючих повідомлень з
      // допомогою бібліотеки `react-toastify`
      // використовується темна тема (theme="dark"), і кожен
      // тост автоматично закривається після 3 секунд (autoClose={3000}).
    );
  }
}
