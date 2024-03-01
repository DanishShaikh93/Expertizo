import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
    const cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [userAlbum, setUserAlbum] = useState([]);
    const [galleryStatus, setGalleryStatus] = useState(false);

    const [type, setType] = useState(CameraType.back);


    useEffect(() => {

        userPermissions();

    }, []);


    const userPermissions = async () => {
        const camerPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibararyPermission = await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(camerPermission.status === "granted");
        setHasMediaLibraryPermission(mediaLibararyPermission.status === "granted");
    }

    if (hasCameraPermission === undefined) {
        return <Text>Requesting Permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }



    function toggleCameraFacing() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async () => {

        const options = {
            quality: 1,
            base64: true,
            exif: false

        }

        const newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    }


    if (photo) {

        const sharePic = () => {

            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            })
        }

        const savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                // setUserAlbum(photo.uri)
                setUserAlbum(prevAlbum => [...prevAlbum, photo.uri]);
                setPhoto(undefined);
            })
        }

        return (
            <View style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

                <Button title='Share' onPress={sharePic}></Button>
                {hasMediaLibraryPermission ? <Button title='Save To Gallery' onPress={savePhoto}></Button> : undefined}
                <Button title='Discard' onPress={() => setPhoto(undefined)}></Button>
            </View>
        )

    }

    const showGallery = () => {
        setGalleryStatus(true);
    }

    const backToCamera = () => {
        setGalleryStatus(false);
    }

    return (
        <>
            {galleryStatus === false ?
                <Camera style={styles.container} type={type} ref={cameraRef}>
                    <View style={styles.icons}>
                    {/* <TouchableOpacity style={styles.flashIco}>
                            <MaterialCommunityIcons style={styles.icon} name='flash' color="white" size={60} />
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={showGallery}>
                            <MaterialCommunityIcons style={styles.icon} name='folder-multiple-image' color="white" size={60} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePicture}>
                            <MaterialCommunityIcons style={styles.icon} name='camera-iris' color="white" size={60} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <MaterialCommunityIcons style={styles.icon} name='camera-flip' color="white" size={60} />
                        </TouchableOpacity>
                    </View>
                </Camera>
                :
                <View>
                    
                   <View style={styles.imageContainer}>
                        {Array.isArray(userAlbum) && userAlbum.length > 0 ? (
                            userAlbum.map((item, index) => {
                                return (
                                    <View key={index} style={styles.imageWrapper}>
                                        <Image source={{ uri: item }} style={styles.imageThumbnail} />
                                    </View>
                                );
                            })
                        ) : (
                            <Text>Gallery is Empty</Text>
                        )}
                    </View>
                    <Text style={styles.backBtn}  onPress={backToCamera}>  Back To Camera <MaterialCommunityIcons style={styles.icon} name='camera' color="white" size={20} /></Text>

                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icons: {
        position: 'absolute',
        bottom: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    icon: {},
    preview: {
        alignSelf: 'stretch',
        flex: 1,
    },
    
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 5,
    },
    imageWrapper: {
        width: '48%', // Adjust width as needed
        marginVertical: 5,
    },
    imageThumbnail: {
        width: '100%', // Make sure the image fills its container
        aspectRatio: 1, // Maintain aspect ratio
    },
    flashIco:{
        position: "absolute",
        bottom: "100%",
    },
    backBtn:{
        width: "50%",
        backgroundColor: "#0842a0",
        color: "#fff",
        textAlign: "center",
        marginRight: "auto",
        marginLeft: "auto",
        padding: 10,
        verticalAlign: "middle",
        lineHeight: 30,
    }
});
