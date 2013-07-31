window.addEventListener("load", function() {
    var searchField = document.getElementById("index-search"),
        nav = document.querySelectorAll(".js-api-subnav")[0],
        details = nav.querySelectorAll("details");

    var searchTimeout;

    searchField.addEventListener("keyup", function() {
        var searchTerm = searchField.value;
        if(searchTerm) {
            location.hash = "#!search=" + searchTerm;
        } else {
            location.hash = "";
        }
        if(!searchTimeout) {
            searchTimeout = setTimeout(function() {
                search(searchField.value);
            }, 300);
        }
    });

    nav.addEventListener("click", function(event) {
        var searchTerm = searchField.value;
        if (event.target.tagName == "A" && searchTerm) {
            window.location = event.target.href + "#!search=" + searchTerm;
            event.preventDefault();
        }
    });

    var search = function(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        Array.prototype.forEach.call(details, function(detail) {
            Array.prototype.forEach.call(detail.querySelectorAll("ul li"), function(li) {
                if(searchTerm) {
                    var anchor = li.querySelectorAll("a")[0];
                    if(anchor.childNodes[0].data.toLowerCase().indexOf(searchTerm) !== -1) {
//                        anchor.href = anchor.href + location.hash;

                        detail.setAttribute("open",true);
                        li.style.display = 'list-item';
                    } else {
                        li.style.display = 'none';
                        if (! detail.hasAttribute("open")) {
                            detail.removeAttribute("open");
                        }
                    }
                } else {
                    li.style.display = 'list-item';
                }
            });
        });
        searchTimeout = null;
    };

    var queryString = function(parameter) {
       var i, key, value, equalSign;
       var loc = location.hash.substring(2, location.hash.length);
       var params = loc.split('&');
       for (i=0; i<params.length;i++) {
           equalSign = params[i].indexOf('=');
           if (equalSign < 0) {
               key = params[i];
               if (key == parameter) {
                   value = true;
                   break;
               }
           }
           else {
               key = params[i].substring(0, equalSign);
               if (key == parameter) {
                   value = params[i].substring(equalSign+1);
                   break;
               }
           }
       }
       return value;
   };

    var searchQuery = queryString("search");
    if(searchQuery) {
        searchField.value = searchQuery;
        search(searchQuery);
    }
    nav.style.visibility = "visible";
})
