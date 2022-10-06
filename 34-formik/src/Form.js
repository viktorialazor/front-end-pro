import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SubmitButton from './SubmitButton';
import styles from './App.module.css';

export default function Form({ onFormSubmit }) {
  const INITIAL_VALUES = {
    name: '',
    email: '',
    phone: '',
  };

  const FORM_VALIDATION_SCHEMA = {
    name: Yup.string()
      .required('The field "Name" is required'),
    email: Yup.string()
      .email('Invalid email address.')
      .required('The field "Email" is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'The field "Phone" must be only digits')
      .min(12, 'The field "Phone" must be exactly 12 digits.')
      .max(12, 'The field "Phone" must be exactly 12 digits.')
      .required('The field "Phone" is required'),
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={Yup.object(FORM_VALIDATION_SCHEMA)}
      onSubmit={onFormSubmit}
    >
      <FormikForm className={styles.form}>
        <p className={styles.form__row}>
          <label className={styles.form__text} htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" className={styles.form__input} placeholder="Enter your name" />
        </p>
        <p className={styles.form__row}>
          <label className={styles.form__text} htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" className={styles.form__input} placeholder="Enter your email" />
        </p>
        <p className={styles.form__row}>
          <label className={styles.form__text} htmlFor="phone">Phone</label>
          <Field type="text" id="phone" name="phone" className={styles.form__input} placeholder="Enter your phone" />
        </p>
        <ErrorMessage name='name'>{msg => <span className={styles.error}>{msg}</span>}</ErrorMessage>
        <ErrorMessage name='email'>{msg => <span className={styles.error}>{msg}</span>}</ErrorMessage>
        <ErrorMessage name='phone'>{msg => <span className={styles.error}>{msg}</span>}</ErrorMessage>
        <SubmitButton />
      </FormikForm>
    </Formik>
  );
};
