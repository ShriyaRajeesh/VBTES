const express = require('express');
const router = express.Router();
const VoiceQuery = require('../models/VoiceQuery');
const Transport = require('../models/Transport');

// Helper function to extract destination and source
const extractRoutePoints = (query) => {
  const stops = ['city center', 'mg road', 'mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'kolkata'];
  const found = stops.filter(stop => query.includes(stop.toLowerCase()));
  if (found.length >= 2) {
    return { source: capitalize(found[0]), destination: capitalize(found[1]) };
  } else if (found.length === 1) {
    return { destination: capitalize(found[0]) };
  }
  return {};
};

// Capitalize helper
const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Generate custom query ID
const generateQueryId = () => {
  return 'VQ' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
};

// Main processing logic
const processQuery = async (queryText) => {
  try {
    const query = queryText.toLowerCase();
    const { source, destination } = extractRoutePoints(query);

    if (query.includes('bus') || query.includes('next')) {
      if (source && destination) {
        const buses = await Transport.find({
          type: 'bus',
          'route.from': source,
          'route.to': destination
        }).sort({ departure: 1 });

        if (buses.length > 0) {
          const nextBus = buses[0];
          return {
            response: `The next bus from ${source} to ${destination} is at ${nextBus.departure} from ${nextBus.departurePoint}.`,
            intent: 'schedule_lookup'
          };
        } else {
          return {
            response: `Sorry, there are no upcoming buses from ${source} to ${destination}.`,
            intent: 'schedule_lookup'
          };
        }
      } else {
        return {
          response: 'Please specify both source and destination to check bus schedule.',
          intent: 'schedule_lookup'
        };
      }
    }

    if (query.includes('book') || query.includes('ticket')) {
      if (destination) {
        return {
          response: `Sure, I can help you book a ticket to ${destination}. (Booking system integration coming soon!)`,
          intent: 'booking_request'
        };
      }
      return {
        response: 'Please mention the destination for booking.',
        intent: 'booking_request'
      };
    }

    return {
      response: "I'm not sure how to help with that. Try asking about bus schedules or booking.",
      intent: 'general_query'
    };
  } catch (err) {
    console.error('Error processing query:', err);
    return {
      response: 'Sorry, there was an error processing your query.',
      intent: 'general_query'
    };
  }
};

// POST /voicequery
router.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query text is required.' });

    // First check if similar query already exists in DB
    const existingQuery = await VoiceQuery.findOne({
      query_text: { $regex: new RegExp(query, 'i') } // case-insensitive partial match
    });

    if (existingQuery) {
      return res.status(200).json({
        _id: existingQuery._id,
        query: existingQuery.query_text,
        response: existingQuery.response,
        intent: existingQuery.intent,
        timestamp: existingQuery.timestamp
      });
    }

    // If no match, process and save new query
    const { response, intent } = await processQuery(query);

    const newQuery = new VoiceQuery({
      _id: generateQueryId(),
      user_id: 'default_user',
      query_text: query,
      response,
      intent
    });

    const saved = await newQuery.save();
    res.status(201).json({
      _id: saved._id,
      query: saved.query_text,
      response: saved.response,
      intent: saved.intent,
      timestamp: saved.timestamp
    });
  } catch (err) {
    console.error('POST /voicequery error:', err);
    res.status(500).json({ error: 'Failed to process voice query.' });
  }
});

// GET /voicequery
router.get('/', async (req, res) => {
  try {
    const queries = await VoiceQuery.find().sort({ timestamp: -1 });
    res.json(queries);
  } catch (err) {
    console.error('GET /voicequery error:', err);
    res.status(500).json({ error: 'Failed to fetch voice queries.' });
  }
});

module.exports = router;
