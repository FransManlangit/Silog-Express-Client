import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar.jsx";
import {  LoadUser, clearErrors } from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);

  const { user = {} } = useSelector((state) => state.auth || {});
  const { error, isUpdated, loading } = useSelector((state) => state.user || {});

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
      setMobilenumber(user.mobilenumber || "");
      setEmail(user.email || "");
      setGender(user.gender || "");
      setAvatar(user.avatar?.url || null);
    }

    if (isUpdated) {
      message.success("Profile Successfully Updated");
      dispatch(LoadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [user, dispatch, error, isUpdated]);

  const validateForm = () => {
    let errors = {};

    if (!firstname) errors.firstname = "First name is required";
    if (!lastname) errors.lastname = "Last name is required";

    if (!mobilenumber) {
      errors.mobilenumber = "Mobile number is required";
    } else {
      const phonePattern = /^[0-9]{10,15}$/;
      if (!phonePattern.test(mobilenumber)) {
        errors.mobilenumber = "Invalid mobile number";
      }
    }

    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email address";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const fileProps = {
    name: "image",
    multiple: false,
    listType: "picture",
    fileList,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: () => false,
    onChange: (info) => {
      const file = info.fileList[0]?.originFileObj;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
        setFileList(info.fileList);
      }
    },
  };

  const updateHandler = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.set("firstname", firstname);
    formData.set("lastname", lastname);
    formData.set("mobilenumber", mobilenumber);
    formData.set("email", email);
    formData.set("gender", gender);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await dispatch(updateProfile(formData));
      message.success("Profile Successfully Updated");
      dispatch(LoadUser());
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex flex-1 flex-col container mx-auto py-20">
      <div className="flex relative gap-6">
        <div className="sticky top-0">
          <ProfileSidebar />
        </div>

        <form className="flex flex-1 flex-col gap-20">
          <div className="items-center">
            <p className="text-4xl">My Information</p>
          </div>
          <div className="flex flex-col space-y-12">
            {/* First Name */}
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  First Name <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={firstname}
                  onChange={handleInputChange(setFirstname, "firstname")}
                  className={`font-medium ${errors.firstname ? 'border-red-500' : ''}`}
                />
                {errors.firstname && (
                  <p className="text-red-500 flex items-center">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                    {errors.firstname}
                  </p>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Last Name <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={lastname}
                  onChange={handleInputChange(setLastname, "lastname")}
                  className={`font-medium ${errors.lastname ? 'border-red-500' : ''}`}
                />
                {errors.lastname && (
                  <p className="text-red-500 flex items-center">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                    {errors.lastname}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Number */}
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Mobile Number <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={mobilenumber}
                  onChange={handleInputChange(setMobilenumber, "mobilenumber")}
                  className={`font-medium ${errors.mobilenumber ? 'border-red-500' : ''}`}
                />
                {errors.mobilenumber && (
                  <p className="text-red-500 flex items-center">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                    {errors.mobilenumber}
                  </p>
                )}
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="space-y-1">
              <p className="font-semibold">Profile Avatar</p>
              <Upload {...fileProps} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </div>
          </div>

          <div className="flex flex-1 flex-row justify-center">
            <Button
              className="w-60 h-14 py-4 px-6 font-poppins font-medium text-[18px] text-white bg-[#1E4BCA] bg-blue-gradient rounded-[10px] outline-none"
              onClick={() => updateHandler()}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
