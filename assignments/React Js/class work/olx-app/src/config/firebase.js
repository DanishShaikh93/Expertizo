import Swal from 'sweetalert2'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    onAuthStateChanged
} from "firebase/auth";

//Import firestore DB
import { 
  getFirestore,
  collection, 
  addDoc,
  getDocs,
  where,
  query 
 } from "firebase/firestore";


 import { 
  getStorage, 
  ref, 
  uploadBytes,
  getDownloadURL 
} from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFY9NqwPNKn4w5ROfe7XsCOqIusCaujsA",
    authDomain: "olx-app-48c3f.firebaseapp.com",
    projectId: "olx-app-48c3f",
    storageBucket: "olx-app-48c3f.appspot.com",
    messagingSenderId: "62166399693",
    appId: "1:62166399693:web:fac637b2133f67ece28784"
};


// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD-TwBnjAlzfKFg9BAz-EYsEphJTHR5h-s",
//   authDomain: "olx-app-1deb1.firebaseapp.com",
//   projectId: "olx-app-1deb1",
//   storageBucket: "olx-app-1deb1.appspot.com",
//   messagingSenderId: "211283374995",
//   appId: "1:211283374995:web:142fc4a1b6efaec4906e66"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

//Initialize Firebase Storage
export const storage = getStorage(app);






export async function register(userInfo) {
  try{
    const { firstName, lastName, email, phone, password, dob, gender, dp } = userInfo;

//Step 1 upload ad image to Firebase Storage
const storageRef = ref(storage, `userDps/${dp.name}`);
await uploadBytes(storageRef, dp);

//Step 2 Uploaded image ka url get krna hai jo storage mein save krayi thi
const userDpUrl= await getDownloadURL(storageRef);


const userCredential = await createUserWithEmailAndPassword(auth, email, password);

 // Access the user's UID
//  console.log('check userCredential ', userCredential)
 const uid = userCredential.user.uid;
//  console.log('current user id after registration: ', uid);

   // Add a new document with a generated id.
await addDoc(collection(db, "users"), {
  userId: uid,
  firstName: firstName,
  lastName: lastName,
  email: email,
  phone: phone,
  dob: dob,
  gender: gender,
  userDp: userDpUrl
});

alert("Successfully Registered !");

return true;

  }catch (e) {
alert(e.message);
throw e;
  }
        

}





export async function login(userInfo) {
  try{
const {email, password} = userInfo;
await signInWithEmailAndPassword(auth, email, password);
 alert("Login Successfully");

return true

}catch (e) {
  alert(e.message);
  throw e;
    }

}


export async function adPostToDb(adDetails) {
 
  try{

   const {adTitle, adPrice, adDescription, adImage, currentUser} = adDetails;

   //Step 1 upload ad image to Firebase Storage
   const storageRef = ref(storage, `adsImages/${adImage.name}`);
   await uploadBytes(storageRef, adImage);

   //Step 2 Uploaded image ka url get krna hai jo storage mein save krayi thi
   const adImageUrl= await getDownloadURL(storageRef);

  //Step 3 add image link to firestore DB with other fields
   await addDoc(collection(db, "ads"), {
     adTitle,
     adPrice,
     adDescription,
     adImage: adImageUrl,
     userId: currentUser.userId,
     authorFirstName: currentUser.firstName,
     authorLastName: currentUser.lastName,
     authorEmail: currentUser.email
    })
    Swal.fire({
      title: "Good job!",
      text: "Ad Posted Successfully",
      icon: "success"
    });

    return true;

  } catch (error){
    alert("Error! Please try again");
    throw error;
  }
}


//Get All Ads
export async function getAds() {

  const querySnapshot = await getDocs(collection(db, "ads"));
  const ads = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    const ad = doc.data() // {tittle , price , description, imageUrl}
    ad.id = doc.id //{id , tittle , price , description, imageUrl}
    ads.push(ad)
  });

  return ads
  
}
