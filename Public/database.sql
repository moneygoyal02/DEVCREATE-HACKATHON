create database devcre;
use devcre;

create table users (emailid varchar(30) primary key, pwd varchar(30) , usertype varchar(40) , dos date , status int );

select * from users;