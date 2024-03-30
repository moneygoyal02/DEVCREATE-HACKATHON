create database devcre;
use devcre;

create table users (emailid varchar(30) primary key, pwd varchar(30) , usertype varchar(40) , dos date , status int );

select * from users;

create table cuprofile (emailid varchar(30) primary key , FName varchar(30) ,  contact varchar(15) , address varchar(100) ,  city varchar(30) , state varchar(50) , ppic varchar(300) );
create table vendorprofile(emailid varchar(30) primary key,FName varchar(40),contact varchar(15) , address varchar(100) ,  city varchar(30) , state varchar(50) ,idproof varchar(15),textbox varchar(600),ppic varchar(300) );
select * from cuprofile; 
