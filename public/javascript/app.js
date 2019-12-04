// To initialize AOS animations
AOS.init();

// Scrapes blog posts from "Ambassadors for a better world" website on page load
$(document).ready(function () {

        $.ajax({
            method: "GET",
            url: "/scrape",
        }).done(function (result) {
            console.log(result)
            console.log("this is working")
            displayCards(result)
        })

});

function displayCards(result) {
    
    let blogContainer = document.getElementById("blog-container");
    for (let i = 0; i < result.length; i++) {
        blogContainer.innerHTML += 
        `<div class="col-12 col-sm-6 col-xl-4">
        <div data-aos="fade-up"
        data-aos-duration="1000" class="card blog-card my-3">
            <div class="card-body">
              <h2 class="card-title">${result[i].headline}</h2>
              <hr class="card-rule">
              <div class="byline tag">${result[i].date}</div>
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

