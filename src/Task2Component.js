import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Task2Component() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/data1')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(data.then);

  return (
    <div>
      <h2>Data from Backend</h2>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>           
          </tr>
        </thead>
        <tbody>            
        {data.map(item => (
  <tr key={item.CustomerID}>
    <td>{item.CustomerID}</td>
    <td>{item.FirstName}</td>
    <td>{item.MiddleName}</td>
    <td>{item.LastName}</td>
    <td>{item.Email}</td>
    <td>{item.Phone}</td>  
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default Task2Component;
