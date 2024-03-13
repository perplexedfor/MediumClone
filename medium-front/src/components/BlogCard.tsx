interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}



export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) =>{
    return <div>
    <div className="flex my-2">
        <Avatar initial = {authorName.slice(0,2)}/>
        <div className="max-w-lg flex justify-center">
            <div className="font-medium text-lg px-1">
                {authorName}
            </div>
            .
            <div className="text-gray-600 px-1 text-lg">
                {publishedDate}
            </div>
        </div>
    </div>
    <div className="font-bold text-2xl">
        {title}
    </div>
    <div className=" text-xl mt-1">
        {content.slice(0,200) + "..."}
    </div>
    <div className="text-gray-600 text-medium my-4">
        {`${Math.ceil(content.length/100)} minutes`}
    </div>
    <div className="w-full bg-gray-200 h-[2px]">
    </div>
    </div>
}

export function Avatar(value: {initial : string}) {
    return <div>
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">{value.initial}</span>
        </div>
    </div>
}