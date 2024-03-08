// import React, { useState } from 'react';
// import axios from 'axios';

// function AddEventForm({ onAdd }) {
//   const [formData, setFormData] = useState({
//     Name: '',
//     Description: '',
//     imageUrl: '',
//     Date: null,
//     Location: '',
//     price: 0,
//     room: {},
//   });

//   const handleChange = e => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/add-event', formData);
//       if (response.status === 201) {
//         onAdd(response.data);
//         resetForm();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       Name: '',
//       Description: '',
//       imageUrl: '',
//       Date: null,
//       Location: '',
//       price: 0,
//       room: {},
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="Name">Titre</label>
//       <input
//         id="Name"
//         name="Name"
//         value={formData.Name}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="Description">Description</label>
//       <input
//         id="Description"
//         name="Description"
//         value={formData.Description}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="imageUrl">Image URL</label>
//       <input
//         id="imageUrl"
//         name="imageUrl"
//         value={formData.imageUrl}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="Date">Date</label>
//       <input
//         id="Date"
//         name="Date"
//         type="date"
//         value={formData.Date || ''}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="Location">Lieu</label>
//       <input
//         id="Location"
//         name="Location"
//         value={formData.Location}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="price">Prix</label>
//       <input
//         id="price"
//         name="price"
//         type="number"
//         min="0"
//         step="0.01"
//         value={formData.price}
//         onChange={handleChange}
//       />
//       <br />
//       <button type="submit">Ajouter l'événement</button>
//     </form>
//   );
// }

// export default AddEventForm;






// import React, { useState } from 'react';
// import axios from 'axios';

// function AddEventForm({ onAdd }) {
//   const [formData, setFormData] = useState({
//     Name: '',
//     Description: '',
//     imageUrl: '',
//     Date: null,
//     Location: '',
//     price: 0,
//     room: {},
//   });

//   const handleChange = e => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/add-event', formData);
//       if (response.status === 201) {
//         onAdd(response.data);
//         resetForm();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       Name: '',
//       Description: '',
//       imageUrl: '',
//       Date: null,
//       Location: '',
//       price: 0,
//       room: {},
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="Name">Titre</label>
//       <input
//         id="Name"
//         name="Name"
//         value={formData.Name}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="Description">Description</label>
//       <input
//         id="Description"
//         name="Description"
//         value={formData.Description}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="imageUrl">Image URL</label>
//       <input
//         id="imageUrl"
//         name="imageUrl"
//         value={formData.imageUrl}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="Date">Date</label>
//       <input
//         id="Date"
//         name="Date"
//         type="date"
//         value={formData.Date || ''}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="Location">Lieu</label>
//       <input
//         id="Location"
//         name="Location"
//         value={formData.Location}
//         onChange={handleChange}
//       />
//       <br />
//       <label htmlFor="price">Prix</label>
//       <input
//         id="price"
//         name="price"
//         type="number"
//         min="0"
//         step="0.01"
//         value={formData.price}
//         onChange={handleChange}
//       />
//       <br />
//       <button type="submit">Ajouter l'événement</button>
//     </form>
//   );
// }

// export default AddEventForm;



import React, { useState } from 'react';
import axios from 'axios';

function AddEventForm({ onAdd }) {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    imageUrl: '',
    Date: null,
    Location: '',
    price: 0,
    room: {},
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/add-event', formData);
      if (response.status === 201) {
        onAdd(response.data);
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      Description: '',
      imageUrl: '',
      Date: null,
      Location: '',
      price: 0,
      room: {},
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Name">Titre</label>
      <input
        id="Name"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="Description">Description</label>
      <input
        id="Description"
        name="Description"
        value={formData.Description}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="imageUrl">Image URL</label>
      <input
        id="imageUrl"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="Date">Date</label>
      <input
        id="Date"
        name="Date"
        type="date"
        value={formData.Date || ''}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="Location">Lieu</label>
      <input
        id="Location"
        name="Location"
        value={formData.Location}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="price">Prix</label>
      <input
        id="price"
        name="price"
        type="number"
        min="0"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Ajouter l'événement</button>
    </form>
  );
}

export default AddEventForm;
