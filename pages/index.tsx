import React, {useState} from "react";
import type {GetServerSideProps} from "next";
import Layout from "../components/Layout";
import {PostProps} from "../components/Post";
import Pagination from "./pagination";
import prisma from "../lib/prisma";
import {findPosts} from "../mongodb_operations";

export const getServerSideProps: GetServerSideProps = async () => {
    /*const res = await fetch(`/api/page/1`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });*/
    let feed = await prisma.post.findMany({
        where: {
            published: true,
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });
    const videos = await findPosts(feed.map((post) => post.id));
    feed = feed.map((post) => Object.assign(post, {videoUrl: videos[post.id]}));
    return {
        props: {feed},
    };
/*
    return await res.json();
*/
};

type Props = {
    feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    fetch(`/api/page/1`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });
    return (
        <Layout>
            <div className="page">
                <h1>Public Feed</h1>
                <main>
                    <Pagination feed={props.feed} numberOfPostsPerPage={10}></Pagination>
                </main>
            </div>
        </Layout>
    );
};

export default Blog;
