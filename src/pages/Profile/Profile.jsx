import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, message, Button, Upload, Form } from "antd";
import { LoadUser, updateProfile } from "../../actions/userActions";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from 'react-hot-toast'; 
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar.jsx";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { user } = useSelector((state) => state.authUser);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({}); // Error state

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setMobileNumber(user.mobilenumber);
    }
  }, [user]);

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "", // Clear the error when user starts typing
    }));
  };

  const fileProps = {
    name: "image",
    multiple: false,
    listType: "picture",
    beforeUpload: () => false,
    onChange: (info) => {
      const file = info.fileList[0]?.originFileObj;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
  };

  const validateForm = () => {
    let errors = {};
    if (!firstname) errors.firstname = "First Name is required";
    if (!lastname) errors.lastname = "Last Name is required";
    if (!mobilenumber) {
      errors.mobilenumber = "Mobile number is required";
    } else {
      const mobilenumberPattern = /^[0-9]{10,15}$/;
      if (!mobilenumberPattern.test(mobilenumber)) {
        errors.mobilenumber = "Invalid mobile number";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.set("firstname", firstname);
    formData.set("lastname", lastname);
    formData.set("mobilenumber", mobilenumber);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await dispatch(updateProfile(formData));
      toast.success("Profile Successfully Updated", { position: "top-center" });
      dispatch(LoadUser());
      navigate("/userprofile");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.", { position: "top-center" });
    }
  };

  return (
    <div className="flex flex-1 flex-col container mx-auto py-20">
      <div className="flex relative gap-6">
      <div className="sticky top-0">
          <ProfileSidebar />
        </div>
        <div className="sticky top-0"></div>
        <form className="flex flex-1 flex-col gap-20" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="items-center">
            <p className="text-4xl font-serif">My Information</p>
          </div>
          <div className="flex flex-col space-y-12">
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              
              {/* First Name Field */}
              <div className="space-y-1">
                <p className="text-lg font-serif">First Name <span className="text-red-500">*</span></p>
                <Form.Item validateStatus={errors.firstname ? 'error' : ''} help={errors.firstname}>
                  <Input
                    size="large"
                    value={firstname}
                    onChange={handleInputChange(setFirstName, "firstname")}
                    className="border rounded-lg px-4 py-2 focus:border-[#D56F00] focus:ring-2 focus:ring-[#D56F00]"
                  />
                </Form.Item>
              </div>

              {/* Last Name Field */}
              <div className="space-y-1">
                <p className="text-lg font-serif">Last Name <span className="text-red-500">*</span></p>
                <Form.Item validateStatus={errors.lastname ? 'error' : ''} help={errors.lastname}>
                  <Input
                    size="large"
                    value={lastname}
                    onChange={handleInputChange(setLastName, "lastname")}
                    className="border rounded-lg px-4 py-2 focus:border-[#D56F00] focus:ring-2 focus:ring-[#D56F00]"
                  />
                </Form.Item>
              </div>

            </div>

            {/* Mobile Number Field */}
            <div className="space-y-1">
              <p className="text-lg font-serif">Mobile Number <span className="text-red-500">*</span></p>
              <Form.Item validateStatus={errors.mobilenumber ? 'error' : ''} help={errors.mobilenumber}>
                <Input
                  size="large"
                  value={mobilenumber}
                  onChange={handleInputChange(setMobileNumber, "mobilenumber")}
                  className="border rounded-lg px-4 py-2 focus:border-[#D56F00] focus:ring-2 focus:ring-[#D56F00]"
                />
              </Form.Item>
            </div>

            {/* Profile Avatar Field */}
            <div className="space-y-1">
              <p className="text-lg font-serif">Profile Avatar</p>
              <Upload {...fileProps} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </div>

          </div>
        </form>
      </div>
      <div className="mt-24 flex flex-1 flex-row justify-center">
        <button
          className="w-60 h-14 py-4 px-6 font-poppins font-medium text-[18px] text-white bg-[#D56F00] bg-blue-gradient rounded-[10px] outline-none transition-colors duration-300 hover:bg-[#585666] active:bg-[#3e3d41]"
          onClick={handleSubmit}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
