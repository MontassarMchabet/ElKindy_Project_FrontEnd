import React, { useState, useEffect } from "react";
import EventCommentForm from "./EventCommentForm";
import EventComments from "./EventComments";
import { getEventById } from "../../../services/eventsApi";
import { getEventComments } from "../../../services/eventsApi";
import { useParams } from "react-router-dom";
import axios from 'axios';
const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const { eventId } = useParams();
  const [comments, setComments] = useState([]);


  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEventDetails(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);
  console.log("evenementttttttt", eventId)
  // Fonction pour mettre à jour les commentaires après l'édition ou la suppression et l'ajout
  const updateComments = async () => {
    try {
      const updatedCommentsData = await getEventComments(eventId);
      setComments(updatedCommentsData);
      console.log("chbiik ma takhdemch", updatedCommentsData)
    } catch (error) {
      console.error("Erreur lors de la mise à jour des commentaires :", error);
    }
  };
  // Fonction pour filtrer les mots interdits
  const filterBadWords = async (comment) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('content', comment);
    encodedParams.set('censor-character', '*');

    const options = {
      method: 'POST',
      url: 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'f73daeac29msh3b4d521f1fb4e92p1ecc8fjsnd18233e56279',
        'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      return response.data['censored-content'];
    } catch (error) {
      console.error(error);
      return comment;
    }
  };
  return (
    <section className="blog-details-area pt-175 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="row">
            <div className="col-xl-10" id="1">
              {eventDetails && (
                <div className="blog-details-wrap">
                  <div className="bd-content-top text-center">
                    <h2 className="title">{eventDetails.name}</h2>
                    <div className="blog-meta-two bottom">
                      <ul className="list-wrap">
                        <li className="tag">
                          <a href="#">{eventDetails.price} dt </a>
                        </li>
                        <li>
                          <i className="fal fa-clock"></i>{new Date(eventDetails.startDate).toLocaleString('tn-TN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                        </li>
                        <li>
                          <i className="fal fa-clock"></i>{new Date(eventDetails.endDate).toLocaleString('tn-TN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="blog-details-img">
                    <img src={eventDetails.imageUrl} alt="" style={{ width: "750px", height: "425px" }} />

                  </div>
                  <div className="bd-content-bottom">
                    <h2 className="title">{eventDetails.name}</h2>
                    <p>{eventDetails.description}</p>
                  </div>

                </div>
              )}
              <EventComments
                commentsData={comments}
                updateComments={updateComments}
                filterBadWords={filterBadWords}
              />

              <EventCommentForm
                updateComments={updateComments}
                filterBadWords={filterBadWords}
              />

              <div className="col-xl-10" id="contact-map" style={{ marginTop: 10 }}>
                <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.70317857788!2d10.185942175189824!3d36.84958417223305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34b9dee763fd%3A0xdca263934c8cca90!2sTunis%20Science%20City!5e0!3m2!1sfr!2stn!4v1714606170645!5m2!1sfr!2stn`}
                  allowFullScreen
                  loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
