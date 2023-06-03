import { Component } from 'react';
import { Overlay, ModalContent } from './Modal.module';

export class Modal extends Component {
  componentDidMount() {
    // метод додає обробник події keydown на вікні браузера.
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    // метод видаляє обробник події keydown на вікні браузера.
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    // У разі натискання клавіші Escape, викликається функція onCloseModal яка передається як пропс.
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    //обробляє клік на задньому фоні модального вікна.
    if (currentTarget === target) {
      this.props.onCloseModal();
    }
  };

  render() {
    // Метод render відображає компонент Modal з обгорткою Overlay та вміщуємим вмістом ModalContent.
    const { largeImageURL, alt } = this.props;
    return (
      <Overlay className="overlay" onClick={this.handleBackdropClick}>
        <ModalContent className="modal">
          <img src={largeImageURL} alt={alt} />
          {/* Зображення відображається за допомогою тегу <img> з властивостями src та alt */}
        </ModalContent>
      </Overlay>
    );
  }
}
