import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("insight.db");

// ✅ Create Table
export const setupDatabase = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ph REAL,
      dateTime TEXT
    );
  `).then(() => console.log("Table created successfully"))
    .catch(error => console.log("Error creating table", error));
};

// ✅ Insert Data
export const insertRecord = async (ph: number, dateTime: string) => {
  try {
    await db.runAsync(
      `INSERT INTO records (ph, dateTime) VALUES (?, ?);`,
      [ph, dateTime]
    );
    console.log("Data inserted successfully");
  } catch (error) {
    console.log("Error inserting data", error);
  }
};

// ✅ Fetch Data
export const fetchRecords = async (setList: Function) => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM records;`);
    setList(result);
  } catch (error) {
    console.log("Error retrieving data", error);
  }
};

// ✅ Delete a Record
export const deleteRecord = async (id: number) => {
  try {
    await db.runAsync(`DELETE FROM records WHERE id = ?;`, [id]);
    console.log("Record deleted successfully");
  } catch (error) {
    console.log("Error deleting record", error);
  }
};
