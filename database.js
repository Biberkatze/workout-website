const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("workout.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      exercise TEXT,
      weight REAL,
      reps INTEGER
    )
  `);
});

module.exports = {
  insertData: (date, exercise, weight, reps) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO progress (date, exercise, weight, reps) VALUES (?, ?, ?, ?)`,
        [date, exercise, weight, reps],
        (err) => (err ? reject(err) : resolve())
      );
    });
  },
  getAllData: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM progress ORDER BY date ASC`, [], (err, rows) =>
        err ? reject(err) : resolve(rows)
      );
    });
  },
};
