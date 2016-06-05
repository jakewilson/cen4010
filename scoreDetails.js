var username = window.location.search.split("=")[1];
function updateHighScore(username) {
  var header = "<tr> " +
      "<th>Shots fired</th>" +
      "<th>carrots collected</th>" +
      "<th>enemies killed</th>" +
      "<th>animals rescued</th>" +
      "<th>time (seconds)</th>" +
      "<th>Score</th>" +
    "</tr>";
  $("#highScoreTable").html(header);
  $.get('/playerStats?username='+username, function(data) {
    $.each(data, function(_, it) {
      console.log(it);
      $("#highScoreTable")
        .append("" +
          "<tr>" +
            "<td> "+ it.shotsFired + "</td>" +
            "<td> "+ it.carrotsCollected + "</td>" +
            "<td> "+ it.enemiesKilled + "</td>" +
            "<td> "+ it.animalsRescued + "</td>" +
            "<td> "+ it.time.toFixed(2) + "</td>" +
            "<td> "+ it.score + "</td>" +
          "</tr>");

    });
  });
}

$(function() {
  $('h1').append(username);
  updateHighScore(username);
});
