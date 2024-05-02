import React, { useEffect, useState } from "react";
import EventBlogItem from "./EventBlogItem";
import EventBlogPagination from "./EventBlogPagination";
import { getAllEvents } from "../../../services/eventsApi";

const InnerEventBlogArea = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const currentDate = new Date(); // Date d'aujourd'hui

  return (
    <section className="inner-blog-area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          {events
            .filter((event) => new Date(event.startDate) > currentDate) // Filtrer les événements avec une date postérieure à aujourd'hui
            .map((event, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-30">
                <EventBlogItem item={event} />
              </div>
            ))}
        </div>
        {/* pagination */}
        <EventBlogPagination />
      </div>
    </section>
  );
};

export default InnerEventBlogArea;
