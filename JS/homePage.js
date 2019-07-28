$("#searchBtn").on("click", function () {
    $("#topSearch").fadeToggle(300, function () {
        if ($('#searchIcon').hasClass('glyphicon-search')) {
            $('#searchIcon').removeClass('glyphicon-search');
            $('#searchIcon').addClass('glyphicon-remove');
        } else {
            $('#searchIcon').removeClass('glyphicon-remove');
            $('#searchIcon').addClass('glyphicon-search');
        }
    });
});

