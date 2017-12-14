
     var config = {
      apiKey: "AIzaSyCyMU9lZDhFUeJmEJ-X9lPmRoMQawZYWSs",
      authDomain: "train-79f5a.firebaseapp.com",
      databaseURL: "https://train-79f5a.firebaseio.com",
      projectId: "train-79f5a",
      storageBucket: "",
      messagingSenderId: "945047856527"
    };

    firebase.initializeApp(config); 

    
    var database = firebase.database();

    $("#add-train").on("click", function(event) {
      event.preventDefault();
      console.log("test");

      // Grabbed values from text boxes
      var trainName = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrainTime = $("#time-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      // Code for handling the push
      database.ref().push({
        name: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().firstTrainTime;
  var frequency = parseInt(childSnapshot.val().frequency);

  
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);


    
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime); 
    
    var tRemainder = diffTime % frequency; 
    console.log(tRemainder);

    
    var tMinutesTillTrain = frequency - tRemainder; 
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});