import axios from "axios";

const apiURL = "http://localhost:9090/comment";

export async function getAllComments(config) {
  try {
    const response = await axios.get(`${apiURL}/all`, config);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les commentaires :", error);
    throw error;
  }
}

export async function getCommentById(id, config) {
  try {
    const response = await axios.get(`${apiURL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du commentaire par ID ${id} :`, error);
    throw error;
  }
}

export async function addComment(eventId, commentData, config) {
  try {
    const response = await axios.post(`${apiURL}/add/event/${eventId}`, commentData, config);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    throw error;
  }
}

export async function updateComment(id, commentData, config) {
  try {
    const response = await axios.put(`${apiURL}/update/${id}`, commentData, config);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du commentaire avec l'ID ${id} :`, error);
    throw error;
  }
}

export async function deleteComment(id, config) {
  try {
    const response = await axios.delete(`${apiURL}/delete/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression du commentaire avec l'ID ${id} :`, error);
    throw error;
  }
}
 