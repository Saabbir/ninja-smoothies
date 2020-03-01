  import firebase from 'firebase'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC4pXTMn1LGKt_AkNLPLmrQP588FMI22nE",
    authDomain: "app-ninja-smoothies.firebaseapp.com",
    databaseURL: "https://app-ninja-smoothies.firebaseio.com",
    projectId: "app-ninja-smoothies",
    storageBucket: "app-ninja-smoothies.appspot.com",
    messagingSenderId: "372101607256",
    appId: "1:372101607256:web:ece05a2b14f3e6fd77ff2d"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()