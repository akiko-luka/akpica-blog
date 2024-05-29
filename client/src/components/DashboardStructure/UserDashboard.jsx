import { useContext, useState, useEffect } from "react";
import { PostContext } from "@contexts/PostContext.jsx";
import Axios from "axios";
import { FaPlus } from "react-icons/fa";
import { MdOutlineChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import BACKEND_URL from "@utils/backendUrl.js";
import NoteDashboard from "./NoteDashboard.jsx";

const UserDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [userQuantity, setUserQuantity] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [sortCriteria, setSortCriteria] = useState({ field: "name", order: "asc" });

    const { posts } = useContext(PostContext);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get(`${BACKEND_URL}/admin`, {
                    withCredentials: true
                });
                setAdmin(res.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, []);

    useEffect(() => {
        if (admin) {
            setUserQuantity(admin.length);
        } else {
            setUserQuantity(0);
        }
    }, [admin]);

    const confirmDeleteUser = (userId) => {
        setUserToDelete(userId);
        setShowModal(true);
    };

    const deleteUser = async () => {
        try {
            await Axios.delete(`${BACKEND_URL}/admin/delete/${userToDelete}`, {
                withCredentials: true
            });
            setAdmin(admin.filter(user => user._id !== userToDelete));
            setShowModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserPostCount = (userId) => {
        return posts.filter(post => post.author._id === userId).length;
    };

    const handleSortChange = (field) => {
        setSortCriteria((prevCriteria) => ({
            field,
            order: prevCriteria.field === field && prevCriteria.order === "asc" ? "desc" : "asc"
        }));
    };

    const sortUsers = (users) => {
        return users.sort((a, b) => {
            if (sortCriteria.field === "name") {
                return sortCriteria.order === "asc"
                    ? a.fullname.localeCompare(b.fullname)
                    : b.fullname.localeCompare(a.fullname);
            } else if (sortCriteria.field === "email") {
                return sortCriteria.order === "asc"
                    ? a.email.localeCompare(b.email)
                    : b.email.localeCompare(a.email);
            } else if (sortCriteria.field === "role") {
                return sortCriteria.order === "asc"
                    ? a.role.localeCompare(b.role)
                    : b.role.localeCompare(a.role);
            } else if (sortCriteria.field === "posts") {
                return sortCriteria.order === "asc"
                    ? getUserPostCount(a._id) - getUserPostCount(b._id)
                    : getUserPostCount(b._id) - getUserPostCount(a._id);
            }
            return 0;
        });
    };

    const sortedAdmin = admin ? sortUsers([...admin]) : [];

    return (
        <div>
            <div className="flex items-center pt-6 pb-3 pl-8 gap-4">
                <Link
                    to="/dh-admin/dashboard/register"
                    className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                >
                    <FaPlus /> Add New User
                </Link>
            </div>
            <div className="m-2 pl-8 text-akpica-white">({userQuantity}) Users</div>
            <section className="flex flex-col md:flex-row gap-6 w-full p-4">
                <div className="relative overflow-x-auto shadow-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortChange("name")}>
                                    Name
                                    <MdOutlineChevronRight className={`rotate-90 ml-1 inline-block transform ${sortCriteria.field === "name" && sortCriteria.order === "asc" ? "-rotate-90" : "rotate-90"}`} />
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortChange("email")}>
                                    Email Address
                                    <MdOutlineChevronRight className={`rotate-90 ml-1 inline-block transform ${sortCriteria.field === "email" && sortCriteria.order === "asc" ? "-rotate-90" : "rotate-90"}`} />
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortChange("role")}>
                                    Role
                                    <MdOutlineChevronRight className={`rotate-90 ml-1 inline-block transform ${sortCriteria.field === "role" && sortCriteria.order === "asc" ? "-rotate-90" : "rotate-90"}`} />
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortChange("posts")}>
                                    Posts
                                    <MdOutlineChevronRight className={`rotate-90 ml-1 inline-block transform ${sortCriteria.field === "posts" && sortCriteria.order === "asc" ? "-rotate-90" : "rotate-90"}`} />
                                </th>
                                <th colSpan={2} className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAdmin.map((user, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full object-cover object-center"
                                            src={`${BACKEND_URL}/photo/${user.username}?${new Date().getTime()}`}
                                            alt=""
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{user.fullname}</div>
                                            <div className="font-normal text-gray-500">@{user.username}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{user.email.toLowerCase()}</td>
                                    <td className="px-6 py-4">
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            className="underline-offset-4 underline"
                                            to={`/dh-admin/dashboard/postsDashboard?authorId=${user._id}`}
                                        >
                                            {getUserPostCount(user._id)}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/dh-admin/dashboard/usersDashboard/${user._id}`}
                                            className="font-medium text-akpica-marco dark:text-akpica-marco hover:underline hover:underline-offset-4"
                                        >
                                            Edit user
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => confirmDeleteUser(user._id)}
                                            className="font-medium text-akpica-tomato dark:text-akpica-tomato hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col flex-1 bg-gray-800 p-4">
                    <NoteDashboard />
                </div>
            </section>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this user?</p>
                        <p className="text-xs mt-2 text-red-600">This action is irreversible.</p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteUser}
                                className="px-4 py-2 bg-akpica-tomato text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
