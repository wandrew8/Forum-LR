
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

  // Carousel Initiation and Functionality
        $('.carousel').carousel({
          interval: false
        })

});
      
//Lightbox functionality
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
    
});

function displayCards(result) {
    
    let blogContainer = document.getElementById("blog-container");
    for (let i = 0; i < 9; i++) {
        blogContainer.innerHTML += 
        `<div class="col-12 col-md-6 col-xl-4">
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
      method: "GET"
    }).then(function (response) {
      console.log("response", response)
      let num = 6;
      for (let i = 0; i < response.items.length; i++) {
        
        var videoID = response.items[i].id.videoId;
        var videoImage = response.items[i].snippet.thumbnails.high.url
        
        if (typeof videoID === "undefined") {
          console.log(`video ${i} is undefined`)
          i++;
        } else {
        
        console.log("videoId", videoID)
        
        let videoContainer = document.querySelector("#videoContainer");
        
        videoContainer.innerHTML += `<div class="col-md-4 my-3"><a href="https://www.youtube.com/embed/${videoID}" data-toggle="lightbox" data-gallery="videoGallery" class="col-md-4"><img src="${videoImage}" class="img-fluid rounded"></a></div>`;
      }
    }
      
    })
  }

  
   
  
   