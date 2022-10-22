import { GetServerSidePropsContext } from "next";
import { getCsrfToken } from "next-auth/react";
import { FC, useEffect, useRef } from "react";

const Callback: FC<{ csrfToken: string }> = ({ csrfToken }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && formRef.current && inputRef.current) {
      const token = window.location.hash.slice(1);
      if (token) {
        inputRef.current?.setAttribute("value", token);
        formRef.current?.submit();
      }
    }
  }, []);

  return (
    <form method="post" action="/api/auth/callback/credentials" ref={formRef}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <input name="token" type="hidden" ref={inputRef} />
    </form>
  );
};

export default Callback;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
