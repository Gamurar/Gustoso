 $(document).ready(function() {
  /*
 * Replace all SVG images with inline SVG
 */
  $('img[src$=".svg"]').each(function() {
    var $img = jQuery(this);
    var imgURL = $img.attr('src');
    var attributes = $img.prop("attributes");

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Remove any invalid XML tags
        $svg = $svg.removeAttr('xmlns:a');

        // Loop through IMG attributes and apply on SVG
        $.each(attributes, function() {
          $svg.attr(this.name, this.value);
        });

        // Replace IMG with SVG
        $img.replaceWith($svg);
      }, 'xml');
  });

  // Add smooth scrolling to all links
  $("#our-menu").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

// Carousel
$('#myCarousel').carousel({
  interval: false
})

var $selectedImg = $('.carousel-item img.selected');
$('.carousel-item img').on('click', function(event) {
  var id = $(event.target).data("id");
  setDish(dishes[id]);
  $selectedImg.removeClass("selected");
  $(event.target).addClass("selected");
  $selectedImg = $(event.target);
});


function setDish(dish) {
  foodWidget.widget.animateCss('fadeIn');
  foodWidget.title.text(dish.title);
  foodWidget.afterword.text(dish.afterword);
  foodWidget.description.text(dish.description);
  foodWidget.readyIn.text(dish.readyIn);
  $.each(foodWidget.photo, function(index, value){
    $(value).attr({
      src: "./img/" + dish.photo,
      alt: dish.title
    });
  });

  var rating = dish.rating;
  var ratingStars = document.querySelectorAll(".rating svg");
  
  $.each(ratingStars, function(index, value) {

    if( eval(value.dataset.exp)) {
      value.classList.add("fill");
    } else {
      value.classList.remove("fill");
    }
  });

}

var foodWidget = {
  widget: $(".food-widget").first(),
  title: $(".food-widget .text .title").first(),
  afterword: $(".food-widget .text .afterword").first(),
  description: $(".food-widget .text p").first(),
  readyIn: $(".food-widget .ready-in .amount").first(),
  photo: $(".food-widget-main-photo") 
}

$.ajax({
  url: "https://xylic-expiration.000webhostapp.com/slidesData.json",
  dataType: "json",
  success: function(data) {
    dishes = data.dishes;
    setDish(dishes[0]);
  }
});
});




 function toggleMenu(elem) {
  elem.classList.contains("is-active") ? elem.classList.remove("is-active") : elem.classList.add("is-active");
}

var curDish = { };

var dishes = null;

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});