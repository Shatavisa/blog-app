import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Textarea,
  Label,
  TextInput,
  Alert,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const user = useSelector((state) => state?.user?.currentUser);
  const [lo_post, setPostDetails] = useState({
    title: "",
    content: "",
    author: "",
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPostDetails({ ...lo_post, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    getPostById();
  }, []);

  const getPostById = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data?.blog) {
        setPostDetails(data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lo_post?.title || !lo_post?.content || !lo_post?.author) {
      setErrorMessage("All fields are required");
    }
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lo_post),
      });

      const data = await response.json();

      if (data.success == false) {
        setLoading(false);
        setErrorMessage(data.message);
      }

      setLoading(false);

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
      setErrorMessage(error?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="p-5 flex flex-col gap-4 w-1/2 h-1/2 mx-auto mt-5 mb-20">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Update Post
        </h5>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
              <TextInput
                id="title"
                type="text"
                placeholder="post title"
                onChange={handleChange}
                required
                value={lo_post?.title || ""}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="author" value="Author" />
              <TextInput
                id="author"
                placeholder="author name"
                type="text"
                onChange={handleChange}
                required
                value={lo_post?.author || ""}
              />
            </div>
          </div>
          <div className="mb-2 block">
            <Label htmlFor="content" value="Content" />
            <Textarea
              id="content"
              placeholder="Write post content..."
              onChange={handleChange}
              required
              rows={5}
              value={lo_post?.content || ""}
            />
          </div>
          {errorMessage && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span>{errorMessage}</span>
            </Alert>
          )}
          <Button
            className="bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
};

export default UpdatePost;
