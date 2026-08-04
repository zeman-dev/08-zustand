import { FetchNotes } from '@/lib/api';
import css from './App.module.css';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

type AppProps ={
  params: Promise<{slug: string[]}>;
}

export default async function App(params : AppProps) {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', "", 1],
    queryFn: () => FetchNotes("", 1),
  })

  return (
    <>
      <div className={css.app}>
       <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient currentTag ={(await params.params).slug}/>
    </HydrationBoundary>
      </div>
    </>
  );
}
