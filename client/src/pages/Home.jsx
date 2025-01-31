import { Button, Card, Badge } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.currentUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await fetch("api/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log('data', data);
      if (data?.posts?.length > 0) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen p-5">
      {/* Create Blog Button */}
      {user?.adminSignup === "No" && (
        <Button
          className="absolute top-5 right-5 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500"
          onClick={() => navigate("/create-post")}
        >
          Create Blog
        </Button>
      )}

      {/* Main Title */}
      <h2 className="text-3xl font-bold mb-6">Blog List</h2>

      {/* Blog Cards */}
      <div className="flex flex-col items-center gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card className="max-w-xl" key={post._id}>
              {user?.adminSignup === "Yes" && (
                <div className="flex flex-wrap justify-end gap-2">
                  <Badge color="info">{post?.status}</Badge>
                </div>
              )}
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {`${post?.content?.slice(0, 150)}...`}
              </p>
              <Button onClick={() => navigate(`/post/${post._id}`)}>
                Read more
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Card>
          ))
        ) : (
          <h2 className="text-2xl font-thin tracking-tight text-center text-gray-900 dark:text-white mt-10">
            No posts found
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
