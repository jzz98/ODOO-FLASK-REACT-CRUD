import { useState } from "react";
import { AuthLogin } from "../composables/AuthComposables";
import type { Data } from "../composables/AuthComposables";

type Login = {
  setAuth: () => void;
};

export function Login({ setAuth }: Login) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const data: Data = {
    email: email,
    password: password,
  };

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await AuthLogin(data);

    if (response) {
      console.log(response);
      alert(response?.message);
      setAuth();
    }
  };

  return (
    <section className="auth auth-single">
      <div className="auth-card">
        <h1>Bienvenido de nuevo</h1>
        <p>Accede al panel con tus credenciales seguras.</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              placeholder="tu@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="form-row">
            <label className="checkbox">
              <input type="checkbox" /> Recordarme
            </label>
            <button type="button" className="link">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <button type="submit" className="primary full">
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}
