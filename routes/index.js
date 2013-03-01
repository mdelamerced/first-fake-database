
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

/*
	GET /
*/


/*
	GET /
*/


var moment = require("moment"); // date manipulation library
var articleModel = require("../models/article.js"); //db model


exports.index = function(req, res) {
	
	console.log("main requested");
	
	articleModel.find({}, 'name slug source', function(err, articles){
	
		if (err) {
			res.send("Unable to query database for articles").status(500);
		};

		console.log("retrieved " + articles.length + " articles from database");

		var templateData = {
			article : articles,
		pageTitle : "Available Articles (" + articles.length + ")"
		}

		res.render('index.html', templateData);
	});
	
}


/*
	var templateData = {
		article : articles,
		pageTitle : "Available Articles (" + articles.length + ")"
	}

	res.render('index.html', templateData);
}
*/
/*
	GET /article/:article_id
*/
exports.detail = function(req, res) {

	console.log("detail page requested for " + req.params.article_id);

	//get the requested article by the param on the url :article_id
	var article_id = req.params.article_id;
	
	//query the db
	articleModel.findOne({slug:article_id}, function(err, currentArticle){

	var currentArticle = getArticleById(article_id);
	
	if (err) {
			return res.status(500).send("There was an error on the article query");
		}
		
		if (currentArticle == null) {
			return res.status(404).render('404.html');
		}

		console.log("I've found what you're looking for.");
		console.log(currentArticle.headline);

		// formattimePost function for currentArticle
		currentArticle.formattedTimepost = function() {
			// formatting a JS date with moment
			// http://momentjs.com/docs/#/displaying/format/
            return moment(this.timepost).format("dddd, MMMM Do YYYY");
        };
		
		//query for all astronauts, return only name and slug
		articleModel.find({}, 'name slug', function(err, articles){

			console.log("retrieved these articles : " + articles.length);

			//prepare template data for view
			var templateData = {
				article_n : currentArticle,
				article : articles,
				pageTitle : currentArticle.headline
			}

			// render and return the template
			res.render('detail.html', templateData);


		}) // end of .find (all) query
		
	}); // end of .findOne query

}

/*
	if (!currentArticle) {
		res.status(404).render('404.html');
	}

	var templateData = {
		article_n : currentArticle,
		article : articles,
		pageTitle : currentArticle.headline
	}

	res.render('detail.html', templateData);
}
*/
/*
	GET /create
*/
exports.articleForm = function(req, res){
/*
	
	
/*	if (!currentArticle) {
		res.status(404).render('404.html');
	}*/
	var article_id = req.params.article_id;
	var currentArticle = getArticleById(article_id);

	var templateData = {
		page_title : 'Add a new article',
		article_n : currentArticle,
		article : articles,
		pageTitle : currentArticle.headline
	};

	res.render('create_form.html', templateData);
}

/*
	POST /create
*/
exports.createArticle = function(req, res) {
	
	console.log("received form submission");
	console.log(req.body);

	// accept form post data
	var newArticle = new articleModel({
		headline : req.body.headline,
		timepost : req.body.timepost,
		text : req.body.text,
		urlA : req.body.urlA,
		twitter : req.body.twitter,
		photo : req.body.photo,
		category : req.body.category,
		slug : req.body.headline.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
	});
	
	// you can also add properties with the . (dot) notation
	
	newArticle.timepost = moment(req.body.timepost);
	newArticle.text = req.body.text.split(",");

	// walked on moon checkbox
	if (req.body.category) {
		newArticle.category = true;
		
	/*	else;
		
		newArticle.category = false;*/
	}
	
	// save the newArticle to the database
	newArticle.save(function(err){
		if (err) {
			console.error("Error on saving new article");
			console.error("err");
			return res.send("There was an error when creating a new article");

		} else {
			console.log("Created a new article!");
			console.log(newArticle);
			
			// redirect to the article's page
			res.redirect('/article/'+ newArticle.slug)
		}
	});
}

exports.loadData = function(req, res) {

	// load initial astronauts into the database
	for(a in articles) {

		//get loop's current astronuat
		currArticle = articles[a];

		// prepare astronaut for database
		tmpArtic = new articleModel();
		tmpArtic.slug = currArticle.slug;
		tmpArtic.headline = currArticle.headline;
		tmpArtic.twitter = currArticle.twitter;
		tmpArtic.text = currArticle.text;
		tmpArtic.urlA = currArticle.urlA;
		tmpArtic.category = currArticle.category;
		
		// convert currArticle's birthdate string into a native JS date with moment
		// http://momentjs.com/docs/#/parsing/string/
		tmpArtic.timepost = moment(currArticle.timepost); 

		// convert currArticle's string of skills into an array of strings
		tmpArtic.photo = currArticle.photo.split(",");

		// save tmpArtic to database
		tmpArtic.save(function(err){
			// if an error occurred on save.
			if (err) {
				console.error("error on save");
				console.error(err);
			} else {
				console.log("Article loaded/saved in database");
			}
		});

	} //end of for-in loop

	// respond to browser
	return res.send("loaded articles");

} // end of loadData function


/*	

	// push newArticle object into the 'article' array.
	// this new article will remain for as long as you 
	articles.push(newArticle)

	// redirect to the article's page
	res.redirect('/article/'+ newArticle.slug)

}
*/
/*
	Articles Data
*/ 

var articles= [];
articles.push({
	slug : 'johnson_wins_2nd_daytona_500_patrick_finishes_8th',
	headline : 'JOHNSON WINS 2ND DAYTONA 500; PATRICK FINISHES 8TH',
	timepost : 'Feb 24, 8:11 PM EST',
	twitter : 'ap',
	photo: 'http://hosted.ap.org/photos/B/bfee081e-36e7-48df-b9e3-03f508ee0112-big.jpg',
	urlA : 'http://hosted.ap.org/dynamic/stories/C/CAR_NASCAR_DAYTONA_500?SITE=AP&SECTION=HOME&TEMPLATE=DEFAULT&CTIME=2013-02-24-20-11-36',
	text : 'Jimmie Johnson went two years without a title and suddenly became an afterthought at the Daytona 500.',
	category : false
});

articles.push({
	slug : 'ny_cannibalsim',
	headline : "WITNESS: NYC OFFICER EYED COLLEAGUE FOR KIDNAP",
	timepost : 'Feb. 28 3:42 PM EST',
	twitter : 'ap',
	photo: 'http://binaryapi.ap.org/256809aaaaf448f98177ea4dc1eecdba/460x.jpg',
	urlA : 'http://bigstory.ap.org/article/its-reality-vs-fantasy-ny-cannibalism-trial',
	text : 'NEW YORK (AP) — The cannibalism case against a police officer took another macabre turn on Thursday when an FBI agent testified that a New York Police Department supervisor was among the women the officer considered a potential target for a kidnap and torture.',
	category : false
});

articles.push({
	slug : 'The_Vatican_Just_Deleted_All_of_Pope Benedicts_Tweets',
	headline : "The Vatican Just Deleted All of Pope's Tweets",
	timepost : 'Feb. 28 3:10 PM ET',
	twitter : 'pontifex',
	photo : "http://cdn.theatlanticwire.com/img/upload/2013/02/28/twitter1/large.jpg",
	urlA: 'http://www.theatlanticwire.com/technology/2013/02/vatican-just-deleted-all-pope-benedicts-tweets/62640/',
	text : 'They have replaced his name with "Sede Vacante," the Latin term used to indicate the time periods when there is no pope. (Literally: "the seat being vacant.") The @Pontifex handle remains quiet, awaiting its new owner.',
	category : true
});

// Look up an article by id
// accepts an 'id' parameter
// loops through all articles, checks 'id' property
// returns found article or returns false is not found
var getArticleById = function(slug) {
	for(a in articles) {
		var currentArticle = articles[a];

		// does current article's id match requested id?
		if (currentArticle.slug == slug) {
			return currentArticle;
		}
	}

	return false;
}


