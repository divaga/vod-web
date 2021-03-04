async function getVideos() {
    let url = '<YOUR API GATEWAY ENDPOINT>.amazonaws.com/dev/vod';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes)
        .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

async function renderVideos() {
    let videos = await getVideos();
    let html = '';
    counter = 0;
    videos.forEach(video => {
        let htmlSegment = `<div class=\"starter-template text-center py-5 px-3\"> 
        <h1>${video.title}</h1><br>
        <video-js id=\"${video.guid}\" class=\"vjs-default-skin\" controls preload=\"auto\" width=\"480\" height=\"280\">
        <source src=\"${video.url}\" type=\"application/x-mpegURL\"></video-js></div>
        <script>
        var player` + counter + ` = videojs(\"${video.guid}\");
        player` + counter + `.fluid(true);
        player` + counter + `.responsive(true);
        <\/script>`
        html += htmlSegment;
        counter += 1;

    
    });
    setInnerHTML(document.querySelector("#videos"), html); // does run <script> tags in HTML
}
renderVideos();
