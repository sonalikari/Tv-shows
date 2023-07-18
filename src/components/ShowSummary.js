import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ShowSummary.css';

const ShowSummary = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [ticketFormVisible, setTicketFormVisible] = useState(false);
  const [ticketData, setTicketData] = useState({
    showName: '',
    ticketQuantity: ''
  });

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchShow();
  }, [showId]);

  const handleTicketFormSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle ticket form submission here
    console.log(ticketData);
    // Reset the form
    setTicketData({
      showName: '',
      ticketQuantity: ''
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="summary-page">
      <h1 className="summary-title">Show Summary</h1>
      {show && (
        <div className="summary-container">
          <div className="summary-content">
            {/* Show image */}
            <div className="image-container">
              <img className="show-image" src={show.image?.medium} alt={show.name} />
            </div>
            {/* Show summary */}
            <div
              className="summary-text"
              dangerouslySetInnerHTML={{ __html: show.summary }}
            ></div>
          </div>
          {/* Ticket form */}
          <button className="book-button" onClick={() => setTicketFormVisible(true)}>
            Book Ticket
          </button>
          {ticketFormVisible && (
            <div className="ticket-form">
              <h2>Book Ticket</h2>
              <form onSubmit={handleTicketFormSubmit}>
                <div className="form-row">
                  <label htmlFor="showName">Show Name:</label>
                  <input
                    type="text"
                    id="showName"
                    value={ticketData.showName}
                    onChange={(e) =>
                      setTicketData({ ...ticketData, showName: e.target.value })
                    }
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="ticketQuantity">Ticket Quantity:</label>
                  <input
                    type="number"
                    id="ticketQuantity"
                    value={ticketData.ticketQuantity}
                    onChange={(e) =>
                      setTicketData({ ...ticketData, ticketQuantity: e.target.value })
                    }
                  />
                </div>
                <button type="submit">Book Now</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowSummary;
