import * as SQLite from 'expo-sqlite';

// Open or create the database
const db = SQLite.openDatabaseSync('my_database.db');

// Export the database instance
export default db;
