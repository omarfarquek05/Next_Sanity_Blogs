import { Button } from "@/components/ui/button";
import { client, urlFor } from "@/lib/sanity";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image  from "next/image";
import Link from "next/link";


export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc)  {
    title,
    _createdAt,
    author,
     authorImage,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data = await getData();
  //console.log(data);

  return (
    <>
    <main className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
         
       {
        data.map((post,idx)=> (
          <Card key={idx}>
            <Image src={urlFor(post.titleImage).url()} 
            alt="titleImage"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
            />
            <CardContent className="mt-5">
            <div className="flex gap-2 flex-center">
           <Image src={urlFor(post.authorImage).url()} 
           alt="authorImage"
           width={40}
           height={40}
           className="rounded-full object-contain"
           />
           <div className="flex flex-col">  
           <p className="text-sm  text-gray-600 dark:text-gray-300 mt-2">{post.author}</p>
           <p className="text-sm  text-gray-600 dark:text-gray-300 mt-1">{new Date(post._createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}</p> {/* Display formatted createdAt time */}
           </div>
           </div>
          

            <h1 className="text-lg line-clamp-2 font-bold mt-2">{post.title}</h1>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
            </CardContent>
          </Card>
        ))
       }
    </main>
    </>
  );
}
