import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import editProfileImg from "../../images/edit-profile.jpg"
import avatar from "../../images/avatar.png"

import { auth } from '../../config/firebase'

import { db } from '../../config/firebase'

import { 
    ref, 
    uploadBytes,
    getDownloadURL 
  } from "firebase/storage";

import { storage } from '../../config/firebase'

import { onAuthStateChanged} from "firebase/auth";

import { collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";




function EditProfile() {

    const navigate = useNavigate();
    const [firstName, setFirstName]= useState();
    const [lastName, setLastName]= useState();
    const [email, setEmail]= useState();
    const [phone, setPhone]= useState();
    const [dob, setDob]= useState();
    const [gender, setGender] = useState('');
    const [dp, setDp]= useState();

    const[currentUser, setCurrentUser]=useState({});
    const[currentDocId, setCurrentDocId]=useState();

    //get current login info

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const loggedInUserId = user.uid;
                console.log("Logged In User ID:", loggedInUserId);
                const q = query(collection(db, "users"), where("userId", "==", loggedInUserId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setCurrentUser(doc.data());
                    setCurrentDocId(doc.id)
                    console.log(currentDocId)
                });

            } else {
                setCurrentUser("");  // Clear currentUser when the user is not authenticated
            }
        });

        // Cleanup the subscription on component unmount
        return () => unsubscribe();
    }, []);



    useEffect(() => {
        // Set the initial values when currentUser changes
        if (currentUser) {
            setFirstName(currentUser.firstName || "");
            setLastName(currentUser.lastName || "");
            setEmail(currentUser.email || "");
            setPhone(currentUser.phone || "");
            setDob(currentUser.dob || "");
            setGender(currentUser.gender || "");
            
        }
    }, [currentUser ]);


    const updateProfile = async () => {
        try {
            let userDpUrl = currentUser.userDp; // Initialize with the current userDpUrl
    
            if (dp && dp !== avatar) {
                // Update the display picture in storage and get the new URL
                const storageRef = ref(storage, `userDps/${dp.name}`);
                await uploadBytes(storageRef, dp);
                userDpUrl = await getDownloadURL(storageRef);
            }
    
            // Update the user information in the database
            const userRef = doc(db, "users", currentDocId);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
                // If the document exists, update it
                await updateDoc(userRef, {
                    firstName,
                    lastName,
                    email,
                    phone,
                    dob,
                    userDp: userDpUrl,
                });
    
                // Fetch updated user data
                const updatedUserData = (await getDoc(userRef)).data();
                setCurrentUser(updatedUserData);
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Congratulations!",
                    text: "Profile updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                
                  setTimeout(() => {
                    window.location.reload();
                }, 2000);
                
            } else {
                // Handle the case where the document doesn't exist
                console.error("User document does not exist.");
            }
        } catch (error) {
            alert(error.message);
            throw error;
        }
    };

console.log(currentDocId)
    return (
        <div className="container space-80">
             
        <div className="d-flex">
        <div className="sideImg">
        <div className="txt-center">
                    <h1>Welcome {firstName}</h1>
                    <h3>Here you can see and update all your details</h3>
                    </div>
            <img src={editProfileImg} alt="Edit Profile"/></div>
                    <div className="col">
                        
                <div className="formBox">
                <h2>Enter Your New Details If You Want To Change Any</h2>
<br/>
<br/>
                <div className="updateDpBox">
                <div>{<img src={currentUser.userDp ? currentUser.userDp : avatar} height="40" alt={firstName}/>
            }
                </div>
                <div><strong>Update new display picture</strong> <input onChange={(e) => setDp(e.target.files[0])}  type="file" /></div>
               
                </div>

                <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" value={firstName}/>
        <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" value={lastName}/>
        <input onChange={(e) => setEmail(e.target.value)}  type="email" placeholder="Email" value={email}/>
        <input onChange={(e) => setPhone(e.target.value)}  type="tel" placeholder="Phone" value={phone}/>
       
        <p className="dob"><strong>Birthday</strong>
        <input onChange={(e) => setDob(e.target.value)}  placeholder="Date Of Birth" type="date" value={dob} />
        </p>

        <p className="radioField">
            <strong>Gender</strong>
            <label>
        <input
          type="radio"
          value="male"
          checked={gender === 'male'}
          onChange={(e) => setGender(e.target.value)}
        />
        Male
      </label>

      <label>
        <input
          type="radio"
          value="female"
          checked={gender === 'female'}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
      </label>

      <label>
        <input
          type="radio"
          value="other"
          checked={gender === 'other'}
          onChange={(e) => setGender(e.target.value)}
        />
        Other
      </label>
        </p>

        
        <button onClick={updateProfile}>Update Profile</button>
        <p>Already have a account login your account <span onClick={()=> navigate('/Login')}>Here</span></p>
                </div>
                </div>
        
                
                </div>
            </div>
    )
}

export default EditProfile;