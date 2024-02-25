import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(image.name);
    imageRef.put(image).then(() => {
      console.log('Image uploaded successfully');
    }).catch((error) => {
      console.error('Error uploading image:', error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;