// export const columnsDataComplex = [
//   {
//     Header: "NAME",
//     accessor: "Name",
//   },
//   {
//     Header: "DESCRIPTION",
//     accessor: "Description",
//   },
//   {
//     Header: "DATE",
//     accessor: "Date",
//   },
//   {
//     Header: "LOCALTION",
//     accessor: "Location",
//   },
//   {
//     Header: "PRICE",
//     accessor: "price",
//   },
//   {
//     Header: "IMAGE",
//     accessor: "imageUrl",
//   },
//   {
//     Header: "ROOM",
//     accessor: "name",
//   },
//   {
//     Header: "SHAPE",
//     accessor: "shape",
//   },
//   {
//     Header: "CAPACITY",
//     accessor: "capacity",
//   },

// ];

// export const eventsData = [
//   {
//     Header: "Name",
//     accessor: "Name",
//   },
//   {
//     Header: "Description",
//     accessor: "Description",
//   },
  
//   {
//     Header: "Date",
//     accessor: "Date",
//   },
//   {
//     Header: "Image",
//     accessor: "imageURL",
//   },
//   {
//     Header: "Location",
//     accessor: "Location",
//   },
//   {
//     Header: "Price",
//     accessor: "Price",
//   },
//   {
//     Header: "Image",
//     accessor: "imageUrl",
//   },
//   {
//     Header: "ACTIONS",
//   },
// ];

// export default eventsData;

// Correction du nom de la colonne LOCATION


// Élimination des doublons dans les données d'événements
export const eventsData = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "DESCRIPTION",
    accessor: "description",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "IMAGE",
    accessor: "imageURL", // Utilisation de la même casse pour tous les accesseurs
  },
  {
    Header: "LOCATION",
    accessor: "location",
  },
  {
    Header: "PRICE",
    accessor: "price",
  },
  {
    Header: "ROOM",
    accessor: "room.name", // Supposition qu'il s'agisse de room au lieu de name
  },
  {
    Header: "SHAPE",
    accessor: "room.shape",
  },
  {
    Header: "CAPACITY",
    accessor: "room.capacity",
  },
  {
    Header: "SEATS",
    accessor: "room.distributionSeats",
  },
  {
    Header: "ACTIONS", // Ajout d'une nouvelle colonne pour les actions
  }
];
export default eventsData;
// Suppression de l'export par défaut inutile
