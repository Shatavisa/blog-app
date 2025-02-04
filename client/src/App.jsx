import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import OnlyAuthenticatedRoute from "./components/Oauth";
import PostDeatils from "./pages/PostDeatils";
import UpdatePost from "./pages/UpdatePost";

const App = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
       <Route path="/" element={user == null ? <SignIn /> : <Home />} /> 
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route>
          <Route element={<OnlyAuthenticatedRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />
          </Route>
          <Route path="/post/:id" element={<PostDeatils />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
