import { Modal } from 'components/Modal/Modal';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.module';
import { Component } from 'react';
// компонент `ImageGalleryItem` відображає елемент галереї з зображенням.
//Коли користувач клікає на зображення, відкривається модальне вікно, яке показує велике зображення.
export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false, // початковий стан `isModalOpen` визначає, чи відкрите модальне вікно
  };

  toggleModal = () => {
    // Метод `toggleModal` встановлює стан `isModalOpen` протилежним до поточного значення.
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  }; // дозволяє відкривати або закривати модальне вікно після кліку на елемент галереї.

  render() {
    const {
      galleryItem: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <>
        <GalleryItem className="gallery-item" onClick={this.toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onCloseModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
