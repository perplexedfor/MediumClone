import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"


export const Blogs = (val: {User: string}) => {
    return <div>
                <Appbar User={val.User}/>
            <div className="flex justify-center">
                <div className="max-w-3xl flex flex-col justify-center">
                    <BlogCard authorName={'Abhinav'} title={"How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"} content={"No need to create a fancy and modern website with hundreds of pages to make money online. Making money is a dream for many"} publishedDate={"69/11/1986"}/>
                    <BlogCard authorName={'Abhinav'} title={"How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"} content={"No need to create a fancy and modern website with hundreds of pages to make money online. Making money is a dream for many"} publishedDate={"69/11/1986"}/>
                    <BlogCard authorName={'Abhinav'} title={"How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"} content={"No need to create a fancy and modern website with hundreds of pages to make money online. Making money is a dream for many"} publishedDate={"69/11/1986"}/>
                </div>
            </div>
        </div>
}