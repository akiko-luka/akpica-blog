import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

// Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const UserProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);

    // MESSAGES
    const [updateMessage, setUpdateMessage] = useState("");
    const [invalidEmail, setInvalidEmail] = useState("");

    // password
    const [newPassword, setNewPassword] = useState("");
    const [visibleNew, setVisibleNew] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visibleConfirm, setVisibleConfirm] = useState(false);

    // User picture
    const [userPicture, setUserPicture] = useState(null);

    const handleShowNewPassword = () => {
        setVisibleNew(!visibleNew);
    };

    const handleShowConfirmPassword = () => {
        setVisibleConfirm(!visibleConfirm);
    };

    // Fetch the admin data
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get(
                    `http://localhost:3300/admin/${id}`
                );
                setAdmin(res.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, [id]); // This works only when the component mounts

    const handleFileChange = (e) => {
        setUserPicture(URL.createObjectURL(e.target.files[0]));
    };

    const handleChangePicture = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        try {
            await Axios.patch(
                `http://localhost:3300/admin/editPicture/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            // After successful update, fetch the updated admin data
            setUpdateMessage("Picture updated successfully");
            setTimeout(() => {
                setUpdateMessage("");
            }, 3000); // 3 seconds

            const res = await Axios.get(
                `http://localhost:3300/admin/${id}`
            );
            setAdmin({
                ...admin,
                userpicture: res.data.user.userpicture
            });
            setUserPicture(null);

            console.log("DATA", data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const email = admin.email;
        const fullname = admin.fullname;
        const password = admin.password;

        // if (newPassword !== confirmPassword) {
        //     alert("Password does not match");
        //     return;
        // }
        try {
            await Axios.patch(
                `http://localhost:3300/admin/editUserInfo/${id}`,
                {
                    email,
                    fullname,
                    password
                }
            );

            const res = await Axios.get(
                `http://localhost:3300/admin/${id}`
            );

            setAdmin({
                ...admin,
                email: res.data.user.email,
                fullname: res.data.user.fullname
            });

            setNewPassword(password);

            console.log("ADMIN", admin);

            // Navigate to the admin profile page
            navigate(`/dh-admin/dashboard/usersDashboard`);
        } catch (error) {
            console.log("ERROR", error);
        }
    };

    const handleChangeEmail = (e) => {
        const email = e.target.value;
        if (email === "" || !email.includes("@") || !email.includes(".")) {
            setInvalidEmail("Invalid email address");
        } else {
            setInvalidEmail("");
        }
        setAdmin({
            ...admin,
            email: email
        });
    };

    return (
        <>
            <div className="flex flex-col items-start pt-16 h-[calc(100vh-80px)]">
                {admin && (
                    <div className="flex w-4/6">
                        <div className="flex flex-col items-center w-2/5">
                            <h1 className="text-3xl font-semibold mb-8">
                                {admin && admin.fullname}
                            </h1>
                            <img
                                className="w-40 h-40 rounded-full mb-8  object-center border-4 border-akpica-white"
                                src={
                                    userPicture
                                        ? userPicture
                                        : `http://localhost:3300/photo/${admin.username}`
                                }
                                alt=""
                            />
                            <form
                                onSubmit={handleChangePicture}
                                className="flex flex-col items-center"
                                encType="multipart/form-data"
                            >
                                <input
                                    type="file"
                                    name="userpicture"
                                    onChange={handleFileChange}
                                    placeholder="Update Picture"
                                    className="block text-xs text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                />
                                <div className="flex items-center justify-between gap-4">
                                    {userPicture && (
                                        <div className="flex items-center justify-between gap-4 my-6">
                                            <button
                                                className="p-2 font-semibold bg-akpica-tomato text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                                                onClick={() =>
                                                    setUserPicture(null)
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="p-2 font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                                            >
                                                Update Picture
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Add a text after click in Update Picture button for 3 seconds and then disappear */}
                                {updateMessage && (
                                    <p className="text-akpica-white bg-akpica-green p-2 mt-5">
                                        {updateMessage}
                                    </p>
                                )}
                            </form>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <label className="w-1/4">Username:</label>
                                <input
                                    className="flex-1 bg-transparent text-akpica-white outline-none border-2 pl-2 py-1 opacity-40"
                                    readOnly
                                    type="text"
                                    placeholder={admin.username}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="w-1/4">Email:</label>
                                <input
                                    className="flex-1 bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                                    type="email"
                                    value={admin ? admin.email : ""}
                                    placeholder={admin.email}
                                    onChange={handleChangeEmail}
                                />
                            </div>
                            {invalidEmail && (
                                <p className="text-akpica-tomato text-right">
                                    {invalidEmail}
                                </p>
                            )}
                            <div className="flex items-center gap-4">
                                <label className="w-1/4">Full Name:</label>
                                <input
                                    className="flex-1 bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                                    type="text"
                                    value={admin && admin.fullname}
                                    placeholder={admin.fullname}
                                    onChange={(e) => {
                                        setAdmin({
                                            ...admin,
                                            fullname: e.target.value
                                        });
                                    }}
                                    maxLength={30}
                                />
                            </div>
                            <h1 className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 p-4 text-akpica-white text-xl">
                                Change Password
                            </h1>
                            <div className="flex items-center gap-4">
                                <label className="w-1/2">New Password:</label>
                                <input
                                    className="bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                                    type={visibleNew ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                    }}
                                />
                                <div
                                    className="p-2"
                                    onClick={handleShowNewPassword}
                                >
                                    {visibleNew ? (
                                        <AiOutlineEye />
                                    ) : (
                                        <AiOutlineEyeInvisible />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="w-1/2">
                                    Confirm New Password:
                                </label>
                                <input
                                    className="bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                                    type={visibleConfirm ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                                <div
                                    className="p-2"
                                    onClick={handleShowConfirmPassword}
                                >
                                    {visibleConfirm ? (
                                        <AiOutlineEye />
                                    ) : (
                                        <AiOutlineEyeInvisible />
                                    )}
                                </div>
                            </div>
                            <button
                                className="my-7 w-full py-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default UserProfile;
