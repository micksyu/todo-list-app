CREATE TABLE IF NOT EXISTS duties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO duties (title, description, completed) VALUES
('Duty 1', 'Description 1', false),
('Duty 2', 'Description 2', true);
