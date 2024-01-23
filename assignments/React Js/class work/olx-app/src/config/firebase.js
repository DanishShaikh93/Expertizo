// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
} from "firebase/auth";

//Import firestore DB
import { 
  getFirestore,
  collection, 
  addDoc,
  getDocs 
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Initialize Firebase Storage
const storage = getStorage(app);






export async function register(userInfo) {
  try{
    const { name, age, email, password } = userInfo;
  await createUserWithEmailAndPassword(auth, email, password);
   // Add a new document with a generated id.
await addDoc(collection(db, "users"), {
  name: name,
  age: age,
  email: email,
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
  console.log(adDetails)
  try{

   const {adTitle, adPrice, adDescription, adImage} = adDetails;

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
    })
    alert("Ad Posted Successfully")

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