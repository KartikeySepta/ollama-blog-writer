const express = require('express');
const cors = require('cors');
const app = express();
const imageRoute = require('./image/image')

const rssRoute = require('./api/rss');
const connectDB = require("./db");


connectDB();


require('dotenv').config();


//CORS 

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));


app.use('/api/image', imageRoute)

app.use(express.json());



app.use('/api/rss', rssRoute);


app.use('/api/topics', require('./api/topics'));

app.use("/api/stats", require("./api/stats"));

app.use('/api/generate', require('./api/generate'));
app.use('/api/publish', require('./api/publish'));
app.use('/api/seo-title', require('./api/seoTitle')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));

app.get('/', (req, res) => {
  res.send('API is working!');
});
