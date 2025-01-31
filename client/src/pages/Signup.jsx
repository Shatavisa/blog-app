import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Label,
  TextInput,
  Button,
  Radio,
  Spinner,
  Alert,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adminSignup: "No",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await fetch("api/auth/signup", {
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
        navigate("/sign-in");
      }
    } catch (error) {
      // console.log(error);
      setErrorMessage(error?.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">
        {/* Left */}
        <div className="flex-1">
          <Link to={"/"} className="font-semibold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 rounded-lg text-white">
              Tech
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">Choose the best blogging platform to showcase your content</p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Your Username"
                id="username"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="user@gmail.com"
                id="email"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="*********"
                id="password"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label value="Admin Signup" />
              <div className="flex flex-row gap-5 p-3">
                <div className="flex items-center gap-2">
                  <Radio
                    id="adminSignup"
                    name="adminSignup"
                    value="No"
                    defaultChecked
                    onChange={handleChange}
                  />
                  <Label htmlFor="adminSignupNo">No</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="adminSignup"
                    name="adminSignup"
                    value="Yes"
                    onChange={handleChange}
                  />
                  <Label htmlFor="adminSignupYes">Yes</Label>
                </div>
              </div>
            </div>
            {errorMessage && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span>{errorMessage}</span>
              </Alert>
            )}
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" light={false} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account? </span>
            <Link to={"/sign-in"} className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
