var getDoctors = require("./../js/doctor.js").getDoctors;
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
    "<div class='bio'>" +
      "<h4>Bio:</h4>" +
      "<p>" + docObj.bio + "</p>" +
    "</div>" +
    "<div>");
  } else {
    $("#doctor-display").html("");
    $("#doctor-display").append("<h2>No doctors found</h2>");
  }
}

$(document).ready(function(){
  $("#doctor-lookup").submit(function(e){
    e.preventDefault();
    $("#doctor-display").html("");
    getDoctors($("#medicalIssue").val(), displayDoctors);
  });
});
