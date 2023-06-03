const KEY = '36992925-08055682156c93c394260c095';
const URL = 'https://pixabay.com/api/?';

const options = new URLSearchParams([
  ['orientation', 'horizontal'],
  ['safesearch', 'true'],
  ['per_page', 12],
  ['image_type', 'photo'],
]);

export function fetchByName(name) {
  return fetch(`${URL}q=${name}&key=${KEY}&page=1&${options}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Oops Something Went Wrong'));
    }
  );
}

export function pagination(name, pageNumber) {
  return fetch(`${URL}q=${name}&key=${KEY}&page=${pageNumber}&${options}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Oops Something Went Wrong'));
    }
  );
}
