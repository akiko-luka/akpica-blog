/* eslint-disable react/prop-types */
import { CiCalendarDate } from "react-icons/ci";

const AuthorDate = ({ avatar, author, date }) => {
    return (
        <>
            <div className="flex items-center gap-2">
                <img
                    src={avatar}
                    alt={author}
                    className="w-5 h-5 rounded-full object-cover"
                />
                <p className="text-white">{author}</p>
                <div className="flex items-center gap-1 text-white">
                    <CiCalendarDate />

                    <p className="font-akpica-heading font-[500]">
                        {date || new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </>
    );
};
export default AuthorDate;