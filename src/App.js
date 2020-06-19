import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, [handleRemoveRepository]);

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Umbriel ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"],
      likes: 0,
    };
    api.post("repositories", repository).then((response) => {
      console.log(response);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((response) => {
      setRepositories(response.data);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repo) => {
            return (
              <li key={repo.id}>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            );
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
