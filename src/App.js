//import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
    //Esto se usa si la funcion que queremos usar no es una arrow function. Tenemos que hacerlo manualmente
    //this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const users = await response.json();

    this.setState({ monsters: users });
  }

  handleChange = e => this.setState({ searchField: e.target.value });

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
      <h1>Monster Rolodex</h1>
        <SearchBox
          placeHolder="Search Monster"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
