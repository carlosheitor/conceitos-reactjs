import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  async function handleAddRepository(event: FormEvent) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const url = document.getElementById("url").value;
    const techsString = document.getElementById("techs").value;
    const techs = techsString.split(",");

    api
      .post("repositories", { title, url, techs })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (err) {
      console.log(`Cannot list repositories. Cause ${err.message}.`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>
      <form onSubmit={handleAddRepository}>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div>
            <label htmlFor="url">url</label>
            <input type="text" name="url" id="url" />
          </div>
          <div>
            <label htmlFor="techs">Techs</label>
            <input type="text" name="techs" id="techs" />
          </div>
        </fieldset>
        <button>Adicionar</button>
      </form>
    </div>
  );
}

export default App;
