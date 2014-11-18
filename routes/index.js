var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
var Tweet =  require('../models/index.js').Tweet; 
var Sequelize = require('sequelize');





router.get('/', function(req,res){

Tweet.findAll({ include: [ User ] }).success(function(tweets) {
  	// console.log(JSON.stringify(tweets +" why?"))

  	// console.log(JSON.stringify(tweets))
  	res.render('index', {
  		tweets: tweets, 
  		tweet_user: true

  		
  	})
	
	 })
	
})

router.get('/users/:name', function(req, res){
	var name = req.params.name;

		User.find({ where: { name : name }, include: [Tweet] }).success(function(users) {
		res.render('index', {
			title:"Tweets by " + name, 
			tweets: users.Tweets,
			name: name, 
			
		})
	})
})




 router.get('/users/:name/tweets/:id', function(req, res) {
			 	var name = req.params.name;
			 	var tweetId = req.params.id;
			 	

			 	Tweet.find({ where: { id: tweetId }, include: [User] }).success(function(tweets) {
			 		console.log('hello',JSON.stringify(tweets.tweet)+'********************************************')
			 		res.render('index', {
			 			title: "A single tweet!!!!",
			 			tweets: tweets, 
			 			tweet_user: true
			 		})
			 	})
			 })
			// 	var list = store.find({
			// 		id: tweetId
			// 	});

			// 	res.render('index', {
			// 		title: 'Twitters.js - A single tweet by ' + name,
			// 		tweets: list
			// 	})
			// })

	

// })

// /* GET home page. */
// router.get('/', function(req, res) {
// 	var tweets = store.list();
// 	res.render('index', {
// 		title: 'Twitter.js Awesome stuff',
// 		tweets: tweets,
// 		show_form: true
// 	});
// });


// router.get('/users/:name', function(req, res) {
// 	var name = req.params.name;
// 			var list = User.find({name: name});

// 			res.render('index', {
// 				title: 'Twitter.js - Posts by '+name,
// 				tweets: list,
// 				show_form: true,
// 				username: name
// 			});
			
// 		}
			


			// router.get('/users/:name/tweets/:id', function(req, res) {
			// 	var name = req.params.name;
			// 	var tweetId = Number(req.params.id);
			// 	var list = store.find({
			// 		id: tweetId
			// 	});

			// 	res.render('index', {
			// 		title: 'Twitters.js - A single tweet by ' + name,
			// 		tweets: list
			// 	})
			// })

			module.exports = router;