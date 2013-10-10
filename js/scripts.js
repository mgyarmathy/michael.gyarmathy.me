google.load("feeds", "1")//Load Google Ajax Feed API (version 1)

$(document).ready(function(){

    var feed = new google.feeds.Feed('https://medium.com/feed/@mgyarmathy_/');
    
    feed.setNumEntries(100);
        
	feed.load(function(result) {
        console.log(result.feed);
		if (!result.error) {
            var articles = result.feed.entries;
            articles.sort(function(a,b){
              a = new Date(a.publishedDate);
              b = new Date(b.publishedDate);
              return b<a?-1:b>a?1:0;
            });
			$.each(articles, function(i, element) {
				$('.articles-list').append( '<div class="article">'
                                          +   '<a href="' + this.link + '"><h2>' + this.title + '</h2></a>'
                                          +   '<p>' + new Date(this.publishedDate).toDateString().substring(3) + '</p>'
                                          +   '<p>' + this.contentSnippet + '</p>'
                                          + '</div>'
                                          );
			});
		}
        
        var hash = window.location.hash;
        if (!hash) { 
            hash = '#home';
            window.location.hash = "#home";
        }
        
        $.backstretch($(hash).attr('data-back'));
        $(hash).fadeIn();
	});

    $.get('resume.md', function(data) {
        $('#resume .resume-markdown').append(markdown.toHTML(data));
        $('#resume .resume-markdown *').slice(0,3).wrapAll('<div class="heading" />');
    });
    
    $('.nav-toggle').click(function() {
        $('.nav-links').slideToggle();
        $(this).find('i').eq(0).toggleClass('icon-double-angle-down icon-double-angle-up');
    });
    
    $('#contact-form').click(function() {             
        $.post("email.php", $("#contact-form").serialize(), function(response) {
            $('#success').html(response);
        });
        return false;
    });
    
    $('#menu i').click(function() {
        $('#menu .nav-links').slideToggle('slow');
        $(this).toggleClass('icon-double-angle-up icon-double-angle-down');
    });
    
    $(window).hashchange(function(){
        var hash = location.hash;
        $.backstretch($(hash).attr('data-back'),{fade: 'slow'});
        $('.page').hide();
        $(hash).fadeIn();
    });
});