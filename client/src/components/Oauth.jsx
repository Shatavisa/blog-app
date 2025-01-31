import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import React from 'react'

const OnlyAuthenticatedRoute = () => {
    const user = useSelector((state) => state?.user?.currentUser);
  return user?.adminSignup == "No" ? <Outlet /> : <Navigate to="/" />
}

export default OnlyAuthenticatedRoute