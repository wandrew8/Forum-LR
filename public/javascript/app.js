$(document).ready(function () {

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
    
    let blogContainer = document.getElementById("blog-container");
    for (let i = 0; i < result.length; i++) {
        blogContainer.innerHTML += 
        `<div class="col-xs-12 col-sm-6 col-lg-4">
        <div class="card my-3">
            <div class="card-body">
              <h2 class="card-title">${result[i].headline}</h2>
              <hr>
              <p class="byline">${result[i].date}</small>
                <p class="card-text">${result[i].summary}</p>
            </div>
          <div class="text-center pb-3">
            <a href="${result[i].link}" target="_blank" class="btn btn-primary">Read More<i class="fas pl-2 fa-share-square"></i></a>
          </div>
        </div>
      </div>`
      console.log("This is the " + i + " result: " + result[i])
    }
}