const express = require('express');
const router = express.Router();
const VoiceQuery = require('../models/VoiceQuery');
const Transport = require('../models/Transport');

// Helper function to process queries
const processQuery = async (queryText) => {
  // Convert query to lowercase for easier matching
  const query = queryText.toLowerCase();
  
  // Check for bus-related queries
  if (query.includes('bus')) {
    const destination = extractDestination(query);
    if (destination) {
      const buses = await Transport.find({
        type: 'Bus',
        route: { $regex: destination, $options: 'i' }
      }).sort({ departure: 1 });
      
      if (buses.length > 0) {
        const nextBus = buses[0];
        return `The next bus to ${destination} is at ${nextBus.departure} from ${nextBus.departurePoint}.`;
      }
      return `Sorry, I couldn't find any buses to ${destination}.`;
    }
    return "Please specify a destination for the bus query.";
  }

  // Check for schedule queries
  if (query.includes('schedule') || query.includes('time')) {
    const route = extractRoute(query);
    if (route) {
      const schedule = await Transport.find({
        route: { $regex: route, $options: 'i' }
      }).sort({ departure: 1 });
      
      if (schedule.length > 0) {
        return `Schedule for ${route}: ${schedule.map(s => `${s.departure} - ${s.arrival}`).join(', ')}`;
      }
      return `Sorry, I couldn't find the schedule for ${route}.`;
    }
    return "Please specify a route for the schedule query.";
  }

  // Default response for unrecognized queries
  return "I'm sorry, I couldn't understand your query. Please try asking about bus schedules or routes.";
};

// Helper function to extract destination from query
const extractDestination = (query) => {
  const destinations = ['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'kolkata'];
  for (const dest of destinations) {
    if (query.includes(dest)) {
      return dest.charAt(0).toUpperCase() + dest.slice(1);
    }
  }
  return null;
};

// Helper function to extract route from query
const extractRoute = (query) => {
  const routeMatch = query.match(/route\s+(\d+)/i);
  return routeMatch ? routeMatch[1] : null;
};

// POST endpoint to handle voice queries
router.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query text is required' });
    }

    // Process the query and generate response
    const response = await processQuery(query);

    // Create and save the voice query with response
    const voiceQuery = new VoiceQuery({
      queryText: query,
      response: response
    });

    const savedQuery = await voiceQuery.save();
    res.status(201).json({
      _id: savedQuery._id,
      query: savedQuery.queryText,
      response: savedQuery.response,
      timestamp: savedQuery.timestamp
    });
  } catch (error) {
    console.error('Error processing voice query:', error);
    res.status(500).json({ error: 'Failed to process voice query' });
  }
});

// GET endpoint to retrieve all voice queries
router.get('/', async (req, res) => {
  try {
    const queries = await VoiceQuery.find().sort({ timestamp: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve voice queries' });
  }
});

module.exports = router;