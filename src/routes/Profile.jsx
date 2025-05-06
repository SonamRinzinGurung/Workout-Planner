import PropTypes from "prop-types";
import { useQuery, useMutation, useQueryClient, } from "@tanstack/react-query";
import useScrollToTop from "../utils/useScrollToTop";
import useSetTitle from "../utils/useSetTitle";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";
import ReactLoading from "react-loading";
import { InputText } from "../components";

const Profile = ({ user }) => {
    useSetTitle("Profile")
    useScrollToTop();
    const queryClient = useQueryClient();

    const { isPending, error, data } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const q = query(
                collection(db, "users"),
                where("uid", "==", user?.uid)
            )
            const profileSnapshot = await getDocs(q);

            const planDoc = profileSnapshot.docs[0]
            return planDoc.data()
        }
    })
    console.log(data)

    if (isPending) {
        return (
            <ReactLoading
                type="spinningBubbles"
                color="#8967b3"
                className="mx-auto mt-16"
            />
        );
    }
    if (error) {
        return (
            <div className="text-gray-900 mt-10 dark:text-gray-100 mx-auto">
                <p className="font-subHead font-semibold text-2xl text-center">
                    ERROR!! {error.message}
                </p>
            </div>
        );
    }

    return (
        <div className="md:mt-20 mt-10 mb-10 text-gray-900 dark:text-gray-100 flex flex-col mx-auto px-4 max-w-4xl w-full gap-8">
            <div className="self-center">
                <h1 className="font-bold font-heading text-3xl md:text-4xl text-center">
                    Profile
                </h1>
            </div>
            <div className="flex flex-col gap-8">

                <div>
                    <img src={data?.profileImg || "https://gravatar.com/avatar/b75024b24e7a2d4c53001ec41416aa74?s=400&d=mp&r=x"} alt="profile" className="w-20 md:w-28 rounded-full" />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="opacity-80 text-lg font-semibold">Name</span>
                    <InputText name="" value={`${data.firstName} ${data.lastName}`} className="border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-start md:text-lg md:w-3/4 w-11/12 h-14 focus:outline-none focus:ring-1 focus:ring-gray-500" disabled />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="opacity-80 text-lg font-semibold">Email</span>
                    <InputText name="" value={data.email} className="border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-start md:text-lg md:w-3/4 w-11/12 h-14 focus:outline-none focus:ring-1 focus:ring-gray-500" disabled />
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.object,
};

export default Profile;
