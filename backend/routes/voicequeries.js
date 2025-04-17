const express = require('express');
const router = express.Router();
const VoiceQuery = require('../models/VoiceQuery');
const Transport = require('../models/Transport');

// Helper function to process queries
const processQuery = async (queryText) => {
  try {
    // Convert query to lowercase for easier matching
    const query = queryText.toLowerCase();
    
    // Check for bus-related queries
    if (query.includes('bus')) {
      const destination = extractDestination(query);
      if (destination) {
        const buses = await Transport.find({
          type: 'bus',
          route: { $regex: destination, $options: 'i' }
        }).sort({ departure: 1 });
        
        if (buses.length > 0) {
          const nextBus = buses[0];
          return {
            response: `The next bus to ${destination} is at ${nextBus.departure} from ${nextBus.departurePoint}.`,
            intent: 'schedule_lookup'
          };
        }
        return {
          response: `Sorry, I couldn't find any buses to ${destination}.`,
          intent: 'schedule_lookup'
        };
      }
      return {
        response: "Please specify a destination for the bus query.",
        intent: 'schedule_lookup'
      };
    }

    // Check for schedule queries
    if (query.includes('schedule') || query.includes('time')) {
      const route = extractRoute(query);
      if (route) {
        const schedule = await Transport.find({
          route: { $regex: route, $options: 'i' }
        }).sort({ departure: 1 });
        
        if (schedule.length > 0) {
          return {
            response: `Schedule for ${route}: ${schedule.map(s => `${s.departure} - ${s.arrival}`).join(', ')}`,
            intent: 'schedule_lookup'
          };
        }
        return {
          response: `Sorry, I couldn't find the schedule for ${route}.`,
          intent: 'schedule_lookup'
        };
      }
      return {
        response: "Please specify a route for the schedule query.",
        intent: 'schedule_lookup'
      };
    }

    // Default response for unrecognized queries
    return {
      response: "I'm sorry, I couldn't understand your query. Please try asking about bus schedules or routes.",
      intent: 'general_query'
    };
  } catch (error) {
    console.error('Error processing query:', error);
    return {
      response: "Sorry, there was an error processing your query. Please try again.",
      intent: 'general_query'
    };
  }
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

// Generate a unique ID for the query
const generateQueryId = () => {
  return 'VQ' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// POST endpoint to handle voice queries
router.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query text is required' });
    }

    // Process the query and generate response
    const { response, intent } = await processQuery(query);

    // Create and save the voice query with response
    const voiceQuery = new VoiceQuery({
      _id: generateQueryId(),
      user_id: 'default_user', // You can replace this with actual user ID when authentication is implemented
      query_text: query,
      response: response,
      intent: intent
    });

    const savedQuery = await voiceQuery.save();
    res.status(201).json({
      _id: savedQuery._id,
      query: savedQuery.query_text,
      response: savedQuery.response,
      intent: savedQuery.intent,
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