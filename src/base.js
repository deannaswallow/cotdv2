import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCpXyervvuEnwCb9RsDeTYUvJmNjkihz5w",
  authDomain: "catch-of-the-day-deanna.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-deanna.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
