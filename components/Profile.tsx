import Loader from "./Loader";
import PromptCard from "./PromptCard";

function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  isLoading,
}: any) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Profile;
