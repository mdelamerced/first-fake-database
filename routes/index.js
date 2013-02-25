
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
		article : article,
		pageTitle : "News Articles (" + article.length + ")"
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
		article : currentArticle,
		article : article,
		pageTitle : currentArticle.name
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
		skills : req.body.skills,
		URL : req.body.photoUrl,
		slug : req.body.headline.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
	}

	// push newArticle object into the 'article' array.
	// this new article will remain for as long as you 
	article.push(newArticle)

	// redirect to the article's page
	res.redirect('/article/'+ newArticle.slug)

}

/*
	Articles Data
*/ 

var article= [];
article.push({
	slug : 'johnson_wins_2nd_daytona_500_patrick_finishes_8th',
	headline : 'JOHNSON WINS 2ND DAYTONA 500; PATRICK FINISHES 8TH',
	timepost : 'Feb 24, 8:11 PM EST',
	twitter : ['@apnews'],
	photo : 'http://hosted.ap.org/dynamic/stories/C/CAR_NASCAR_DAYTONA_500?SITE=AP&SECTION=HOME&TEMPLATE=DEFAULT&CTIME=2013-02-24-20-11-36',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/John_Glenn'
	},
	text : 'Test pilot',
	category : false
});

article.push({
	slug : 'john_glenn',
	headline : 'John Glenn',
	timepost : 'July 18, 1921',
	twitter : ['Mercury-Atlas 6','STS-95'],
	photo : 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPN-2000-001027.jpg/394px-GPN-2000-001027.jpg',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/John_Glenn'
	},
	text : 'Test pilot',
	category : false
});

article.push({
	slug : 'john_glenn',
	headline : 'John Glenn',
	timepost : 'July 18, 1921',
	twitter : ['Mercury-Atlas 6','STS-95'],
	photo : 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPN-2000-001027.jpg/394px-GPN-2000-001027.jpg',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/John_Glenn'
	},
	text : 'Test pilot',
	category : false
});

// Look up an article by id
// accepts an 'id' parameter
// loops through all articles, checks 'id' property
// returns found article or returns false is not found
var getarticle = function(slug) {
	for(a in article) {
		var currentArticle = article[a];

		// does current article's id match requested id?
		if (currentArticle.slug == slug) {
			return currentArticle;
		}
	}

	return false;
}


