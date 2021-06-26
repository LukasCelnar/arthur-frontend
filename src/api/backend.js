import axios from 'axios';

const url = 'http://localhost:3001' 

const backend = axios.create({
    baseURL: 'http://localhost:3001',
  });

export default backend;