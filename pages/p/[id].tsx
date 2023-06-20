import React, {useEffect, useRef, useState} from "react";
import {GetServerSideProps} from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import {PostProps} from "../../components/Post";
import prisma from '../../lib/prisma'
import {useSession} from "next-auth/react";
import {findPost} from "../../mongodb_operations";
import Video from "../../components/Video";
import Cookies from 'js-cookie';


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(params?.id) || -1,
        },
        include: {
            author: {
                select: {name: true, email: true},
            },
        },
    });
    if (post) {
        const video = await findPost(post.id);
        if (video) {
            console.log(video.link)
            return {
                props: Object.assign((post ?? {author: {name: "Me"}}), {link: video.link})
            };
        }

        return {
            props: post ?? {author: {name: "Me"}}
        };
    }

    /*if (post) {
        const res = await fetch(`/api/getvideo/${post.id}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
        const videoInfo = await res.json();
        console.log(videoInfo)
    }*/
    return {
        props: post ?? {author: {name: "Me"}}
    };
};

async function publishPost(id: number): Promise<void> {
    await fetch(`/api/publish/${id}`, {
        method: "PUT",
    });
    await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
        method: "DELETE",
    });
    await Router.push("/")
}

const Post: React.FC<PostProps> = (props) => {

    const {data: session, status} = useSession();
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        const user = Cookies.get('CurrentUser');
        setCurrentUser(user !== undefined ? JSON.parse(user) : user);
    });
    if (status === 'loading') {
        return <div>Authenticating ...</div>;
    }
    const userHasValidSession = Boolean(session);
    const postBelongsToUser = session?.user?.email === props.author?.email;

    let title = props.title;
    if (!props.published) {
        title = `${title} (Draft)`;
    }

    return (
        <Layout>
            <div>
                <h2>{title}</h2>
                <p>By {props?.author?.name || "Unknown author"}</p>
                <ReactMarkdown children={props.content}/>
                {props.link ? <Video link={props.link}></Video> : <></>}
                {!props.published && userHasValidSession && postBelongsToUser && (
                    <button onClick={() => publishPost(props.id)}>Publish</button>
                )}
                {userHasValidSession && postBelongsToUser && (
                    <button onClick={() => deletePost(props.id)}>Delete</button>
                )}
            </div>
            <style jsx>{`
              .page {
                background: white;
                padding: 2rem;
              }

              .actions {
                margin-top: 2rem;
              }

              button {
                background: #ececec;
                border: 0;
                border-radius: 0.125rem;
                padding: 1rem 2rem;
              }

              button + button {
                margin-left: 1rem;
              }
            `}</style>
        </Layout>
    );
};

export default Post;
