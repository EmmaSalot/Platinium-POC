"use client";

import { useState } from "react";
import { loginDab } from "platinium_services";
import styles from "./page.module.css";

export default function DABLoginPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginDab(cardNumber, pinCode);
      setMessageType("success");
      setMessage("Connexion réussie");
      window.localStorage.setItem("token", result.token);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      setMessageType("error");
      setMessage("Numéro de carte ou code PIN incorrect.");
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

        <h1 className={styles.title}>Connexion DAB</h1>
        <p className={styles.subtitle}>Accédez à vos services de retrait</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="card">Numéro de carte</label>
            <input
              id="card"
              type="text"
              className={styles.input}
              placeholder="Ex: 1234 5678 9012"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="pin">Code PIN</label>
            <input
              id="pin"
              type="password"
              className={styles.input}
              placeholder="••••"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Accéder à mon espace"}
          </button>
        </form>

        {message && (
          <div className={`${styles.message} ${styles[messageType]}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
