
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
	GET /astronauts/:astro_id
*/
exports.detail = function(req, res) {

	console.log("detail page requested for " + req.params.article_id);

	//get the requested astronaut by the param on the url :astro_id
	var article_id = req.params.article_id;
	var currentArticle = getArticleById(article_id);

	if (!currentArticle) {
		res.status(404).render('404.html');
	}

	var templateData = {
		article : currentArticle,
		article : articles,
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
		time posted : req.body.timepost,
		skills : req.body.skills,
		URL : req.body.photoUrl,
		slug : req.body.headline.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
	}

	// push newAstro object into the 'astronauts' array.
	// this new astronaut will remain for as long as you 
	articles.push(newArticle)

	// redirect to the astronaut's page
	res.redirect('/article/'+ newArticle.slug)

}

/*
	Astronaut Data
*/ 

var article= [];
article.push({
	slug : 'john_glenn',
	headline : 'John Glenn',
	time posted : 'July 18, 1921',
	twitter : ['Mercury-Atlas 6','STS-95'],
	url : 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPN-2000-001027.jpg/394px-GPN-2000-001027.jpg',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/John_Glenn'
	},
	article text : 'Test pilot',
	category : false
});

article.push({
	slug : 'john_glenn',
	headline : 'John Glenn',
	time posted : 'July 18, 1921',
	twitter : ['Mercury-Atlas 6','STS-95'],
	photo : 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPN-2000-001027.jpg/394px-GPN-2000-001027.jpg',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/John_Glenn'
	},
	article text : 'Test pilot',
	category : false
});

article.push({
	slug : 'john_glenn',
	headline : 'John Glenn',
	time posted : 'July 18, 1921',
	twitter : ['Mercury-Atlas 6','STS-95'],
	photo : 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPN-2000-001027.jpg/394px-GPN-2000-001027.jpg',
	source : {
		name : 'Wikipedia',
		url : 'http://en.wikipedia.org/wiki/John_Glenn'
	},
	article text : 'Test pilot',
	category : false
});

// Look up an article by id
// accepts an 'id' parameter
// loops through all articles, checks 'id' property
// returns found article or returns false is not found
var getarticle = function(slug) {
	for(a in article) {
		var currentArticle = article[a];

		// does current astronaut's id match requested id?
		if (currentArticle.slug == slug) {
			return currentArticle;
		}
	}

	return false;
}


