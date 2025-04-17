"use client";
import { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  FlatList
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Sample data for accounts
const accounts = [
  {
    id: "1",
    type: "Compte Courant",
    number: "FR76 3000 1234 5678 9000 1234 567",
    balance: 2458.92,
    currency: "€",
  },
  {
    id: "2",
    type: "Livret A",
    number: "FR76 3000 1234 5678 9000 3456 789",
    balance: 15785.33,
    currency: "€",
  },
  {
    id: "3",
    type: "Plan Épargne Logement",
    number: "FR76 3000 1234 5678 9000 5678 901",
    balance: 42150.67,
    currency: "€",
  },
];

// Sample transactions
const transactions = [
  {
    id: "1",
    date: "18/07/2023",
    description: "Virement Salaire",
    amount: 2350.00,
    type: "credit",
  },
  {
    id: "2",
    date: "15/07/2023",
    description: "Loyer Appartement",
    amount: -850.50,
    type: "debit",
  },
  {
    id: "3",
    date: "12/07/2023",
    description: "Courses Supermarché",
    amount: -123.45,
    type: "debit",
  },
  {
    id: "4",
    date: "10/07/2023",
    description: "Remboursement Paul",
    amount: 50.00,
    type: "credit",
  },
  {
    id: "5",
    date: "08/07/2023",
    description: "Restaurant Le Gourmet",
    amount: -86.20,
    type: "debit",
  },
];

// Quick action buttons
const quickActions = [
  {
    id: "1",
    title: "Virement",
    icon: "arrow-forward-outline"
  },
  {
    id: "2",
    title: "Mes cartes",
    icon: "card-outline"
  },
  {
    id: "3",
    title: "RIB",
    icon: "document-text-outline"
  },
  {
    id: "4",
    title: "Contact",
    icon: "chatbubble-outline"
  },
];

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const router = useRouter();

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Calculate total balance
  const totalBalance = accounts.reduce((total, account) => total + account.balance, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.bankLogo}>
          <Text style={styles.logoText}>PLATINIUM BANQUE</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Bonjour, Jean Dupont</Text>
          <TouchableOpacity 
            onPress={() => router.push("/login")}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Welcome Banner */}
        <View style={[styles.welcomeBanner, { backgroundColor: colors.card }]}>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>Tableau de bord</Text>
          <Text style={[styles.lastLogin, { color: colors.icon }]}>
            Dernière connexion: 18/07/2023 à 14:32
          </Text>
        </View>

        {/* Accounts Section */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Mes comptes</Text>
          
          {accounts.map(account => (
            <View 
              key={account.id} 
              style={[styles.accountCard, { borderColor: colors.border }]}
            >
              <View style={styles.accountInfo}>
                <Text style={[styles.accountType, { color: colors.text }]}>
                  {account.type}
                </Text>
                <Text style={[styles.accountNumber, { color: colors.icon }]}>
                  {account.number}
                </Text>
              </View>
              <View style={styles.accountBalance}>
                <Text style={[styles.balanceAmount, { color: colors.primary }]}>
                  {formatCurrency(account.balance)}
                </Text>
                <TouchableOpacity 
                  style={[styles.detailsButton, { borderColor: colors.primary }]}
                >
                  <Text style={[styles.detailsButtonText, { color: colors.primary }]}>
                    Détails
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={[styles.totalBalance, { borderTopColor: colors.border }]}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Solde total</Text>
            <Text style={[styles.totalAmount, { color: colors.primary }]}>
              {formatCurrency(totalBalance)}
            </Text>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Dernières opérations
            </Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>
                Voir tout
              </Text>
            </TouchableOpacity>
          </View>

          {transactions.map(transaction => (
            <View 
              key={transaction.id} 
              style={[styles.transactionItem, { borderBottomColor: colors.border }]}
            >
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionDate, { color: colors.icon }]}>
                  {transaction.date}
                </Text>
                <Text style={[styles.transactionDesc, { color: colors.text }]}>
                  {transaction.description}
                </Text>
              </View>
              <Text 
                style={[
                  styles.transactionAmount, 
                  { color: transaction.type === 'credit' ? colors.credit : colors.debit }
                ]}
              >
                {formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Actions rapides
          </Text>
          <View style={styles.actionGrid}>
            {quickActions.map(action => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.actionButton, { backgroundColor: colors.secondary }]}
              >
                <Ionicons name={action.icon as any} size={24} color={colors.primary} />
                <Text style={[styles.actionText, { color: colors.text }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: colors.primary }]}>
        <Text style={styles.footerText}>© 2023 Platinium Banque</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    paddingTop: 20,
  },
  bankLogo: {
    alignItems: "center",
    marginBottom: 10,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  logoutButton: {
    padding: 5,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  welcomeBanner: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  lastLogin: {
    fontSize: 12,
  },
  section: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  viewAllButton: {},
  viewAllText: {
    fontSize: 14,
  },
  accountCard: {
    borderLeftWidth: 3,
    borderRadius: 6,
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  accountInfo: {
    marginBottom: 10,
  },
  accountType: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  accountNumber: {
    fontSize: 12,
  },
  accountBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  detailsButtonText: {
    fontSize: 12,
  },
  totalBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDate: {
    fontSize: 12,
    marginBottom: 3,
  },
  transactionDesc: {
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});