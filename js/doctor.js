var apiKey = require("./../.env").apiKey;
var googleKey = require("./../.env").googleKey;


//old location: &location=45.5231%2C-122.6765%2C%205
//new location: &location=37.773%2C-122.413%2C100

function Doctor(image, name, gender, specialties , bio){
//add , education, bio, accepting,
  this.image = image;
  this.name = name;
  this.gender = gender;
  this.specialties = specialties;
  this.bio = bio;
}

exports.getDoctors = function(medicalIssue, callback) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      console.log(result);
      var numDoctors = result.data.length;
      if(!numDoctors){
        callback(false);
      }
      var doctors = [];
      for(var i = 0; i < numDoctors; i++){
        var numSpecialties = result.data[i].specialties.length;
        var specialties = "";
        for(var j = 0; j < numSpecialties; j++){
          specialties+=", "+(result.data[i].specialties[j].actor);
        }
        specialties = specialties.substring(1);
        var newDoc = new Doctor(
          result.data[i].profile.image_url,
          result.data[i].profile.first_name + " " +
          result.data[i].profile.last_name,
          result.data[i].profile.gender,
          specialties,
          result.data[i].profile.bio
        );

        callback(newDoc);
        doctors.push(newDoc);
      }
      console.log(doctors);
    })
   .fail(function(error){
      console.log("fail");
    });
};
exports.getSpecialties = function(specialtiesSearched, callback) {
  var skipNum = 0;
  if(specialtiesSearched > 100){
    skipNum = parseInt(specialtiesSearched/100);
    specialtiesSearched = specialtiesSearched%100;
  }
  $.get('https://api.betterdoctor.com/2016-03-01/specialties?limit='+ specialtiesSearched + skipNum +'&user_key=' + apiKey)
   .then(function(result) {
      var numSpecialties = result.data.length;
      var allSpecialties = [];
      for(var i = 0; i < numSpecialties; i++){
        allSpecialties.push(result.data[i]);
        // callback(result.data[i]);
      }
      allSpecialties.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
      for(var i = 0; i < allSpecialties.length; i++){
        callback(allSpecialties[i]);
      }
    })
   .fail(function(error){
      console.log("fail");
    });
};
exports.doctorModule = Doctor;
