CREATE DATABASE ContactUsDB;

CREATE TABLE user_form(
	id SERIAL primary key,
	name varchar(100) not NULL,
	email varchar(100) not null,
	content text null,
	createdAt timestamp default CURRENT_TIMESTAMP,
	updatedAt timestamp default Current_Timestamp
);

CREATE TABLE user_subscription(
	Id SERIAL primary key,
	email varchar(100) unique NOT null,
	createdAt timestamp default Current_Timestamp,
	updatedAt timestamp default Current_Timestamp,
	status int default 1
);
 
select * from user_form uf;
select * from user_subscription us;


