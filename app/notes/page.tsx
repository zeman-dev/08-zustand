import { FetchNotes } from '@/lib/api';
import css from './App.module.css';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function App() {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', "", 1],
    queryFn: () => FetchNotes("", 1),
  })

  return (
    <>
      <div className={css.app}>
       <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient/>
    </HydrationBoundary>
      </div>
    </>
  );
}
