import { DatabaseSync } from 'node:sqlite'

export const db = new DatabaseSync('banco.db')

db.exec('PRAGMA foreign_keys = ON;')

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL UNIQUE,
    icon       TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS wish_lists (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS items (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id  INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    wish_list_id INTEGER REFERENCES wish_lists(id) ON DELETE CASCADE,
    name         TEXT NOT NULL,
    price        REAL NOT NULL DEFAULT 0,
    priority     TEXT NOT NULL DEFAULT 'media' CHECK (priority IN ('alta', 'media', 'baixa')),
    status       TEXT NOT NULL DEFAULT 'desejado' CHECK (status IN ('desejado', 'comprado')),
    link         TEXT,
    created_at   TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS price_history (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id     INTEGER REFERENCES items(id) ON DELETE CASCADE,
    price       REAL NOT NULL,
    recorded_at TEXT DEFAULT (datetime('now'))
  );
`)

db.exec(`
  INSERT OR IGNORE INTO categories (name, icon) VALUES
    ('Eletrônicos', '💻'),
    ('Roupas', '👕'),
    ('Livros', '📚'),
    ('Games', '🎮'),
    ('Casa', '🏠'),
    ('Outros', '📦');
`)