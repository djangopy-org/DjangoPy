$(document).ready(function(){
  var clipbrd = new Clipboard('.btn-clipboard');
  clipbrd.on('success', function(e) {
    e.clearSelection();
  });
  $('[data-toggle=tooltip]').tooltip({trigger: 'click'});

  $("code").each(function(i, ele){
    $(ele).attr("id", "code-" + i)
    $(ele).prepend("<button type = 'button' data-clipboard-action='copy' data-toggle='tooltip' data-placement='bottom' title='Copy to Clipboard' class = 'btn clippy btn-clipboard' data-clipboard-target='" + "#code-" + i + "'><span alt='Copy to clipboard'>Copy</span></button>");
  });
  $("code").hover(function(){
    $(this).find(".btn-clipboard").css("display", "inline-block");
  })
  $('code').mouseenter(function() {
    $(this).find(".btn-clipboard").css("display", "inline-block");  
  });
  $('code').mouseleave(function() {
    $(this).find(".btn-clipboard").css("display", "none");  
  });

  $(".btn-clipboard").click(function () {
    $(this).text("Copied!");
    setTimeout(function(){
        $(".btn-clipboard").text("Copy");
    }, 1000);
  });
});
