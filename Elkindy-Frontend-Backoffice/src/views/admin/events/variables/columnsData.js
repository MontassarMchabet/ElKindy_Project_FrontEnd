

export const eventsData = [
  {
    Header: "IMAGE",
    accessor: "imageUrl", // Utilisation de la même casse pour tous les accesseurs
  },
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "DATE",
    accessor: "startDate",
  },
  {
    Header: "PRICE",
    accessor: "price",
  },
  {
    Header: "LOCATION",
    accessor: "location",
  },

  {
    Header: "ROOM",
    accessor: "room_name", // Supposition qu'il s'agisse de room au lieu de name
  },
  {
    Header: "ACTIONS", // Ajout d'une nouvelle colonne pour les actions
  }
];
export default eventsData;



// Suppression de l'export par défaut inutile
