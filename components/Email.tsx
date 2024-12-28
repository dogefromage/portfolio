"use client"
import { PropsWithChildren, useEffect, useMemo } from 'react';

interface EmailProps {}

const Email = ({}: PropsWithChildren<EmailProps>) => {

  // const [ mail, setMail ] = useEffect

  const mail = useMemo(() =>
    [115, 101, 98, 46, 115, 97, 64, 101, 98, 108, 99, 111, 109, 46, 99, 104]
      .map(x => String.fromCharCode(x)).join(''), []);

  return (
    <p>{mail}</p>
  );
}

export default Email;