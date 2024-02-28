import React from 'react'
import { client, urlFor } from "@/lib/sanity";
import Image  from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export const revalidate = 30; // revalidate at most 30 seconds

export async function getData(slug){
    const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          author,
          authorImage,
          content,
          titleImage
      }[0]`;

      const data = await client.fetch(query);
       return data;
}


const BlogArticle = async({params}) => {

    const data = await getData(params.slug);
    console.log(data)
  return (
    <div className="mt-8">
       <h1>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />
        
      <div className='flex flex-center items-center gap-2 mt-3'>
    <Image src={urlFor(data.authorImage).url()} 
      alt="authorImage"
      width={50}
      height={50}
      className="rounded-full object-contain"
      />
        <span className="block text-base text-center text-primary font-semibold  uppercase">
          {data.author} - Blog
        </span>
        </div>
      <div className="mt-4 prose prose-blue prose-lg 
      dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">

        <PortableText value={data.content} />
      </div>
    </div>
  )
}

export default BlogArticle