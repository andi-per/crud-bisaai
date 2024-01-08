import Feed from "@/components/Feed";

function Home() {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Temukan & Bagikan
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          {" "}
          Judul Buku Favorit Anda
        </span>
      </h1>
      <p className="desc text-center">
        <span className="font-bold text-pretty"> BukuBagus</span> adalah sebuah
        platform untuk anda berbagi dan menemukan buku-buku yang menarik untuk
        kalian nikmati.
      </p>

      <Feed />
    </section>
  );
}

export default Home;
