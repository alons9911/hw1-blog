import React, {useState} from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import {useSession} from "next-auth/react";
import post from "../components/Post";

const Draft: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {data: session, status} = useSession();
    const [video, setVideo] = useState(null);
    let email = session?.user?.email;
    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = {title, content, session, email};
            const res = await fetch(`/api/post`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });
            const postInfo = await res.json();

            if (video !== null) {
                const formData = new FormData();
                formData.append('inputFile', video);
                // @ts-ignore
                const response = await fetch(`/api/upload/${postInfo.id}`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                const url = data.url;
                console.log(url);
            }
            await Router.push("/drafts");

        } catch (error) {
            console.error(error);
        }

    };

    const handleVideoPicking = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setVideo(file);
        try {
            //
        } catch (error) {
            //
        } finally {
            //
        }
    };


    return (
        <Layout>
            <div>
                <form onSubmit={submitData}>
                    <h1>New Draft</h1>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                    />
                    <textarea
                        cols={50}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        rows={8}
                        value={content}
                    />
                    <input type="file" accept="video/*" onChange={handleVideoPicking}/>
                    <br/>
                    <input disabled={!content || !title} type="submit" value="Create"/>
                    <a className="back" href="#" onClick={() => Router.push("/")}>
                        or Cancel
                    </a>
                </form>
            </div>
            <style jsx>{`
              .page {
                background: white;
                padding: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              input[type="text"],
              textarea {
                width: 100%;
                padding: 0.5rem;
                margin: 0.5rem 0;
                border-radius: 0.25rem;
                border: 0.125rem solid rgba(0, 0, 0, 0.2);
              }

              input[type="submit"] {
                background: #ececec;
                border: 0;
                padding: 1rem 2rem;
              }

              .back {
                margin-left: 1rem;
              }
            `}</style>
        </Layout>
    );
};

export default Draft;
