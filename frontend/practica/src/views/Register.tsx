import { useState } from "react";
import { AuthRegister } from "../composables/AuthComposables";

type Register = {
  setAuth: () => void;
};

export function Register({ setAuth }: Register) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const IMAGE_STORE_KEY = "userImageMap";

  const saveImageForEmail = (targetEmail: string, url: string) => {
    if (!targetEmail) return;
    try {
      const raw = localStorage.getItem(IMAGE_STORE_KEY);
      const map = raw ? (JSON.parse(raw) as Record<string, string>) : {};
      if (url) {
        map[targetEmail] = url;
      } else {
        delete map[targetEmail];
      }
      localStorage.setItem(IMAGE_STORE_KEY, JSON.stringify(map));
    } catch {
      // Silently ignore storage errors.
    }
  };

  const data = {
    username: name,
    email: email,
    password: password,
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await AuthRegister(data);

    if (response) {
      saveImageForEmail(email.trim(), imageUrl);
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email corporativo
            <input
              type="email"
              placeholder="nombre@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Imagen
            <input
              type="url"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          {imageUrl ? (
            <div className="image-preview">
              <img src={imageUrl} alt="Previsualizacion" />
              <button
                type="button"
                className="ghost small"
                onClick={() => setImageUrl("")}
              >
                Quitar imagen
              </button>
            </div>
          ) : null}
          <button type="submit" className="primary full">
            Crear cuenta
          </button>
        </form>
      </div>
    </section>
  );
}
