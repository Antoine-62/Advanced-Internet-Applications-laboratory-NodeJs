const express = require('express');
var mysql = require('mysql');
const router = express.Router();

//Connetion to our mysql server
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsdata',
    port : 3308 //by default, it's 3308 because it's my mysql port, please change if you don't have the same
  })

connection.connect((error) =>{
    if(!!error){
        console.log(error)
    }
    else
    {
        console.log("Connected to mysql server")
    }
})

//For index(and main) page
router.get('/',(request, response) =>{
    //First, we retrieve data
    connection.query("select * from movies",(error, rows)=>{
        if(!!error){
            console.log("Error in the query")//say error if we have error
        }
        else{
            console.log('Inside the homepage callback function')
            console.log(request.sessionID)//To check session's id
            console.log("Success! \n");
            console.log(rows);//we display data in our console, just to check
            if (request.session.selectedMovies) {//If in our session, we have id from selected movies
                console.log(request.session.selectedMovies)
                response.render('index.ejs',{
                    movies: rows,
                    selectedMovies: request.session.selectedMovies//We send the id of the selected movies
                })
            }
            else{
                response.render('index.ejs',{
                    movies: rows,
                    selectedMovies: []//we send nothing because there is no movies selected stored in our session
                })
            }
        }
    })
});

router.get('/selectMovie/:id',(request, response)=>{
    console.log("ok")
    response.redirect('/');
})

//Where the user select a movie
router.post('/selectMovie/:id',(request, response)=>{
    let idMovie = request.params.id;//We retrieve the id of the movie
    if (request.session.selectedMovies) {//if we already have an array which includes our ids in our session
        request.session.selectedMovies.push(idMovie);//just push the id in the array
      } else {
        request.session.selectedMovies = [];//else we create the array before to push the id
        request.session.selectedMovies.push(idMovie);
      }
      console.log(request.session.selectedMovies)//display all id from selected movies "by this users"
    response.redirect('/');//even if we use ajax :p
})

//To consult the basket
router.get('/myBasket',(request, response) =>{
    let selectedMovies = [];
    if ((request.session.selectedMovies)&&(request.session.selectedMovies.length !== 0)) {//Check if the users selected movies
        //we retrieve the data from mysql server
        let selectedM = request.session.selectedMovies;
        let length = selectedM.length;
          let sql =  "select * from movies where id = ?"
          for(var i=0;i<selectedM.length;i++){
                if(i !== selectedM.length-1)
                {
                   sql = sql + " or id =?"
                }
          }
            connection.query(sql,selectedM,(error, rows)=>{
                if(!!error){
                    console.log(error)//show error if errors
                }
                else{
                    if(rows.length === selectedM.length){//We check that we have data for each of our movies, maybe another user bought one the movie, then we won't have everything
                        //If it's the case, we display our basket
                        console.log("Success! \n");
                        console.log(rows);
                        response.render('myBasket.ejs',{
                        movies: rows 
                        })
                    }
                    else{
                       //if it's not the case, first we remove id of the items we don't have data(because another bought it)
                        console.log("Error")
                        console.log("One of the item has already been bought");
                        request.session.selectedMovies.splice(0, length); 
                        if(rows.length !== 0)//if of course there is items(maybe the another user bought everything)
                        {
                            rows.map(row=>{
                                request.session.selectedMovies.push(String(row.id));
                            })
                            console.log(request.session.selectedMovies)
                            //Then we display the basket page, with an appropriate message
                            request.flash('notify', 'Oups ! One of your items has already been bought by someone else while you were selecting your items... Are you sure to continue ? Be quick before someone else buy one your other selected item')
                            response.redirect('/myBasket');
                        }
                        else{
                            //Then we display the basket page, with an appropriate message
                            request.flash('notify', 'Oups ! All your items has already been bought by someone else while you were selecting your items... Too slow ! :')
                            response.redirect('/myBasket');
                        }
                        
                    }
                    
                }
            })
        
        }
        else{
            response.render('myBasket.ejs',{//If no movies selected, we send an empty array
                movies: selectedMovies
                })
        }
 
});

//When the user remove one movie
router.post('/RemoveMovie/:id',(request, response)=>{
    let idMovie = request.params.id;//We retrieve the movie's id
    console.log(idMovie);
    index = request.session.selectedMovies.indexOf(idMovie);//We get its index in the table
    request.session.selectedMovies.splice(index, 1); //then we delete it(we need of the element's index to delete an element in the array)
      console.log(request.session.selectedMovies)
    response.redirect('/');//even if we use ajax for this function...
})

//to clear the basket
router.post('/RemoveAll',(request, response)=>{
    let length = request.session.selectedMovies.length;//we get the lenghth of our table which contains the selected movies's id
    request.session.selectedMovies.splice(0, length); //then we delete all element in our session's table
    console.log(request.session.selectedMovies)
    request.flash('notify', 'You canceled your purchase')
    response.redirect('/');//we redirect to main page
})

//The boss final
//function to buy all items in our basket
router.post('/buyEverything',(request, response)=>{
    //First we check if we have data for each selected movies
    let length = request.session.selectedMovies.length;
    let selectedM = request.session.selectedMovies;
          let sql =  "select * from movies where id = ?"
          let sql2 =  "delete from movies where id = ?"
          for(var i=0;i<selectedM.length;i++){
                if(i !== selectedM.length-1)
                {
                   sql = sql + " or id =?"
                   sql2 = sql2 + " or id =?"
                }
          }
          connection.query(sql,selectedM,(error, rows)=>{
            console.log("Go watch if all items are available! \n");
            if(!!error){
                console.log("Error")
            }
            else{

                console.log(rows);
                if(rows.length === selectedM.length)// we check we have data for each selected movies
                {
                    //if it's the case, we delete all selected movies, and then redirect to main page
                    console.log("Success! \n");
                    console.log("All the product are still available! You can buy everything! \n");
                    connection.query(sql2,selectedM,(error, rows)=>{
                    if(!!error){
                        console.log(error)
                    }
                    else{
                        request.session.selectedMovies.splice(0, length); 
                        console.log(rows);
                        console.log(request.session.selectedMovies)
                        request.flash('notify', 'Congratulations ! You bought all your items before someone else do it')
                        response.redirect('/');
                    }
                })
                }
                else{
                    //if it's not the case, first we remove id of the items we don't have data(because another bought it)
                    console.log("Error")
                    console.log("One of the item has already been bought");
                    request.session.selectedMovies.splice(0, length); 
                    if(rows.length !== 0)//if there is item(maybe the another user bought everything)
                    {
                        rows.map(row=>{
                            request.session.selectedMovies.push(String(row.id));
                        })
                        //Then we display the basket page, with an appropriate message
                        request.flash('notify', 'Oups ! One of your items has already been bought by someone else... Are you sure to continue ? Be quick before someone else buy one your other selected item')
                        response.redirect('/myBasket');
                    }
                    else{
                        //Then we display the basket page, with an appropriate message
                        request.flash('notify', 'Oups ! All your items has already bought by someone else... Too slow ! :')
                        response.redirect('/myBasket');
                    }
                }
                
            }
        })
})

module.exports = router;