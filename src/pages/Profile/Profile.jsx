import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { LoadUser, clearErrors } from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

export default function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authUser);



  //   if (user) {
  //     console.log("User fetched:", user.firstname, user.lastname);
  //   }

  //   if (isUpdated) {
  //     message.success("Profile Successfully Updated");
  //     dispatch(LoadUser()); // Refetch user data after an update
  //     dispatch({ type: UPDATE_PROFILE_RESET });
  //   }

  //   if (error) {
  //     message.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [user, dispatch, error, isUpdated]);

  return (
    <div className="flex flex-1 flex-col container mx-auto py-20">
      <div className="items-center">
        <p className="text-4xl">My Information</p>
      </div>
      <p className="text-black font-semibold hidden sm:block">
        {user.firstname} {user.lastname}
      </p>
    </div>
  );
}
