import { Vortex } from 'react-loader-spinner'; // відображення анімації завантаження.

export const Loader = () => {
  // функція `Loader` повертає компонент `Vortex`, який відображує анімацію завантаження.
  return (
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      // Властивість `colors` приймає масив кольорів, які використовуються для створення кольорової палітри для анімації.
    />
  );
};
