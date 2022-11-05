import {GetServerSidePropsContext} from 'next';
import {getCsrfToken} from 'next-auth/react';
import {FC, useEffect, useRef} from 'react';
import {GlassPanel} from '@components/GlassPanel';

const Callback: FC<{ csrfToken: string }> = ({csrfToken}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && formRef.current && inputRef.current) {
      const token = window.location.hash.slice(1);
      if (token) {
        inputRef.current?.setAttribute('value', token);
        formRef.current?.submit();
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 text-white h-full" id="masked-overflow">
      <GlassPanel title="Login" className="p-4 mx-10 pb-8 mb-20 mt-10">
        <h1>Logging you in, please hang tight...</h1>
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin w-16 h-16 border-4 border-t-white rounded-full"
               role="status"></div>
        </div>
        <form method="post" action="/api/auth/callback/credentials" ref={formRef}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
          <input name="token" type="hidden" ref={inputRef}/>
        </form>
      </GlassPanel>
    </div>
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
