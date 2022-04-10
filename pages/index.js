import Head from "next/head";
import Search from "../components/Search";

//home page with search bar
export default function Home() {
  return (
    <div>
      <Head>
        <title>HeLO</title>
      </Head>
      <Search />
    </div>
  );
}
