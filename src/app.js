const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(express.static('public'));

// Load the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

// Serve custom CSS
app.use('/swagger-ui.css', express.static(path.join(__dirname, '../custom.css')));

// Serve Swagger documentation with custom CSS
const swaggerOptions = {
  customCssUrl: '/swagger-ui.css',
  customSiteTitle: "Chat API Docs"
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

app.use(errorHandler)

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  console.error(err)
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  })
})

// 404 handler
app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, 'views', '404', 'index.html'))
})

//500 handler
app.use((req, res) => {
  res
    .status(500)
    .sendFile(path.join(__dirname, 'views', '500', 'index.html'))
})

module.exports = app
