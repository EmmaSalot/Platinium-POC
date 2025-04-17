"use client";
import { useState } from "react";
import { login } from "platinium_services";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login(username, password);
      setMessage(`Connexion réussie : ${JSON.stringify(result)}`);
      // Optionnel : rediriger ici si besoin (vers dashboard, etc.)
    } catch (error) {
      setMessage("Connexion échouée.");
    }
  };

  return (
    <main
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <h2>Connexion</h2>
        <input
          type="text"
          placeholder="Identifiant"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Accéder à mon compte</button>
        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </form>
    </main>
  );
}
