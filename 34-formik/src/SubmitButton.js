import React from 'react';
import { useFormikContext } from 'formik';
import styles from './App.module.css';

export default function SubmitButton() {
  const { isValid } = useFormikContext();

  return (<button className={styles.form__button} disabled={!isValid} type="submit">Submit</button>);
};
