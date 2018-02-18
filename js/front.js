// google analytics
var data = {};

function processPageView(rows){
    $.map(rows, function(val){
      data[val[0]] = val[1];
    })
    var url = $("#ga-page-view").attr("ga-page-url");
    $("#ga-page-view").text(data[url]);
    $(".ga-page-view").each(function(i, val){
        url = $(this).attr("ga-page-url");
        $(this).text(data[url]);
    })
}


/*global $, document, Chart, LINECHART, data, options, window, setTimeout*/
$(document).ready(function () {
    'use strict';

    $.ajax({
        url: "/pageviews.json", 
        dataType: "json",
        timeout: 1000 * 10, // 30 sec
        success: function(data) {
            processPageView(data.rows);
        },
        error: function() {
          console.log("Error in fetching views")
        }
    });  



    $(".post-content a").each(function(i, ele){
        if( $(ele).parent().is("h1")  || $(ele).parent().is("h2") || $(ele).parent().is("h3") ){
            $(this).css("text-decoration", "none");
            $(this).css("color", "#212529");
        }
        else{
            $(ele).attr("target", "_blank");
        }
        
    })

    var feedArray = [];
    $("#search_button").click(function(){
        $("#search").val("");
        $("#search_results").html("");

        if(feedArray.length) return false;

        $.ajax({
            type: "GET",
            url: "/feed.xml",
            dataType: "xml",
            success: function(returnedXMLResponse) {
                $($(returnedXMLResponse).find('item')).each(function(index, content){
                    var feed = {};
                    feed['link'] = $(content).find("link").text();
                    feed['title'] = $(content).find("title").text();
                    feed['description'] = $(content).find("description").text();
                    var tags = [];
                    $($(content).find("category")).each(function(i, value){
                        tags.push(value.innerHTML);
                    });
                    feed['tags'] = tags;
                    feedArray.push(feed);
                    
                });
            },
            error: function() {
                console.error("Failed to get search results")
            }
        });        
    })


    $("#search_form").submit(function(e){
        e.preventDefault();
        var search_query = $("#search").val().toLowerCase();
        var search_results = "";
        var count = 0;
        for(var i = 0; i < feedArray.length; i++){
            var q1 = feedArray[i].title.toLowerCase().search(search_query) != -1;
            var q2 = feedArray[i].description.toLowerCase().search(search_query) != -1;
            var q3 =  (feedArray[i].tags).indexOf(search_query) != -1; 
            if(q1 || q2 || q3){
                count++;
                search_results += "<p><a href = '" + feedArray[i].link + "'>" + feedArray[i].title + "</a></p>"
            }
        }
        if(count == 0){
            search_results = "<p style = 'color:red'>No results found</p>"
        }
        setTimeout(function() {
            $("#search_results").html("<br>" + search_results);
        }, 200);
    })



    // ------------------------------------------------------- //
    // For demo purposes only
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $( "<link id='new-stylesheet' rel='stylesheet'>" ).insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, { expires: 365, path: document.URL.substr(0, document.URL.lastIndexOf('/')) });

        }

        return false;
    });


    // ------------------------------------------------------- //
    // Equalixe height
    // ------------------------------------------------------ //
    function equalizeHeight(x, y) {
        var textHeight = $(x).height();
        $(y).css('min-height', textHeight);
    }
    equalizeHeight('.featured-posts .text', '.featured-posts .image');

    $(window).resize(function () {
        equalizeHeight('.featured-posts .text', '.featured-posts .image');
    });


    // ---------------------------------------------- //
    // Preventing URL update on navigation link click
    // ---------------------------------------------- //
    $('.link-scroll').bind('click', function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top + 2
        }, 700);
        e.preventDefault();
    });


    // ---------------------------------------------- //
    // FancyBox
    // ---------------------------------------------- //
    $("[data-fancybox]").fancybox();


    // ---------------------------------------------- //
    // Divider Section Parallax Background
    // ---------------------------------------------- //
    $(window).on('scroll', function () {

        var scroll = $(this).scrollTop();

        if ($(window).width() > 1250) {
            $('section.divider').css({
                'background-position': 'left -' + scroll / 8 + 'px'
            });
        } else {
            $('section.divider').css({
                'background-position': 'center bottom'
            });
        }
    });


    // ---------------------------------------------- //
    // Search Bar
    // ---------------------------------------------- //
    $('.search-btn').on('click', function (e) {
        e.preventDefault();
        $('.search-area').fadeIn();
        $("#search").focus();
    });
    $('.search-area .close-btn').on('click', function () {
        $('.search-area').fadeOut();
    });



    // ---------------------------------------------- //
    // Navbar Toggle Button
    // ---------------------------------------------- //
    $('.navbar-toggler').on('click', function () {
        $('.navbar-toggler').toggleClass('active');
    });

});
