import React from 'react';
import { Routes } from './routes';
import { Container } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

export default function BasicTable() {
  return (
    <Container>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Container>
  );
}
