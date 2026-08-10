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

export default async function App(props : AppProps) {

  const queryClient = new QueryClient()

    const tagFromUrl = (await props.params).slug[0] === "All" ? "" : (await props.params).slug[0];
  const page = 1;
  const search = "";

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, tagFromUrl],
    queryFn: () => FetchNotes(search, page, tagFromUrl),
  })


  return (
    <>
      <div className={css.app}>
       <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient currentTag ={(await props.params).slug[0]}/>
    </HydrationBoundary>
      </div>
    </>
  );
}
