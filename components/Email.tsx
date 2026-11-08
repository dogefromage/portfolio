"use client"
import { PropsWithChildren, useState } from 'react';

const LOCAL_PART = [115, 101, 98, 46, 115, 97];
const DOMAIN = [101, 98, 108, 99, 111, 109, 46, 99, 104];

interface EmailProps {}

const Email = ({}: PropsWithChildren<EmailProps>) => {
  // only decoded on click, so the address is never part of the server rendered html
  const [ mail, setMail ] = useState<{ local: string, domain: string } | null>(null);

  const reveal = () => setMail({
    local: String.fromCharCode(...LOCAL_PART),
    domain: String.fromCharCode(...DOMAIN),
  });

  if (!mail) {
    return (
      <p><button onClick={reveal}>show email</button></p>
    );
  }

  return (
    <p>{mail.local}[ät]{mail.domain}</p>
  );
}

export default Email;
