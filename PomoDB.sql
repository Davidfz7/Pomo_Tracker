DROP DATABASE IF EXISTS PomoDB;

CREATE database PomoDB;
GRANT ALL PRIVILEGES ON PomoDB.* TO 'david'@'localhost';
FLUSH PRIVILEGES;
use PomoDB;

CREATE TABLE productivity_logs(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    activity_type VARCHAR(50) NOT NULL,
    hours_count INT NOT NULL,
    date_recorded DATE NOT NULL
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- Insert test data in productivity_logs table
INSERT INTO productivity_logs (activity_type, hours_count, date_recorded)
VALUES 
    ('Programming', 3.0, '2024-01-13'),
    ('Reading', 2.0, '2024-01-13'),
    ('Meeting', 1.0, '2024-01-14');

