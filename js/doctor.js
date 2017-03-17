var apiKey = require("./../.env").apiKey;

//old location: &location=45.5231%2C-122.6765%2C%205
//new location: &location=37.773%2C-122.413%2C100

function Doctor(image, name, gender, bio){
//add , education, bio, accepting,
  this.image = image;
  this.name = name;
  this.gender = gender;
  this.bio = bio;
}
exports.getDoctors = function(medicalIssue, callback) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      console.log(result);
      var numDoctors = result.data.length;
      var doctors = [];
      for(var i = 0; i < numDoctors; i++){

        newDoc = new Doctor(
          result.data[i].profile.image_url,
          result.data[i].profile.first_name + " " +
          result.data[i].profile.last_name,
          result.data[i].profile.gender,
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
exports.doctorModule = Doctor;
