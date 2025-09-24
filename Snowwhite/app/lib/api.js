import { databases, ID } from "./appwrite";

const DATABASE_ID = "68d3cffd001b6c44eff4";
const COLLECTION_ID = "usernames";

// Benutzer speichern (nur surname + familyname)
export async function registerUser(surname, familyname) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        surname,
        familyname,
        score: 0,
      }
    );
  } catch (err) {
    console.error("Fehler bei registerUser:", err);
    throw err;
  }
}

// Highscore updaten
export async function updateHighscore(docId, newScore) {
  return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
    score: newScore,
  });
}

// Highscores abrufen
export async function getHighscores() {
  return await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
}
