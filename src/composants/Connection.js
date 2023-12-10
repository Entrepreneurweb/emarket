import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useRef } from 'react';
import { getDatabase, ref, get,  child } from "firebase/database";
import app from './firebaseconfig';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {  Navbar, Nav } from 'react-bootstrap';
import './Login.css';
import ProductsList from '../Affichercarte';
import AddProductForm from './Ajouterprod';
import Supprimer from './Supprimer';
import Nouvprod from './Nouvprod';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [islog, setislog]=useState(1);
  const [selectedTab, setSelectedTab] = useState('ajouter');
    const database=getDatabase(app);
    const imail = useRef(''); // Utilisation de useRef pour stocker l'email
    const mdp = useRef(''); // Utilisation de useRef pour stocker le mot de passe


    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const dbRef = ref(getDatabase());
          const snapshot = await get(child(dbRef, `users`));
      
          if (snapshot.exists()) {
            const userData = snapshot.val();
            imail.current = userData.email;
            mdp.current = userData.password;
            
            // Vérifiez si l'email et le mot de passe entrés sont égaux aux valeurs de la base de données
            if (email === imail.current && password === mdp.current) {
              // Connexion réussie
              setislog(0);
              console.log("Connexion réussie !");
            } else {
              // Email ou mot de passe incorrect
              setislog(1);
              console.log("Email ou mot de passe incorrect.");
            }
          } else {
            console.log("Pas de données disponibles");
            // L'utilisateur n'existe pas dans la base de données
            setislog(1);
          }
        } catch (error) {
          console.error('Erreur de connexion :', error);
          setislog(1);
        }

      };
      

  // Affichez les valeurs de mdp et imail dans la console
  if(islog==1){
    return (
        <Container className="mt-5">
          <h1>Connexion</h1>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
    
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Se connecter
            </Button>
          </Form>
        </Container>
      );
  }else if(islog==0) {
    return (
      <div>
        <div className="navbar-container">
          <div
            className={`navbar-half ${selectedTab === 'ajouter' ? 'selected' : ''}`}
            onClick={() => setSelectedTab('ajouter')}
          >
            Ajouter
          </div>
          <div
            className={`navbar-half ${selectedTab === 'supprimer' ? 'selected' : ''}`}
            onClick={() => setSelectedTab('supprimer')}
          >
            Supprimer
          </div>
        </div>

        <Container className="mt-4">
          {selectedTab === 'ajouter' && <AddProductForm />}
          {selectedTab === 'supprimer' && <Supprimer />}
        </Container>
      </div>
    );
  }
  

  
};

export default LoginForm;
