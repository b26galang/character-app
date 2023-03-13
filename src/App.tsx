import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CharacterForm } from './components/character-form';
import { CharacterTable } from './components/character-table';
import { CharacterDelete } from './components/character-delete';
import { CharacterUpdate } from './components/character-update';
import { CharacterSearch } from './components/character-search';
import { CharactersFilter } from './components/characters-filter';
import "./styles/styles.css";

const queryClient = new QueryClient();

function App() {
  return <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CharacterTable />} />
          <Route path='/createcharacter' element={<CharacterForm />} />
          <Route path='/deletecharacter' element={<CharacterDelete />} />
          <Route path='/updatecharacter' element={<CharacterUpdate />} />
          <Route path='/charactersearch' element={<CharacterSearch />} />
          <Route path='/charactersfilter' element={<CharactersFilter/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </>
}

export default App;
