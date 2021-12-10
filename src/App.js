import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "./configs/api";
import "./style.css";

function App() {
  const [values, setValues] = useState("");
  const [data, setData] = useState({});

  const onChange = (e) => {
    setValues(e.target.value);
    return;
  };

  function verification(dataCep) {
    if (Object.keys(dataCep.data).length === 1) {
      alert("Verifique o campo preenchido e tente novamente!");
    }
  }

  async function searchCep() {
    if (values === "") {
      alert("Preencha o campo com algum CEP válido!");
      return;
    }
    try {
      const dataCep = await api.get(`${values}/json`);
      setData(dataCep.data);
      verification(dataCep);
      setValues("");
    } catch {
      alert("Erro ao buscar, verifique o campo preenchido e tente novamente!");
      setValues("");
    }
  }

  return (
    <main className="container">
      <h1 className="title">Buscador</h1>
      <section className="cont-input">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={values}
          onChange={onChange}
        />
        <button onClick={searchCep}>
          <FiSearch size={25} color="#121212" />
        </button>
      </section>
      {Object.keys(data).length > 1 && (
        <section className="cont-search">
          <h3>CEP: {data.cep}</h3>
          <p>Localidade: {data.localidade}</p>
          <p>Logradouro: {data.logradouro}</p>
          <p>Bairro: {data.bairro}</p>
          <p>DDD: {data.ddd}</p>
          <p>UF: {data.uf}</p>
        </section>
      )}
    </main>
  );
}

export default App;
