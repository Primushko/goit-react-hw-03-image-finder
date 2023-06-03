import { Component } from 'react';
import { toast } from 'react-toastify'; // для показу повідомлень
import { SearchbarHeader, Form, Button, Input } from './Searchbar.module'; // стилізація
// Компонент пошуку
export default class Searchbar extends Component {
  state = {
    searchQuery: ``,
  };
  // метод handleQueryChange викликається при зміні значення в полі введення. Він оновлює стан `searchQuery`
  // у компоненті на основі введеного значення,
  handleQueryChange = ({ currentTarget: { value } }) => {
    this.setState({ searchQuery: value.toLowerCase() });
  };
  // Метод `handleSubmit`викликається при відправці форми. Він перевіряє, чи введено пошуковий запит (по `searchQuery`),
  // якщо ні, то виводить повідомлення `toast` з пропозицією ввести пошукове слово.
  handleSubmit = e => {
    const searchQuery = this.state.searchQuery.trim();
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.info('Please, enter search word!');
      return;
    }
    //Якщо запит введено, він викликає функцію `onSubmit`, яка передається через властивість onSubmit компонента.
    // Після цього стан searchQuery скидається до пустого рядка.
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };
  // Метод render рендерить компонент Searchbar і його елементи, включаючи форму з полем введення `Input` і кнопкою `Button`.
  render() {
    const { searchQuery } = this.state;
    return (
      <SearchbarHeader className="searchbar">
        <Form className="form" onSubmit={this.handleSubmit}>
          <Input
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search photos"
            name="searchQuery"
            value={searchQuery}
            onChange={this.handleQueryChange}
          />
          <Button type="submit" className="button">
            <span className="button-label">Search</span>
          </Button>
        </Form>
      </SearchbarHeader>
    );
  }
}
