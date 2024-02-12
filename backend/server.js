const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// SQL Server configuration
const config = {
  user: 'bootcamp',
  password: 'Pass@123',
  server: 'bootcampfeb5.database.windows.net',
  database: 'bootcamp',
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: false // Required for Azure
  }
};

// Connect to SQL Server
sql.connect(config)
  .then(() => {
    console.log('Connected to SQL Azure database');
  })
  .catch(err => {
    console.error('Error connecting to SQL Azure database:', err);
  });

// Define a route to fetch data from the database
app.get('/data1', async (req, res) => {
  try {
    const result = await sql.query('SELECT TOP 20 * FROM SalesLT.Customer;');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/data2', async (req, res) => {
    try {
      const result = await sql.query('SELECT pc.*, p.* FROM SalesLT.ProductCategory pc INNER JOIN SalesLT.Product p ON pc.ProductCategoryID = p.ProductCategoryID;');
      res.json(result.recordset);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
