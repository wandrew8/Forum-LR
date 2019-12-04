// ==============================================================================
// DEPENDENCIES
// ==============================================================================

const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");


// ==============================================================================
// EXPRESS AND MIDDLEWARE CONFIGURATION
// ==============================================================================

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==============================================================================
// SERVES STATIC CONTENT
// ==============================================================================

app.use(express.static('public'));

// ==============================================================================
// SCRAPE BLOG CONTENT
// ==============================================================================



app.get("/scrape", function (req, res) {
    axios.get("https://ambassadorsforabetterworld.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        var headlineEL = $(".entry-title a");
        var linkEL = $(".entry-title a");
        var summaryEL = $(".entry-content p:first-child");
        var dateEL = $(".entry-date");
        var result = [];

        $("article").each(function (i, element) {


            headline = $(element).find(headlineEL).text();
            link = $(element).find(linkEL).attr("href");
            summary = $(element).find(summaryEL).text();
            date = $(element).find(dateEL).text();

            result.push({
                headline: headline,
                link: link,
                summary: summary,
                date: date
            })
            console.log(result)
        });
        res.json(result)
    });
});



// =============================================================================
//  START EXPRESS APP
// =============================================================================

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


