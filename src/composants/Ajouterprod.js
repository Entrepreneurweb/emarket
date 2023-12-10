import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import app from './firebaseconfig';
import {  uploadBytes } from 'firebase/storage';
import { getDatabase } from "firebase/database";
import {  ref, set } from "firebase/database";
import {  ref as refi } from "firebase/storage";
import {  ref as refii } from "firebase/storage";
import { getStorage, ref as sref, getDownloadURL} from "firebase/storage";

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productPrix, setProductPrix] = useState('');
  const [productImage1, setProductImage1] = useState(null);
  const [productImage2, setProductImage2] = useState(null);
  const [productImage3, setProductImage3] = useState(null);
  const [imageUrl, setimageUrl] = useState('');
  const [mesurl, setmesurl]=useState({
    im1:null,
    im2:null,
    im3:null
  })
  const [productImages, setProductImages] = useState({
    image1: null,
    image2: null,
    image3: null
  });
  const [imageUrl1, setimageUrl1] = useState('');
  const [imageUrl2, setimageUrl2] = useState('');
  const [image, setImage] = useState(null)
  const database = getDatabase(app);
  const storage = getStorage(app);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter votre logique pour soumettre les données à votre backend ou faire d'autres opérations avec les données du formulaire.
    console.log('Nom du produit:', productName);
    console.log('Type du produit:', productType);
   
    // Réinitialiser les champs du formulaire après la soumission
    setProductName('');
    setProductType('');
    
  };

  function obtenirHeureActuelle() {
    const maintenant = new Date();
    const  annee=maintenant.getFullYear().toString().padStart(2, '0');
    const mois = maintenant.getMonth().toString().padStart(2,'0');
    const jour=maintenant.getDay().toString().padStart(2, '0');
    const heures = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    const secondes = maintenant.getSeconds().toString().padStart(2, '0');
    
    const heureActuelle = `${annee}:${mois}:${jour}:${heures}:${minutes}:${secondes}`;
    return heureActuelle;
  }


  const addprod = async () => {
    try {
      const heure = obtenirHeureActuelle();
      const storage = getStorage();
      const database = getDatabase();
      const storageRef = sref(storage, heure);
      const mesurl = {};
  
      // Fonction utilitaire pour télécharger une image et obtenir son URL de téléchargement
      const uploadAndRetrieveDownloadURL = async (storageRef, file) => {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      };
  
     console.log("telechargement.......");
      // Téléchargez les images de manière séquentielle
      mesurl.im1 = await uploadAndRetrieveDownloadURL(storageRef, productImage1);
      mesurl.im2 = await uploadAndRetrieveDownloadURL(sref(storage, heure + "1"), productImage2);
      mesurl.im3 = await uploadAndRetrieveDownloadURL(sref(storage, heure + "2"), productImage3);
  
      // Enregistrez les URLs dans la base de données
      await set(ref(database, "produits/"+heure), {
        nom: productName,
        prix: productPrix,
        type: productType,
        images: mesurl,
        productReference: heure,
      });
  
      console.log(mesurl);
      
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }finally{
      alert(" LE PRODUIT A ETE AJOUTE");
    }
  };
  



  
  

 
const aff =()=>{

  console.log(productImage1);
  console.log(productImage2);
  console.log(productImage2);
}


  
  return (
    <div className="container mt-5">
      <h2>Ajouter un produit</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Nom du produit</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le nom du produit"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="productType">
          <Form.Label>Type du produit</Form.Label>
          <Form.Control
            as="select"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="">Sélectionnez le type</option>
            <option value="vetement">Vêtement</option>
            <option value="autres">autres</option>
            <option value="electronique">Électronique</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Prix du produit</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le prix du produit"
            value={productPrix}
            onChange={(e) => setProductPrix(e.target.value)}
          >
          
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productImage">
          <Form.Label>Images du produit</Form.Label>
          <Form.Control type="file" onChange={(e)=>{
            setProductImage1(e.target.files[0]);
          }}        accept="image/*" />
      
 
         
      <Form.Control type="file" onChange={(e)=>{
            setProductImage2(e.target.files[0]);
          }} accept="image/*" />
      
      
      <Form.Control type="file" onChange={(e)=>{
            setProductImage3(e.target.files[0]);
          }} accept="image/*" />
      
    
          
          
        </Form.Group>

        <Button variant="info"  onClick={addprod}  >
          Ajouter le produit
        </Button>
        
     
      </Form>
      
    </div>
  );
};

export default AddProductForm;
