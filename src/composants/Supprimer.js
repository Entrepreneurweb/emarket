import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, remove } from "firebase/database";
//import { getDatabase, ref, get, remove } from "firebase/database";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebaseconfig';
import Carousel from 'react-bootstrap/Carousel';
import { Card, Row, Col, Modal, Button } from 'react-bootstrap';
import { getStorage, ref as sref, deleteObject } from "firebase/storage";


const Supprimer = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase(app);
      const productsRef = ref(database, '/');
      try {
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          // Convertir les données Firebase en un tableau d'objets
          const productsData = Object.values(snapshot.val().produits);
          console.log(snapshot.val().produits);
          setProducts(productsData);
        } else {
          console.log("Pas de données disponibles");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData(); // Appeler la fonction fetchData lors du premier rendu
  }, []); // Le tableau vide comme deuxième argument garantit que useEffect s'exécute seulement après le premier rendu

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const pupup = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setShowPopup(true);
  };


const SupprimerProd=(e)=>{
e.preventDefault();

alert(" supprimer");


}

  return (
    <div >
     
      <div className="container mt-5">
      <h2>Liste des produits</h2>
      <Row>
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} onClick={(e) => pupup(e, product)} > {/* Utilisez les classes de grille Bootstrap pour contrôler la largeur des colonnes */}
            <Card style={{ marginBottom: '20px' }} key={index} >
              
              <Card.Img variant="top" src={product.images.im1} alt="Product" />
              <Card.Body>
                <Card.Title>{product.nom}</Card.Title>
                <Card.Text>
                  Prix: ${product.prix} {/* Formatage du prix en dollars */}
                </Card.Text>
              </Card.Body>
              <Button  onClick={()=>{


  const storage = getStorage(app);

  // Create a reference to the file to delete
  const filePath =  product.productReference;
  const desertRef = sref(storage, filePath);
 
  // Delete the file
  deleteObject(desertRef).then(() => {
    console.log("File deleted successfully") ;
  }).catch((error) => {
    console.log("Uh-oh, an error occurred! ") ;
  });

  const filePath1 = '' + product.productReference +'1';
  const desertRef1 = sref(storage, filePath1);
 
  // Delete the file
  deleteObject(desertRef1).then(() => {
    console.log("File deleted successfully") ;
  }).catch((error) => {
    console.log("Uh-oh, an error occurred! ") ;
  });

  const filePath2 = '' + product.productReference +'2';
  const desertRef2 = sref(storage, filePath2);
 
  // Delete the file
  deleteObject(desertRef2).then(() => {
    console.log("File deleted successfully") ;
  }).catch((error) => {
    console.log("Uh-oh, an error occurred! ") ;
  });



  const database = getDatabase(app);

  // 
  if (product.productReference) {
    const productRef = ref(database, `/produits/${product.productReference}`);
    
    // Utilisez la fonction remove pour supprimer l'élément
    remove(productRef)
      .then(() => {
        alert('Référence supprimée avec succès.');
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la référence :', error);
      });
  } else {
    console.error('La référence du produit est manquante ou incorrecte.');
  }
}
              
              
              } > Supprimer </Button>
            </Card>
          
          </Col>
        ))}
      
      </Row>

      
      
    </div>
    </div>
  );
};

export default Supprimer;
