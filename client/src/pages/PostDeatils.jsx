import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { useParams } from "react-router-dom";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostDeatils = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.currentUser);
  const [lo_post, setPostDetails] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleUpdate = () => {
    navigate(`/update-post/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data?.success == true) {
        navigate("/");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/admin/approve/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
        if (data?.result?.status == "Approved") {
          setLoading(false);
          navigate("/");
        }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <Card className="flex max-w-xl p-4 mt-10 mx-10">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {lo_post?.title}
          </h5>
        </div>
        
        {/* { <> */}
        {user?.adminSignup == "Yes" && (
          <div className="flex justify-end gap-2">
            <Button
              size="xs"
              onClick={handleApprove}
              disabled={lo_post?.status == "Approved" || loading}
            >
              {lo_post?.status == "Approved" ? "Approved" : "Approve"}
            </Button>
          </div>
        )} 
         {user?._id === lo_post?.createdBy &&(
          <div className="flex justify-end gap-4">
            <button
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
              onClick={handleUpdate}
            >
              <MdOutlineModeEdit size={16} color="blue" />
            </button>

            <button
              className="flex items-center gap-2 text-red-500 hover:text-red-700"
              onClick={handleDelete}
            >
              <MdDelete size={16} color="red" />
            </button>
          </div>
          
        )}
        {/* </>
       } */}

        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-3">
                  <p className="py-4 mt-2 truncate text-sm font-medium text-gray-900 dark:text-white">
                    {lo_post?.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {lo_post?.content}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PostDeatils;
