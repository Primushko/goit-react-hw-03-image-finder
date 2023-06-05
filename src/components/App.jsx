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

      if (!totalHits) {
        this.setState({ loading: false, error: true });
        toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
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

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    const { galleryItems, loading, isButtonShow, error } = this.state;
    return (
      <AppContent>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && <Button onClick={this.onLoadMore} />}
        <ToastContainer autoClose={3000} theme="dark" />
      </AppContent>
    );
  }
}
