
// Scrapes blog posts from "Ambassadors for a better world" website on page load
$(document).ready(function () {
  
  // To initialize AOS animations
  AOS.init();

        $.ajax({
            method: "GET",
            url: "/scrape",
        }).done(function (result) {
            console.log(result)
            console.log("this is working")
            displayCards(result)
            getVideos();
        })

});

//Lightbox functionality
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
    
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

/* init Jarallax */
jarallax(document.querySelectorAll('.jarallax'));

jarallax(document.querySelectorAll('.jarallax-keep-img'), {
    keepImg: true,
});

jarallax(document.querySelectorAll('.jarallax'), {
  speed: 0.2
});

// Navbar Scroll Effect
$(window).scroll(function() {
  if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }
});

function getVideos() {
    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA6wZLmmeTTmwU8mKtb3xg0SpC-GMxcFng&channelId=UCvlQuIexbcHyGqaWAlEV9pg&part=snippet,id&order=date&maxResults=10",

      // url: "https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCvlQuIexbcHyGqaWAlEV9pg&maxResults=10&key=AIzaSyA6wZLmmeTTmwU8mKtb3xg0SpC-GMxcFng",
      method: "GET"
    }).then(function (response) {
      console.log("response", response)
      var videoId = response.items[0].id.playlistId
      console.log("videoId", videoId)

     let videoContainer = document.getElementById("videoOutPut");
      videoContainer.innerHTML += `<iframe width="79%" height="78%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    })
  }
    
   