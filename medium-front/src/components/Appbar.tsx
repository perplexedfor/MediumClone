import { Avatar } from "./BlogCard"

export const Appbar = (User: {User: string}) => {
    return <div className="flex justify-between">
        <div>
            Medium
        </div>
        <div className="flex justify-between"> 
            <button type="button" className="py-1 px-3 me-2 mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>
            <Avatar initial={User.User}/>
        </div>
    </div>
}