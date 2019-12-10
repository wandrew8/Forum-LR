
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
        })

        $.ajax({
          method: "GET",
          url: "/videos",
      }).done(function (result) {
          console.log(result)
          console.log("vidoe data is being collected")
          displayVideos(result);
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
    }
}

/* Initiate Jarallax */
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

 function displayVideos(result) {
    
        for (let i = 0; i < result.items.length; i++) {
        
         var videoID = result.items[i].id.videoId;
         var videoImage = result.items[i].snippet.thumbnails.high.url
         var description = result.items[i].snippet.title.toUpperCase();
        
         if (typeof videoID === "undefined") {
           console.log(`video ${i} is undefined`)
           i++;
         } else {
        
         console.log("videoId", videoID)
        
         let videoContainer = document.querySelector("#videoContainer");
        
         videoContainer.innerHTML += `<a href="https://www.youtube.com/embed/${videoID}" data-toggle="lightbox" data-gallery="videoGallery" class="col-md-4"><img src="${videoImage}" class="img-fluid rounded"><p class="video-caption">${description}</p></a>`;
       }
     }
      
    }
   

  

  
   