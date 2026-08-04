"use client"
import { useState } from 'react';
import css from './App.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import { FetchNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesClient(){

const [topic, setTopic] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  // HTTP Request
  const handleSearch = useDebouncedCallback((nextTopic : string) => { setCurrentPage(1); return(setTopic(nextTopic))}, 500);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', topic, currentPage],
    queryFn: () => FetchNotes(topic, currentPage),
    placeholderData: keepPreviousData,
  });
  /////////////////////////////////////////////////////
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

    return(
        <><header className={css.toolbar}>
          <SearchBox onSearch={handleSearch}/>
          {isLoading && <p>Loading, please wait...</p>}
          {isError && !data?.notes && <p>Something went wrong.</p>}
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              changePage={setCurrentPage}
              totalPages={data.totalPages}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create Task
          </button>
        </header>
        {isModalOpen && (
          <Modal onClose={closeModal}><NoteForm onClose={closeModal}/></Modal>
        )}
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        </>
    );
}