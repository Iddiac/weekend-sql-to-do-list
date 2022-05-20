CREATE TABLE list(
"id" serial primary key ,
"task" VARCHAR(250) NOT NULL,
"status" BOOLEAN Default false NOT NULL,
"task-date" DATE
);
SELECT * FROM list;
INSERT INTO list("task","status","task-date")
Values('clean laundry','false','2022-05-20');