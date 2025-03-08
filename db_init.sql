CREATE DATABASE guestbook;
USE guestbook;

DROP TABLE IF EXISTS submissions;
CREATE TABLE submissions(
	id INT(5) AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    job VARCHAR(255),
    company VARCHAR(255),
    linkedin VARCHAR(255),
    email VARCHAR(255),
    met VARCHAR(255),
    other VARCHAR(255),
    message VARCHAR(255),
    mailinglist VARCHAR(255),
    emailformat VARCHAR(255),
    time_stamp DATETIME DEFAULT NOW()
);

INSERT INTO submissions (fname, lname, job, company, linkedin, email, met, other, message, mailinglist, emailformat)
VALUES ('John', 'Doe', "Engineer", "DoeBuildings", "www.linkedin.com/in/johndoe","jdoe@gmail.com", "Job_Fair", "", "nice meeting you!", "on", "HTML");

INSERT INTO submissions (fname, lname, job, company, linkedin, email, met, other, message, mailinglist, emailformat)
VALUES ('Johnny', 'Doe', "Manager", "DoeBuildings", "www.linkedin.com/in/johndoesOtherAcc","jdoe2@gmail.com", "Classroom", "", "hello!!", "on", "HTML");

INSERT INTO submissions (fname, lname, job, company, linkedin, email, met, other, message, mailinglist, emailformat)
VALUES ('Adam', 'Smith', "Programmer", "Microsoft", "www.linkedin.com/in/asmith","asmith@gmail.com", "Meetup", "", "sup", "", "Text");