import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Global Styles (si nécessaire)
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(to bottom right, #f9fafb, #e5e7eb);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(to bottom right, #f9fafb, #e5e7eb);
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #3b82f6;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2563eb;
  }
  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  margin-top: 1rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Thead = styled.thead`
  background-color: #e5e7eb;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  color: #4b5563;
`;

const Tbody = styled.tbody`
  background-color: #ffffff;
`;

const Tr = styled.tr`
  background-color: ${({ index }) => (index % 2 === 0 ? '#f9fafb' : '#ffffff')};
`;

const Td = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

// Nouveau Styled Component pour le bouton Supprimer
const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #dc2626;
  }
  &:disabled {
    background-color: #fca5a5;
    cursor: not-allowed;
  }
`;

// Styled Components pour l'Édition
const EditInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
  }
`;

const ValidateButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #059669;
  }
  &:disabled {
    background-color: #a7f3d0;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #dc2626;
  }
  &:disabled {
    background-color: #fca5a5;
    cursor: not-allowed;
  }
`;

// Ajout du Styled Component NoProducts
const NoProducts = styled.div`
  color: #6b7280;
  text-align: center;
  margin-top: 1rem;
`;

const Ajoutez = () => {
  const [form, setForm] = useState({
    cleAvecCartePropriete: false,
    prix: '',
    nom: '',
    marque: '',
    imageUrl: '',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // États pour l'édition
  const [editProductId, setEditProductId] = useState(null);
  const [editForm, setEditForm] = useState({
    prix: '',
    nom: '',
    marque: '',
    cleAvecCartePropriete: false,
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  // États pour la suppression
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    console.log("Données soumises :", form); // ✅ Ajout du log
  
    if (!form.nom || !form.marque || form.prix === '' || !form.imageUrl) {
      setError('Veuillez remplir tous les champs et sélectionner une image.');
      return;
    }
  
  
    try {
      setLoading(true);
      const completeImageUrl = `http://localhost:5173/${form.imageUrl.split('/').pop()}`;
      const dataToSend = { ...form, prix: Number(form.prix), imageUrl: completeImageUrl };
  
      const response = await axios.post('/produit/cles/add', dataToSend);
      setProducts((prev) => [...prev, response.data]);
      setForm({ cleAvecCartePropriete: false, prix: '', nom: '', marque: '', imageUrl: '' });
    } catch (error) {
      setError("Erreur lors de l'ajout du produit. Vérifiez les données et réessayez.");
    } finally {
      setLoading(false);
    }
  };
  

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/produit/cles/all');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError("Erreur lors de la récupération des produits. Vérifiez le backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Gérer les changements dans le formulaire d'édition
  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Activer le mode édition pour un produit
  const handleEditClick = (product) => {
    setEditProductId(product.nom);
    setEditForm({
      prix: product.prix,
      nom: product.nom,
      marque: product.marque,
      cleAvecCartePropriete: product.cleAvecCartePropriete,
    });
    setEditError(null);
  };

  // Annuler l'édition
  const handleCancelEdit = () => {
    setEditProductId(null);
    setEditForm({
      prix: '',
      nom: '',
      marque: '',
      cleAvecCartePropriete: false,
    });
    setEditError(null);
  };

  // Valider et soumettre les modifications
  const handleValidateEdit = async (productName) => {
    setEditError(null);
    try {
      setEditLoading(true);
      // Vérifiez ici l'URL envoyée
      const response = await axios.put(`/produit/cles/update?nom=${encodeURIComponent(productName)}`, editForm);
      setProducts((prev) =>
        prev.map((prod) => (prod.nom === productName ? response.data : prod))
      );
      setEditProductId(null);
    } catch (error) {
      setEditError("Erreur lors de la mise à jour du produit. Vérifiez les données et réessayez.");
    } finally {
      setEditLoading(false);
    }
  };

  // Nouvelle fonction pour gérer la suppression
  const handleDelete = async (productName) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer le produit "${productName}" ?`);
    if (!confirmDelete) return;

    setDeleteError(null);
    try {
      setDeleteLoading(true);
      await axios.delete(`/produit/cles/delete?nom=${encodeURIComponent(productName)}`);
      setProducts((prev) => prev.filter((prod) => prod.nom !== productName));
    } catch (error) {
      setDeleteError(`Erreur lors de la suppression du produit "${productName}".`);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("Aucun fichier sélectionné");
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
  
    console.log("Envoi du fichier :", file);
  
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log("Réponse du serveur :", response.data);
  
      const imageUrl = `http://localhost:5000${response.data.imageUrl}`;
      console.log("URL de l'image enregistrée :", imageUrl); // ✅ Vérification
  
      setForm((prev) => ({ ...prev, imageUrl }));
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.response?.data || error.message);
      setError("Erreur lors de l'upload de l'image. Vérifiez le serveur.");
    }
  };
  
  
  
  

  return (
    <>
      <GlobalStyle />
      <Container>
        <Card>
          <Title>Ajouter un Article</Title>

          {/* Formulaire */}
          <Form onSubmit={handleSubmit}>
            <Grid>
              <FormGroup>
                <Label htmlFor="nom">Nom</Label>
                <Input
                  type="text"
                  id="nom"
                  name="nom"
                  value={form.nom}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="marque">Marque</Label>
                <Input
                  type="text"
                  id="marque"
                  name="marque"
                  value={form.marque}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="prix">Prix (€)</Label>
                <Input
                  type="number"
                  id="prix"
                  name="prix"
                  value={form.prix}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </FormGroup>
              <FormGroup>
              <Label htmlFor="image">Image du produit</Label>
                <Input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} required />
              </FormGroup>
              {form.imageUrl && <img src={form.imageUrl} alt="Aperçu" style={{ width: '100%', borderRadius: '0.5rem', marginTop: '1rem' }} />}


              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="cleAvecCartePropriete"
                  name="cleAvecCartePropriete"
                  checked={form.cleAvecCartePropriete}
                  onChange={handleInputChange}
                />
                <Label htmlFor="cleAvecCartePropriete">Clé avec Carte Propriété</Label>
              </CheckboxContainer>
            </Grid>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Ajout en cours...' : 'Ajouter'}
            </SubmitButton>
          </Form>

          {/* Messages d'erreur */}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {/* Liste des produits */}
          <Title as="h2" style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
            Liste des Produits
          </Title>
          {products.length === 0 ? (
            <NoProducts>Aucun produit trouvé.</NoProducts>
          ) : (
            <TableContainer>
              <Table>
                <Thead>
                  <tr>
                    <Th>Nom</Th>
                    <Th>Marque</Th>
                    <Th>Prix</Th>
                    <Th>Clé avec Carte Propriété</Th>
                    <Th>Actions</Th>
                  </tr>
                </Thead>
                <Tbody>
                  {products.map((product, index) => (
                    <Tr key={product.nom} index={index}>
                      <Td>
                        {editProductId === product.nom ? (
                          <EditInput
                            type="text"
                            name="nom"
                            value={editForm.nom}
                            onChange={handleEditInputChange}
                            required
                          />
                        ) : (
                          product.nom
                        )}
                      </Td>
                      <Td>
                        {editProductId === product.nom ? (
                          <EditInput
                            type="text"
                            name="marque"
                            value={editForm.marque}
                            onChange={handleEditInputChange}
                            required
                          />
                        ) : (
                          product.marque
                        )}
                      </Td>
                      <Td>
                        {editProductId === product.nom ? (
                          <EditInput
                            type="number"
                            name="prix"
                            value={editForm.prix}
                            onChange={handleEditInputChange}
                            required
                            min="0"
                          />
                        ) : (
                          `${product.prix}€`
                        )}
                      </Td>
                      <Td>
                        {editProductId === product.nom ? (
                          <Checkbox
                            type="checkbox"
                            name="cleAvecCartePropriete"
                            checked={editForm.cleAvecCartePropriete}
                            onChange={handleEditInputChange}
                          />
                        ) : product.cleAvecCartePropriete ? (
                          'Oui'
                        ) : (
                          'Non'
                        )}
                      </Td>
                      <Td>
                        {editProductId === product.nom ? (
                          <>
                            <ValidateButton
                              onClick={() => handleValidateEdit(product.nom)}
                              disabled={editLoading}
                            >
                              {editLoading ? 'Validation...' : 'Valider'}
                            </ValidateButton>
                            <CancelButton onClick={handleCancelEdit} disabled={editLoading}>
                              Annuler
                            </CancelButton>
                          </>
                        ) : (
                          <>
                            <ValidateButton onClick={() => handleEditClick(product)}>
                              Modifier
                            </ValidateButton>
                            <DeleteButton
                              onClick={() => handleDelete(product.nom)}
                              disabled={deleteLoading}
                            >
                              {deleteLoading ? 'Suppression...' : 'Supprimer'}
                            </DeleteButton>
                          </>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {/* Message d'erreur pour l'édition */}
              {editError && <ErrorMessage>{editError}</ErrorMessage>}
              {/* Message d'erreur pour la suppression */}
              {deleteError && <ErrorMessage>{deleteError}</ErrorMessage>}
            </TableContainer>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Ajoutez;
