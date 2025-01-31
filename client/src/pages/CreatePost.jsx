import React, { useState } from "react";
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

const CreatePost = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    status: "Pending",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author) {
      setErrorMessage("All fields are required");
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const response = await fetch("api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // console.log("data:", data);

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
          Create Post
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

export default CreatePost;
