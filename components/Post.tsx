import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Video from "./Video";

export type PostProps = {
    id: number;
    title: string;
    author: {
        name: string;
        email: string;
    } | null;
    content: string;
    published: boolean;
    videoUrl: string | null;
};

const Post: React.FC<{ post: PostProps }> = ({post}) => {
    const authorName = post.author ? post.author.name : "Unknown author";
    //console.log(post);
    return (
        <div>
            <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
                <h2>{post.title}</h2>
                <small>By {authorName}</small>
                <ReactMarkdown children={post.content}/>
                <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
            </div>
            {post.videoUrl ? <Video link={post.videoUrl}></Video> : <></>}
        </div>
    );
};

export default Post;
