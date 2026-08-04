'use client';
import Modal from '@/components/Modal/Modal';
import css from '@/app/@modal/(.)notes/[id]/NotePreview.module.css';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
const router = useRouter();

  return (
    <>
      <Modal onClose={() => {router.back}}>
        <main className={css.main}>
          <div className={css.container}>
            {isLoading && <p>Loading, please wait...</p>}
            {isError && <p>Something went wrong.</p>}
            {data && (
              <div className={css.item}>
                <div className={css.header}>
                  <h2>{data?.title}</h2>
                </div>
                <p className={css.tag}>{data?.tag}</p>
                <p className={css.content}>{data?.content}</p>
                <p className={css.date}>{data?.createdAt}</p>
              </div>
            )}
          </div>
        </main>
      </Modal>
    </>
  );
}
