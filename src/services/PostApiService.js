import axios from 'axios'; //зовнішня бібліотека для здійснення HTTP-запитів.

const BASE_URL = 'https://pixabay.com/api/'; // URL-адресу для запитів до API Pixabay
const API_KEY = '36992925-08055682156c93c394260c095'; // мій ключ доступу до API.

export default class PostsApiService {
  // PostsApiService експортується як функція за допомогою export default.
  constructor() {
    // Конструктор встановлює початкові значення для властивостей
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async fetchPost() {
    // Асинхронний метод виконує запит до API Pixabay для отримання зображень
    const OPTIONS = new URLSearchParams({
      // параметрами запиту
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 12,
    });
    // метод використовує axios для виконання GET-запиту з параметрами запиту,
    // які відповідають значенням властивостей об'єкта searchQuery, page
    try {
      const response = await axios.get(`${BASE_URL}?${OPTIONS.toString()}`);
      this.incrementPage();
      return response.data;
      // Якщо запит успішний, метод збільшує значення властивості page
      // за допомогою методу incrementPage(), і повертає дані відповіді.
    } catch (error) {
      console.error(error.toJSON()); // Якщо запит не вдається, відображається помилка в консолі.
    }
  }
  // Геттер і сеттер  методи дозволяють отримати поточне значення searchQuery
  // та встановити нове значення
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  // Геттер і сеттер для hits - методи дозволяють отримати поточне значення
  // totalHits, яке відповідає кількості результатів пошуку, і встановити нове значення для totalHits
  get hits() {
    return this.totalHits;
  }

  set hits(newTotalHits) {
    this.totalHits = newTotalHits;
  }

  incrementPage() {
    // Цей метод збільшує значення властивості page на 1.
    // page відповідає номеру сторінки результатів пошуку.
    this.page += 1;
  }

  resetPage() {
    // Цей метод встановлює значення властивості page на 1,
    // що дає змогу скинути сторінку результатів пошуку до початкового значення.
    this.page = 1;
  }
}
