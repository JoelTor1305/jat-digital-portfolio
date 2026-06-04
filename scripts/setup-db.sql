-- JAT Digital — Client Dashboard Schema
-- Run once on your Railway Postgres instance:
--   psql $DATABASE_URL -f scripts/setup-db.sql

CREATE TABLE IF NOT EXISTS clients (
  id            SERIAL PRIMARY KEY,
  client_id     TEXT UNIQUE NOT NULL,   -- e.g. 'mga'
  name          TEXT NOT NULL,           -- e.g. 'Meadowlands Gymnastics Academy'
  email         TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id                SERIAL PRIMARY KEY,
  client_id         TEXT NOT NULL REFERENCES clients(client_id),
  parent_name       TEXT,
  phone             TEXT,
  child_age         TEXT,
  program_name      TEXT,
  callback_datetime TEXT,
  summary           TEXT,
  priority          TEXT CHECK (priority IN ('HOT', 'WARM')),
  priority_reason   TEXT,
  transcript        TEXT,
  call_time         TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_client_id_idx  ON leads(client_id);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
