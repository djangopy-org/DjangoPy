function processPageView(data){
    var hits = data[0][1];
    $("#ga-page-view").html(hits);
}

$(document).ready(function(){
    var disqus_shortname = 'django-py'; 
    //   var disqus_developer = 1; // Comment out when the site is live
    var disqus_identifier = "{{ page.permalink }}";
    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
   var url = $("#ga-page-view").attr("ga-page-url");
   var access_token = "AIzaSyDt-388rvgaIp8YqPEAKSWvIkdwZlXPNSY";
    $.ajax({
        url: "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:149217150&start-date=2017-03-01&end-date=today&metrics=ga:pageviews&dimensions=ga:pagePath&filters=ga:pagePath==" + url + "&key=" + access_token,
        dataType: "json",
        type: "GET",
        timeout: 1000 * 10, // 30 sec
        success: function(data) {
            processPageView(data.rows);
        },
        error: function() {
            $.ajax({
                url: '/pageview.json',
                dataType: 'json',
                success: function(data) {
                    processPageView(data.rows);
                }
            })
        }
    });   
})

