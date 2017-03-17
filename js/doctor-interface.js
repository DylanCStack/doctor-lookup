var getDoctors = require("./../js/doctor.js").getDoctors;
var getSpecialties = require("./../js/doctor.js").getSpecialties;

var Doctor = require("./../js/doctor.js").doctorModule;

function displayDoctors(docObj){
console.log(docObj);
  if(docObj){
  $("#doctor-display").append("<div class='doctor'>" +
  "<img src='" + docObj.image +"'>" +
    "<ul>" +
      "<li>" + docObj.name + "</li>" +
      "<li>" + docObj.gender + "</li>" +
    "</ul>" +
    "<p>Specialties: " + docObj.specialties + "</p>" +
    "<div class='bio well'>" +
      "<h4>Bio:</h4>" +
      "<p>" + docObj.bio + "</p>" +
    "</div>" +
    "<div>");
  } else {
    $("#doctor-display").html("");
    $("#doctor-display").append("<div class='alert alert-warning'>No doctors found</div>");
  }
}
function displaySpecialties(special){
  $("#doctor-display").append(
    "<div class='specalty'>" +
      "<h4>" + special.name + "</h4>" +
      "<h5>" + special.category + "</h5>" +
      "<div class='description well'>" +
        "<h5>Description:</h5>" +
        "<p>" + special.description + "</p>" +
      "</div>" +
    "</div>");
}

$(document).ready(function(){
  $("#doctor-lookup").submit(function(e){
    e.preventDefault();
    $("#doctor-display").html("");
    getDoctors($("#medicalIssue").val(), displayDoctors);
  });

  $("#specialty-lookup").submit(function(e){
    e.preventDefault();
    $("#doctor-display").html("");

    getSpecialties($("#specialty-number").val(), displaySpecialties);
  });
  $("#view-more").click(function(){
    //will query the api for more specialties to view, skipping the ones already viewed, add after working tabs
  });
});
