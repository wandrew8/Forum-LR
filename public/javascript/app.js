$(document).ready(function () {

    //Scrapes articles when search button is clicked
    $(document).on("click", function () {

        $.ajax({
            method: "GET",
            url: "/scrape",
        }).done(function (result) {
            console.log(result)
            console.log("this is working")
            displayCards(result)
        })
    });
});

function displayCards(result) {
    console.log("displayCard is being hit")
}