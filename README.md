# Annotation

An website including front end and back end for music emotion annotation.

## Database Design

To use the back end code, we need to first build the corresponding database table shown as follow. Note that MYSQL is used in this system.

### Table user: (account, password, complete)

This table is used for storing the account of users.

- account: the account name of users
- password: the password for users (stored as plaintext)
- complete: the number of annotated music (initial as 0)

```mysql
use Music;
create table user(
 	account VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    complete int not null default(0)
);
insert into user
(account, password, complete)
VALUES
("test1", "123456", 0),
("test2", "123456", 0),
("test3", "123456", 0);
```



### Table test: (annotationId, annotation)

This table is used for storing the annotation.

- annotationId: the annotation id 
- annotation: a string represents the corresponding annotation



### Table pieces:



## Acknowledgment

The front end of this website is mainly borrowed from https://github.com/lucasnfe/adl-music-annotation.
