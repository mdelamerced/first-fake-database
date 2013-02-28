
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
exports.index = function(req, res) {
	
	console.log("listings page requested");

	var templateData = {
		article : articles,
		pageTitle : "News Articles (" + articles.length + ")"
	}

	res.render('index.html', templateData);
}

/*
	GET /article/:article_id
*/
exports.detail = function(req, res) {

	console.log("detail page requested for " + req.params.article_id);

	//get the requested article by the param on the url :astro_id
	var article_id = req.params.article_id;
	var currentArticle = getArticleById(article_id);

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

/*
	GET /create
*/
exports.articleForm = function(req, res){

	var templateData = {
		page_title : 'Add a new article'
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
	var newArticle = {
		headline : req.body.headline,
		timepost : req.body.timepost,
		text : req.body.text,
		URL : req.body.url,
		twitter : req.body.twitter,
		photo : req.body.photo,
		slug : req.body.headline.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
	}

	// push newArticle object into the 'article' array.
	// this new article will remain for as long as you 
	articles.push(newArticle)

	// redirect to the article's page
	res.redirect('/article/'+ newArticle.slug)

}

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
	url : 'http://hosted.ap.org/dynamic/stories/C/CAR_NASCAR_DAYTONA_500?SITE=AP&SECTION=HOME&TEMPLATE=DEFAULT&CTIME=2013-02-24-20-11-36',
	text : 'Jimmie Johnson went two years without a title and suddenly became an afterthought at the Daytona 500.',
	category : false
});

articles.push({
	slug : 'ny_cannibalsim',
	headline : "WITNESS: NYC OFFICER EYED COLLEAGUE FOR KIDNAP",
	timepost : 'Feb. 28 3:42 PM EST',
	twitter : 'ap',
	photo: 'http://binaryapi.ap.org/256809aaaaf448f98177ea4dc1eecdba/460x.jpg',
	url : 'http://bigstory.ap.org/article/its-reality-vs-fantasy-ny-cannibalism-trial',
	text : 'NEW YORK (AP) — The cannibalism case against a police officer took another macabre turn on Thursday when an FBI agent testified that a New York Police Department supervisor was among the women the officer considered a potential target for a kidnap and torture.',
	category : true
});

articles.push({
	slug : 'The_Vatican_Just_Deleted_All_of_Pope Benedicts_Tweets',
	headline : "The Vatican Just Deleted All of Pope's Tweets",
	timepost : 'Feb. 28 3:10 PM ET',
	twitter : 'pontifex',
	photo : "http://cdn.theatlanticwire.com/img/upload/2013/02/28/twitter1/large.jpg",
	url: 'http://www.theatlanticwire.com/technology/2013/02/vatican-just-deleted-all-pope-benedicts-tweets/62640/',
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


