$(document).ready(function() {
    var playlistArr = {
        html_css: 'PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88',
        javascript: 'PLWKjhJtqVAbleDe3_ZA8h3AO2rXar-q2V',
        reactjs: 'PLWKjhJtqVAbkArDMazoARtNz1aMwNWmvC',
        nodejs: 'PLWKjhJtqVAbmGQoa3vFjeRbRADAOC9drk'
    };
    
    var selectItem = document.getElementById('submit');
    selectItem.onclick = function() {
        var nameItem = document.querySelector('select[name=courses]').value;

        for (var ix in playlistArr) {
            if (nameItem === ix) {
                // console.log(ix);
                var plID = playlistArr[ix];
            }
        }

        var key = "AIzaSyAOJNoVuP44PgbME5vJmD5hRk9VJ2EgERQ";
        var playlistId= plID;
        var URL = "https://www.googleapis.com/youtube/v3/playlistItems";



        var options = {
            part: 'snippet',
            key: key,
            maxResults: 20,
            playlistId: playlistId
        }
        loadVideos()

        function loadVideos() {
            $.getJSON(URL, options, function(data) {
                console.log(data)
                var id = data.items[0].snippet.resourceId.videoId;
                mainVideos(id);
                resultsLoop(data)
            })
        }

        function mainVideos(id) {
            $('#video').html(`
        <iframe class="iframe"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${id}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
        `)
        }

        function resultsLoop(data) {
            $.each(data.items, function(i, item) {
                var thumb = item.snippet.thumbnails.medium.url;
                var title = item.snippet.title;
                var description = item.snippet.description.substring(0, 100);
                var video = item.snippet.resourceId.videoId;
                $('main').append(`
            <article class="item" data-key="${video}">
            <img src="${thumb}" alt="" class="thumb" />
            <div class="details">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        </article>
    
            `)


            })

            $('main').on('click', 'article', function() {
                var id = $(this).attr('data-key')
                    // alert(id)
                mainVideos(id)
            })

        }
        // var thumb = data.items[0].snippet.thumbnails.medium.url;

    }






})


// https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=nodejs&maxResults=20
// https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyAOJNoVuP44PgbME5vJmD5hRk9VJ2EgERQ&maxResults=20&playlistId=PLWKjhJtqVAbleDe3_ZA8h3AO2rXar-q2V