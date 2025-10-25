// this line ensure that the page has finished loading and the DOM elements are available
// DOMContentLoaded is an event listener that fires when the page has loaded fully
document.addEventListener('DOMContentLoaded', () => {
    // this line is storing the form element in a variable for easier access
    // I would normally have an id on the form in order to make this an easier selector, 
  const form = document.querySelector('form[action="/message"]');

  // this line is storing the fullname input into the nameInput variable
  // using .getElementById the fullName input it stored
  const nameInput = document.getElementById('fullName');

  // similar to above this is storing messageText input into a variable
  const messageInput = document.getElementById('messageText');

  // this line adds an event listener to the form that will run when the form is submitted
  // the submit event occurs before the form is submitted to the back end, this allows client side validation and other code to be run on the form info before it's submitted
  // the e in the function is the the event object generated when the event listener fires it contains data about the event such as which element it came from, when it happened, and gives you ways to control it
  form.addEventListener('submit', (e) => {

    // this line is trimming the whitespace from the name input and then storing that trimmed name in nameVal
    const nameVal = nameInput.value.trim();

    // this line is doing the same for the message input
    const messageVal = messageInput.value.trim();

    // this line is setting the error message to '' by default, which won't fire the alert, only if there is an error and the message is changed will the alert be fired
    let errorMsg = '';

    // this line is changing the error msg by if the name input is empty, it adds this string to the errorMsg variable and then adds an line break so the other error can also be added if needed
    if (!nameVal) errorMsg += 'Please enter your full name.\n';

    // this line is adding the string to the errorMsg if the message field is empty, by using += instead of just = you can have both errors in the alert if needed
    if (!messageVal) errorMsg += 'Please write a message.\n';

    // if errorMsg has any text this if statement will fire, if no text is found it won't run and the form will be submitted to the server
    if (errorMsg) {

        // this line prevents the browser from sending the form to the server
      e.preventDefault();
      
      // this fires the alert and includes the errorMsg strings in it
      alert(errorMsg);

      // this snippet will select the first field that caused the error to fire
      if (!nameVal) nameInput.focus();
      else messageInput.focus();
    }
  });
});