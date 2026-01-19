// Vercel Serverless Function for trip state sync
// Stores state in Vercel's edge config (simple key-value)

// In-memory store (resets on cold start, but works for demo)
// For production, use Vercel KV or a database
let tripState = null

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    // Return current state
    return res.status(200).json(tripState || { empty: true })
  }

  if (req.method === 'POST') {
    // Save new state
    try {
      tripState = req.body
      tripState.lastUpdated = new Date().toISOString()
      return res.status(200).json({ success: true, lastUpdated: tripState.lastUpdated })
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save state' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
