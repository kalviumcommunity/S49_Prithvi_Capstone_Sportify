import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { List, Card, Spin, Alert, Input, Button } from 'antd';  
import AddEventModal from './AddEventModal'; 
import '../Css/Home.css';  

const { Search } = Input;

function Home() {
  const [events, setEvents] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [searchTerm, setSearchTerm] = useState("");  
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]); // Add new event to the top
    setIsModalVisible(false); // Close modal after adding event
  };

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log("Fetching events from the server...");
      const response = await axios.get('http://localhost:5000/events');
      console.log("Events fetched successfully:", response.data);

      // Sort events based on creation time (newest first)
      const sortedEvents = response.data
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .reverse(); // Reverse the sorted array


      setEvents(sortedEvents);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load events:", err);
      setError('Failed to load events');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();  
  }, []);  

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input
  const onSearch = (value) => {
    console.log("Search term:", value);
    setSearchTerm(value);
  };

  return (
    <div className="home">
      <Search
        placeholder="Search events"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{
          marginBottom: '20px',
          width: '50%',
          marginLeft: '25%',
          color: 'black',
        }}
        className="search-bar"
      />

      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
        Add New Event
      </Button>

      <AddEventModal
  visible={isModalVisible}
  onClose={() => setIsModalVisible(false)}
  onEventAdded={handleEventAdded} // ✅ Pass the function as a prop
/>

      {loading ? (
        <Spin tip="Loading events..." style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} />
      ) : error ? (
        <Alert message={error} type="error" style={{ marginTop: '20px', textAlign: 'center' }} />
      ) : (
        <List
          grid={{ gutter: 16, column: 3 }}  
          dataSource={filteredEvents}
          renderItem={event => (
            <List.Item>
              <Card
                title={event.eventName}
                bordered={false}
                style={{ textAlign: 'center', minHeight: '250px' }}
              >
                <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Participants:</strong> {event.participants}</p>
                <p>{event.description}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default Home;
