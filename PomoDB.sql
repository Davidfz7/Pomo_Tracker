DROP DATABASE IF EXISTS PomoDB;

CREATE database PomoDB;
GRANT ALL PRIVILEGES ON PomoDB.* TO 'david'@'localhost';
FLUSH PRIVILEGES;
use PomoDB;

CREATE TABLE productivity_logs(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    activity_type VARCHAR(50) NOT NULL,
    hours_count INT NOT NULL,
    date_recorded DATETIME NOT NULL,
    UNIQUE KEY unique_constraint_name (activity_type, date_recorded)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- Insert test data in productivity_logs table
INSERT INTO productivity_logs (activity_type, hours_count, date_recorded)
VALUES 
    ('Reading', 1, '2024-01-09'), 
    ('Programming', 4, '2024-01-09'),
   
    ('Reading', 1, '2024-01-10'),  
    ('Programming', 4, '2024-01-10'),
   
    ('Reading', 0, '2024-01-11'),    
    ('Programming', 3, '2024-01-11'),

    ('Reading', 0, '2024-01-12'),    
    ('Programming', 3, '2024-01-12'),

    ('Reading', 0, '2024-01-13'),    
    ('Programming', 0, '2024-01-13'),

    ('Reading', 0, '2024-01-14'),    
    ('Programming', 0, '2024-01-14'),

    ('Reading', 0, '2024-01-15'),    
    ('Programming', 0, '2024-01-15'),

    ('Reading', 0, '2024-01-16'),    
    ('Programming', 2, '2024-01-16'),
    
    ('Reading', 0, '2024-01-17'),    
    ('Programming', 1, '2024-01-17'),
    
    ('Reading', 0, '2024-01-18'),    
    ('Programming', 2, '2024-01-18');
    

