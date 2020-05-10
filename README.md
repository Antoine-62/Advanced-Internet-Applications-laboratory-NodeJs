# Advanced Internet Applications – laboratory - Node.js

**Description :** The aim of the exercice was to write a online store of Disney movies by using Node.js. Sadly, I forgot to add image to movies, but don't worry, the app is almost perfect (well it's my opinion).   
In the main page, the user can add movies in his basket, then he can consult his basket. In the basket page, the user can : 
* Remove some movies from his basket
* Clear his basket
* Buy all items in his basket
* Come back to the main page   

Of course, there are some constraints :

* If another user buy one items the user selected while he's still selecting items, the item won't be display in the basket, and we'll display a flash message to say that one movie has already been bought by someone else.
* If 2 users are on the basket page, with some same items, the first one who click on "buy everything" will have all items. For the second one, we will redirect him to basket page with a message to say that one of his items has already been bought (of course, all others items will stay in the basket).
* It's all, I don't think I have forgotten something.

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

Go to phpMyAdmin, then create a new database called **nodejsdata**, then import the script **movies2.sql**. It will create the table *movies* with some rows.

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

## Problems met (resolved)
* The first problem I met was the session. In the begining, I set a new variable **const session = session()** such as php, thinking it will create a new session for each user. But no, it was only one session for all users. I didn't read the doc before, and instead to read it, I passed many time on internet, convinced my method was the good one. It's only after many hours that I read the documentation, and understood I didn't manipulate the session properly. Honnestly, why do you need to pass by the request to access to session ? Maybe You notified I generate an id to session and then display it on console, but it's not very useful, it was just to check we have different session for each user.
* The second problem I met was the  **asynchronous functions**. As a big php user, I always first retrieved the data from database, and then passed it to the view. But here, because it didn't wait the function to retrieve the data, it directly displayed a view without the data. So I transform my synchronous functions asynchronous functions to be able to display the view with the data
* Finally, some stupids syntax errors (sadly it's this problem which takes me most time to solve...).

## Conclusion

In this exercice, I learned to create a project from scratch with NodeJs, and I saw there is a lot of advantadges (or disadvantadges) with the asynchronous functions. I think it must be great to use it  with single page app.  
Honnestly, I am happy of this laboratory because I have to learn NodeJs for my summer internship.    
I thank my teacher, sir Piernik, for this exercice and new skills acquired.
