function updateHighScore(username) {
  var header = "<tr>" +
      "<th>Player Name</th>" +
      "<th>Time (seconds) </th>"+
    "</tr>";
  $("#highScoreTable").html(header);
  $.get('/highScore?username='+username, function(data) {
    $.each(data, function(_, it) {
      $("#highScoreTable")
        .append("<tr>" +
                  "<td>" +
                    "<a href='/at/playerStats.html?username="+ it.username +"'>"+
                      it.username +
                    "</a>" +
                  "</td>" +
                  "<td>" +
                    it.time.toFixed(2) +
                  "</td>" +
                "</tr>");
    });
  });
}
$(function() {
  updateHighScore("");
  $("#search").on('click', function() {
    $('td').remove();
    updateHighScore($("#username").val());
  });
});
