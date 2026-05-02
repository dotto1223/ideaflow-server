require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const API_KEY = process.env.ANTHROPIC_API_KEY

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/generate', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    })
    const text = await response.text()
    console.log('API response:', text.slice(0, 200))
    res.setHeader('Content-Type', 'application/json')
    res.send(text)
  } catch(err) {
    console.error('Error:', err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))