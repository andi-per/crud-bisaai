import Link from "next/link";

function Form({ type, post, setPost, submitting, onSubmit }: any) {
  return (
    <section className="w-full max-w-full flex-col flex-start">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Buku</span>
      </h1>
      <p className="desc text-left max-w-md">
        Ayo, bagikan buku-buku favoritmu kepada dunia...
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Judul Buku
          </span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            placeholder="#Title"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Penulis
          </span>
          <input
            value={post.author}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            type="text"
            placeholder="#Author"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Kenapa harus baca buku ini?
          </span>

          <textarea
            value={post.reason}
            onChange={(e) => setPost({ ...post, reason: e.target.value })}
            placeholder="#Reason"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Genre Buku{" "}
            <span className="font-normal">
              (#fiksi, #non-fiksi, #sains, dll.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Kembali
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
