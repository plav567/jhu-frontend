// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/


// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)

(function (window) {

  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  // STEP 10:
  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using either the helloSpeaker's or byeSpeaker's 'speak' method.
  // See Lecture 50, part 1
  for (var name in names) {

    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var firstLetter = names[name].charAt(0).toLowerCase();

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter === 'j') {
      // byeSpeaker.xxxx
      byeSpeaker.speak(names[name]);
    } else {
      // helloSpeaker.xxxx
      helloSpeaker.speak(names[name]);
    }
  }

  // Use map function to create an array based on the names array
  // The array will contain the greetings based on the names with the same rules
  // as implemented previously
  // The function passed into the map function should be a separate named function

  var speakSimple = function(name) {
    var firstLetter = name.charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  };

  var simpleGreetings = names.map(speakSimple);

  for (greeting in simpleGreetings) {
    console.log(simpleGreetings[greeting]);
  }

  // Use reduce function to create 2 separate arrays:
  // One with all the hello greetings
  // And another with all the goodbye greetings
  // Loop over each array and print out the greetings
  // with console.log

  var initialValue = {hello:[], bye:[]};

  var speakSeparate = function (separateGreetings, name, index, array) {
    var simpleGreeting = speakSimple(name);
    var firstLetter = simpleGreeting.charAt(0).toLowerCase();

    if (firstLetter === 'h') {
        separateGreetings.hello[separateGreetings.hello.length] = simpleGreeting;
    } else {
        separateGreetings.bye[separateGreetings.bye.length] = simpleGreeting;
    }

    return separateGreetings;
  };

  var separateGreetings = names.reduce(speakSeparate, initialValue);

  for (var greeting in separateGreetings.hello) {
    console.log(separateGreetings.hello[greeting]);
  }

  for (var greeting in separateGreetings.bye) {
    console.log(separateGreetings.bye[greeting]);
  }


}) (window);
