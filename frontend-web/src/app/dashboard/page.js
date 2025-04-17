"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { logout } from "platinium_services";

export default function DashboardPage() {
  const deconnexion = async (e) => {
    e.preventDefault();
    const terminal = await logout(window.localStorage.getItem("token"));
    if (terminal.terminal == "dab") {
      window.location.href = "/dab-login";
    } else {
      window.location.href = "/login";
    }
  };

  const accounts = [
    {
      id: 1,
      type: "Compte Courant",
      number: "FR76 3000 1234 5678 9000 1234 567",
      balance: 2458.92,
      currency: "€",
    },
    {
      id: 2,
      type: "Livret A",
      number: "FR76 3000 1234 5678 9000 3456 789",
      balance: 15785.33,
      currency: "€",
    },
    {
      id: 3,
      type: "Plan Épargne Logement",
      number: "FR76 3000 1234 5678 9000 5678 901",
      balance: 42150.67,
      currency: "€",
    },
  ];

  const transactions = [
    {
      id: 1,
      date: "18/07/2023",
      description: "Virement Salaire",
      amount: 2350.0,
      type: "credit",
    },
    {
      id: 2,
      date: "15/07/2023",
      description: "Loyer Appartement",
      amount: -850.5,
      type: "debit",
    },
    {
      id: 3,
      date: "12/07/2023",
      description: "Courses Supermarché",
      amount: -123.45,
      type: "debit",
    },
    {
      id: 4,
      date: "10/07/2023",
      description: "Remboursement Paul",
      amount: 50.0,
      type: "credit",
    },
    {
      id: 5,
      date: "08/07/2023",
      description: "Restaurant Le Gourmet",
      amount: -86.2,
      type: "debit",
    },
  ];

  const formatCurrency = (value, currency = "€") => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg
            width="220"
            height="50"
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

        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                fill="#E0E0E0"
                stroke="#002D62"
                strokeWidth="1"
              />
              <circle cx="12" cy="9" r="4" fill="#002D62" />
              <path
                d="M4 19.5C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 19.5"
                fill="#002D62"
              />
            </svg>
          </div>
          <div className={styles.userName}>
            <p>
              Bonjour, <strong>Jean Dupont</strong>
            </p>
            <button onClick={deconnexion} className={styles.logoutButton}>Déconnexion</button>
            {/* <a href="/login" className={styles.logoutLink}>
              Déconnexion
            </a> */}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeBar}>
          <h1>Tableau de bord</h1>
          <p>Dernière connexion: 18/07/2023 à 14:32</p>
        </div>

        <section className={styles.accountsSection}>
          <h2>Mes comptes</h2>
          <div className={styles.accountsList}>
            {accounts.map((account) => (
              <div key={account.id} className={styles.accountCard}>
                <div className={styles.accountInfo}>
                  <h3>{account.type}</h3>
                  <p className={styles.accountNumber}>{account.number}</p>
                </div>
                <div className={styles.accountBalance}>
                  <p className={styles.balanceAmount}>
                    {formatCurrency(account.balance)}
                  </p>
                  <button className={styles.detailsButton}>Détails</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalBalance}>
            <p>Solde total</p>
            <p className={styles.totalAmount}>
              {formatCurrency(
                accounts.reduce((total, account) => total + account.balance, 0)
              )}
            </p>
          </div>
        </section>

        <section className={styles.transactionsSection}>
          <div className={styles.sectionHeader}>
            <h2>Dernières opérations</h2>
            <button className={styles.secondaryButton}>Voir tout</button>
          </div>
          <div className={styles.transactionList}>
            <table className={styles.transactionsTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td
                      className={
                        transaction.type === "credit"
                          ? styles.creditAmount
                          : styles.debitAmount
                      }
                    >
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.quickActions}>
          <h2>Actions rapides</h2>
          <div className={styles.actionButtons}>
            <button className={styles.actionButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19"
                  stroke="#002D62"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 12H19"
                  stroke="#002D62"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Nouveau virement
            </button>
            <button className={styles.actionButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="12"
                  rx="2"
                  stroke="#002D62"
                  strokeWidth="2"
                />
                <path d="M3 10H21" stroke="#002D62" strokeWidth="2" />
                <path
                  d="M7 15H13"
                  stroke="#002D62"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Mes cartes
            </button>
            <button className={styles.actionButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#002D62"
                  strokeWidth="2"
                />
                <path
                  d="M12 7V13H16"
                  stroke="#002D62"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Planifier un RDV
            </button>
            <button className={styles.actionButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                  stroke="#002D62"
                  strokeWidth="2"
                />
                <path d="M3 7L12 13L21 7" stroke="#002D62" strokeWidth="2" />
              </svg>
              Messagerie
            </button>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">Conditions générales</a>
          <a href="#">Sécurité</a>
          <a href="#">Confidentialité</a>
          <a href="#">Contact</a>
        </div>
        <p className={styles.copyright}>
          © 2023 Platinium Banque. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
