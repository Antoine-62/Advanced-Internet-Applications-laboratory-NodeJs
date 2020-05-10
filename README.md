# Advanced Internet Applications – laboratory - Node.js

**Description :** The aim of the exercice was to write a online store of Disney movies by using Node.js.  
In the main page, the user can add movies in his basket, then he can consult his basket. In the basket page, the user can : 
* Remove some movies from his basket
* Clear his basket
* Buy all items in his basket
* Come back to the main page
Of course, there are some constraints :
* If another user buy one items the user selected while he was selecting items, the item won't be display in the basket, and we'll display a flash message to say that one product has already been bought by someone else.
* If 2 users are on the basket page, with some same items, the first one who click on "buy everything" will have all items. For the second one, we will redirect him to basket page with a message to say that one of his items has already been bought (of course, all others items stay in the basket).
* It's all, I don't think I have forgot something.

## Setup
Get the code by cloning this repository using git :
```
git clone https://github.com/Advanced-Internet-Applications-laboratory-NodeJs.git
```
Once downloaded, open the terminal in the project and execute the following commands :
```
npm install
```
### Create the Database
#### With mySql terminal

Open your mySql terminal, then execute the script **movies.sql** (The commande is *source pathOfTheProject/movies.sql;*). By executing this script, it'll create a new database, nodejsdata, a table in this databse, movies, and some rows in this table. You can check if the table has been created by executing the following query : *select * from movies*. It should display 12 movies.

#### With phpMyAdmin

Go to phpMyAdmin, then create a new database called **nodejsdata**, then import the script **movies2.sql**. It will create the table with items inside.

### Configure mySql with Node.js

Once you have created the database, please check your mysql port. In the project, I set the port as 3008, because it's my mysql port. But generally, the mysql port is 3006. So if your mysql is not 3008, please update it :  
In the file routing.js, at line 11, change the port with the correct one. Of course, you can also update the hostname and add a password if you have.
```
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsdata',
    port : 3308 //by default, it's 3308 because it's my sql port, please change if you don't have the same sql port
  })
```
Now, everythings is set, you can run the app.

