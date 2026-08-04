"use client"
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import * as Yup from 'yup';
// import { useEffect } from 'react';

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {


  const queryClient = useQueryClient();

  interface FormValues {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  }

  const initialValues: FormValues = {
    title: 'New Task',
    content: '',
    tag: 'Todo',
  };

  //////CLOSE ON BACKDROP CLICK //////////

  // const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (event.target === event.currentTarget) {
  //     onClose();
  //   }
  // };
  
  // useEffect(() => {
	//   const handleKeyDown = (e: KeyboardEvent) => {
	//     if (e.key === "Escape") {
	//       onClose();
	//     }
	//   };
	
	//   document.addEventListener("keydown", handleKeyDown);
  //   document.body.style.overflow = "hidden";
	
	//   return () => {
	//     document.removeEventListener("keydown", handleKeyDown);
  //     document.body.style.overflow = "";
	//   };
	// }, [onClose]);

  ////////////////////////////////////////

  //// MUTATION METOD(POST) CREATE TASK//////////
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });
  /////////////////////////

  function handleSubmit(
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) {
    mutation.mutate(values);
    formikHelpers.resetForm();
  }

  ////////////////VALIDATION//////////////

  const ValidationSchema = Yup.object().shape({
    title: Yup.string().required().min(3).max(50),
    content: Yup.string().max(500),
    tag: Yup.string().required().oneOf(['Todo','Work', 'Personal', 'Meeting', 'Shopping']),
  });
  ///////////////////////////////////////

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ValidationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component={'span'} name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage
            component={'span'}
            name="content"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component={'span'} name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
