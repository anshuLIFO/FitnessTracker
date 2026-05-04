const db = require('./db');

const createTablesSql = `
-- User table to keep track of users in the system
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_male BOOLEAN NOT NULL,
    age SMALLINT NOT NULL CHECK (age >= 0),
    weight SMALLINT NOT NULL CHECK (weight >= 0),
    height SMALLINT NOT NULL CHECK (height >= 0)
);

-- Goals table: collection of possible nutritional and caloric goals
CREATE TABLE IF NOT EXISTS Goals (
    id SERIAL PRIMARY KEY,
    type VARCHAR(25) UNIQUE
);

--create the parent Activities table
create table IF NOT EXISTS Activities(
	name VARCHAR(30) PRIMARY KEY,
	caloric_gain int NOT NULL,
	amount SMALLINT CHECK (amount >= 0) NOT NULL,
	units VARCHAR(20) NOT NULL
);

--create Foods child table
create table IF NOT EXISTS Foods(
	name varchar(30) PRIMARY KEY,
	protein SMALLINT CHECK(protein >= 0) NOT NULL,
	fiber SMALLINT CHECK(fiber >= 0) NOT NULL,
	FOREIGN KEY (name) REFERENCES Activities(name) ON DELETE CASCADE
);

-- create HasManyGoals child table
create table IF NOT EXISTS HasManyGoals (
    user_id INT NOT NULL,
    goal_id INT NOT NULL,
    recommend_value INT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (goal_id) REFERENCES Goals(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, goal_id)
);

-- create DoesDailyActivity child table
create table IF NOT EXISTS DoesDailyActivity (
    user_id INT NOT NULL,
    date DATE NOT NULL,
    amount_done SMALLINT CHECK (amount_done >= 0) NOT NULL,
    activity varchar(30) NOT NULL,
    PRIMARY KEY (user_id, date, activity),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (activity) REFERENCES Activities(name)
);

-- create DailyProgressOfGoals child table
create table IF NOT EXISTS DailyProgressOfGoals (
    date DATE NOT NULL,
    daily_progress NUMERIC(3,2) CHECK (daily_progress >= 0 AND daily_progress <= 1) NOT NULL,
    user_id INT NOT NULL,
    goal_id INT NOT NULL,
    PRIMARY KEY (date, user_id, goal_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id, goal_id) REFERENCES HasManyGoals(user_id, goal_id) ON DELETE CASCADE
);
`;

const insertDataSql = `
INSERT INTO Goals (type) VALUES
    ('calorie'),
    ('protein'),
    ('fiber')
ON CONFLICT (type) DO NOTHING;

INSERT INTO Activities (name, caloric_gain, amount, units) VALUES
    ('Apple', 95, 1, 'item'),
    ('Chicken Breast', 165, 100, 'grams'),
    ('Oatmeal', 150, 1, 'cup'),
    ('Black Beans', 227, 1, 'cup'),
    ('Running', -300, 30, 'minutes'),
    ('Cycling', -250, 30, 'minutes'),
    ('Weight Lifting', -180, 30, 'minutes')
ON CONFLICT (name) DO NOTHING;

INSERT INTO Foods (name, protein, fiber) VALUES
    ('Apple', 0, 4),
    ('Chicken Breast', 31, 0),
    ('Oatmeal', 6, 4),
    ('Black Beans', 15, 15)
ON CONFLICT (name) DO NOTHING;
`;

async function initDb() {
  try {
    await db.query(createTablesSql);
    await db.query(insertDataSql);
    console.log("DB Init Results: Success");
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
}

module.exports = initDb;
