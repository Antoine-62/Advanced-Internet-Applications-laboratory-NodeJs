const express = require('express');
var mysql = require('mysql');
const router = express.Router();


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsdata',
    port : 3308 //by default, it's 3306, please change if you don't have the same sql port
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

router.get('/',(request, response) =>{
    connection.query("select * from movies",(error, rows)=>{
        if(!!error){
            console.log("Error in the query")
        }
        else{
            console.log('Inside the homepage callback function')
            console.log(request.sessionID)
            console.log("Success! \n");
            console.log(rows);
            if (request.session.selectedMovies) {
                console.log(request.session.selectedMovies)
                response.render('index.ejs',{
                    movies: rows,
                    selectedMovies: request.session.selectedMovies
                })
            }
            else{
                response.render('index.ejs',{
                    movies: rows,
                    selectedMovies: []//test
                })
            }
        }
    })
});

router.get('/selectMovie/:id',(request, response)=>{
    console.log("ok")
    response.redirect('/');
})

router.post('/selectMovie/:id',(request, response)=>{
    let idMovie = request.params.id;
    if (request.session.selectedMovies) {
        request.session.selectedMovies.push(idMovie);
      } else {
        request.session.selectedMovies = [];
        request.session.selectedMovies.push(idMovie);
      }
      console.log(request.session.selectedMovies)
    response.redirect('/');
})
//var myRes2 = myColl.find('name = :param1 AND age = :param2').bind('param1','Rohit').bind('param2', 18).execute();

router.get('/myBasket',(request, response) =>{
    let selectedMovies = [];
    if ((request.session.selectedMovies)&&(request.session.selectedMovies.length !== 0)) {
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
                    console.log(error)
                }
                else{
                    if(rows.length === selectedM.length){
                        console.log("Success! \n");
                        console.log(rows);
                        response.render('myBasket.ejs',{
                        movies: rows 
                        })
                    }
                    else{
                       
                        console.log("Error")
                        console.log("One of the item has already been bought");
                        request.session.selectedMovies.splice(0, length); 
                        if(rows.length !== 0)
                        {
                            rows.map(row=>{
                                request.session.selectedMovies.push(String(row.id));
                            })
                            console.log(request.session.selectedMovies)
                            request.flash('notify', 'Oups ! One of your items has already been bought by someone else while you were selecting your items... Are you sure to continue ? Be quick before someone else buy one your other selected item')
                            response.redirect('/myBasket');
                        }
                        else{
                            request.flash('notify', 'Oups ! All your items has already been bought by someone else while you were selecting your items... Too slow ! :')
                            response.redirect('/myBasket');
                        }
                        
                    }
                    
                }
            })
        
        }
        else{
            response.render('myBasket.ejs',{
                movies: selectedMovies
                })
        }
 
});

router.post('/RemoveMovie/:id',(request, response)=>{
    let idMovie = request.params.id;
    console.log(idMovie);
    index = request.session.selectedMovies.indexOf(idMovie);
    request.session.selectedMovies.splice(index, 1); 
      console.log(request.session.selectedMovies)
    response.redirect('/');
})

router.post('/RemoveAll',(request, response)=>{
    let length = request.session.selectedMovies.length;
    request.session.selectedMovies.splice(0, length); 
    console.log(request.session.selectedMovies)
    request.flash('notify', 'You canceled your purchase')
    response.redirect('/');
})

router.post('/buyEverything',(request, response)=>{
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
                console.log("One of the item has already been bought");
                response.redirect('/');
            }
            else{

                console.log(rows);
                if(rows.length === selectedM.length)
                {
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
                    console.log("Error")
                    console.log("One of the item has already been bought");
                    request.session.selectedMovies.splice(0, length); 
                    if(rows.length !== 0)
                    {
                        rows.map(row=>{
                            request.session.selectedMovies.push(row.id);
                        })
                        request.flash('notify', 'Oups ! One of your items has already been bought by someone else... Are you sure to continue ? Be quick before someone else buy one your other selected item')
                        response.redirect('/myBasket');
                    }
                    else{
                        request.flash('notify', 'Oups ! All your items has already bought by someone else... Too slow ! :')
                        response.redirect('/myBasket');
                    }
                }
                
            }
        })
})

module.exports = router;