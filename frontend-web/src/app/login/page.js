"use client";
import { useState } from "react";
import { login } from "platinium_services";
import styles from "./page.module.css";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(username, password);
      setMessageType("success");
      setMessage("Connexion réussie");
      window.localStorage.setItem("token", result.token);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      setMessageType("error");
      setMessage("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <svg
            width="280"
            height="60"
            viewBox="0 0 280 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="280" height="60" rx="4" fill="#002D62" />
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              style={{
                fontFamily: "sans-serif",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              PLATINIUM BANQUE
            </text>
          </svg>
        </div>

        <div className={styles.vaultIcon}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8L12 2L22 8H2Z"
              fill="#CCCCCC"
              stroke="#888888"
              strokeWidth="0.5"
            />

            <circle cx="12" cy="5" r="1" fill="#888888" />

            <rect
              x="3"
              y="8"
              width="18"
              height="14"
              fill="#CCCCCC"
              stroke="#888888"
              strokeWidth="0.5"
            />

            <rect x="2" y="22" width="20" height="1" fill="#888888" />

            <rect x="3" y="10" width="18" height="0.5" fill="#888888" />
            <rect x="3" y="12" width="18" height="0.5" fill="#888888" />

            <rect
              x="5"
              y="13"
              width="2"
              height="9"
              fill="#CCCCCC"
              stroke="#888888"
              strokeWidth="0.5"
            />

            <rect
              x="17"
              y="13"
              width="2"
              height="9"
              fill="#CCCCCC"
              stroke="#888888"
              strokeWidth="0.5"
            />

            <rect
              x="9"
              y="13"
              width="6"
              height="9"
              fill="#AAAAAA"
              stroke="#888888"
              strokeWidth="0.5"
            />

            <rect x="10.5" y="16" width="3" height="6" fill="#888888" />

            <rect
              x="8"
              y="13"
              width="1"
              height="9"
              fill="#CCCCCC"
              stroke="#888888"
              strokeWidth="0.5"
            />
            <rect
              x="15"
              y="13"
              width="1"
              height="9"
              fill="#CCCCCC"
              stroke="#888888"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        <h1 className={styles.title}>Bienvenue</h1>
        <p className={styles.subtitle}>
          Connectez-vous à votre espace bancaire
        </p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Identifiant</label>
            <input
              id="username"
              type="text"
              className={styles.input}
              placeholder="Entrez votre identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Accéder à mon compte"}
          </button>
        </form>

        {message && (
          <div className={`${styles.message} ${styles[messageType]}`}>
            {message}
          </div>
        )}

        <div className={styles.footer}>
          <p>
            Vous avez oublié vos identifiants ? <a href="#">Cliquez ici</a>
          </p>
          <p style={{ marginTop: "10px" }}>
            Première connexion ? <a href="#">Activer mon compte</a>
          </p>
        </div>
      </div>
    </div>
  );
}
