import { useState } from "react";
import { AuthRegister } from "../composables/AuthComposables";

type Register = {
  setAuth: () => void;
};

export function Register({ setAuth }: Register) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    username: name,
    email: email,
    password: password,
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await AuthRegister(data);

    if (response) {
      console.log(response);
      alert(response.message);
      setAuth();
    }
  };

  return (
    <section className="auth auth-single">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p>Empieza a administrar usuarios en minutos.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Nombre completo
            <input
              type="text"
              placeholder="Nombre y apellido"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email corporativo
            <input
              type="email"
              placeholder="nombre@empresa.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="primary full">
            Crear cuenta
          </button>
        </form>
      </div>
    </section>
  );
}
