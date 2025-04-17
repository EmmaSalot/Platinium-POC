export async function login(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Erreur de connexion");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[login service] Erreur :", error);
    throw error;
  }
}

export async function loginDab(numbers, pin) {
  try {
    const response = await fetch("http://localhost:8080/api/dab/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numbers, pin }),
    });

    if (!response.ok) {
      throw new Error("Erreur de connexion");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[login service] Erreur :", error);
    throw error;
  }
}
