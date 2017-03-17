var getDoctors = require("./../js/doctor.js").getDoctors;
var getSpecialties = require("./../js/doctor.js").getSpecialties;

var Doctor = require("./../js/doctor.js").doctorModule;

function displayDoctors(docObj){
console.log(docObj);
  if(docObj){
  $("#display").append("<div class='doctor'>" +
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
    $("#display").html("");
    $("#display").append("<div class='alert alert-warning'>No doctors found</div>");
  }
}
function displaySpecialties(special){
  $("#display").append(
    "<div class='specialty'>" +
      "<h4 class='title'>" + special.name + "</h4>" +
      "<h5 class='title'>" + special.category + "</h5>" +
      "<div class='description well'>" +
        "<h5>Description:</h5>" +
        "<p>" + special.description + "</p>" +
      "</div>" +
    "</div>");
}

$(document).ready(function(){
  $("#doctor-lookup").submit(function(e){
    e.preventDefault();
    $("#display").html("");
    getDoctors($("#medicalIssue").val(), displayDoctors);
  });

  $("#specialty-lookup").submit(function(e){
    e.preventDefault();
    $("#display").html("");
    getSpecialties($("#specialty-number").val(), displaySpecialties);
  });

});
