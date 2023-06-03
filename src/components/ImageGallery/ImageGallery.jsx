import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.module';
// компонент `ImageGallery`приймає масив об'єктів `galleryItems` та відображає галерею зображень,
// де кожен елемент галереї представлений компонентом `ImageGalleryItem`
export const ImageGallery = ({ galleryItems }) => {
  return (
    <Gallery>
      {galleryItems.map(galleryItem => {
        return (
          <ImageGalleryItem key={galleryItem.id} galleryItem={galleryItem} />
        );
      })}
    </Gallery>
  );
};
// метод `map`створює компонент `ImageGalleryItem` для кожного об'єкта `galleryItem` в масиві.
// Кожен елемент отримує унікальний ключ `key` на основі `id` об'єкта `galleryItem`,
//  і передається сам об'єкт `galleryItem` через проп `galleryItem`.
