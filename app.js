var express 		= require("express"),
	mongoose 		= require("mongoose"),
	bodyParser 		= require("body-parser")
	app				= express();

//app config
mongoose.connect("mongodb://localhost/myblog_app");
app.set("view engine", "ejs");	
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//mongoose confit
var myblogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created:{type:Date, default: Date.now}
});
var Myblog = mongoose.model("Myblog", myblogSchema);



//Restful config

//***********
//INDEX ROUTE
//***********


app.get("/", function(req, res){
	res.redirect("/myblogs");
})


app.get("/myblogs", function(req, res){
   Myblog.find({}, function(err, myblogs){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("index", {myblogs: myblogs}); 
       }
   });
});

//***********
//NEW ROUTE
//***********

app.get("/myblogs/new", function(req, res){
	res.render("new");
});

//*****************
//CREATE NEW ROUTE
//****************
app.post("/myblogs", function(req, res){
	//create blog
	Myblog.create(req.body.myblog, function(err, newMyblog){
		if(err){
			res.render("new");
		} else {
		res.redirect("/myblogs");
		}
	});
});



app.listen(3000, function(){
	console.log("Server up")
});