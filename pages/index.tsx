import React from "react";
import type {GetServerSideProps} from "next";
import Layout from "../components/Layout";
import Pagination from "./pagination";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
    let countFeed = await prisma.post.count({
        where: {
            published: true,
        }
    });
    return {
        props: {countFeed},
    };
};

type Props = {
    countFeed: number;
};

const Blog: React.FC<Props> = (props) => {
    const query = {
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
    };

    return (
        <Layout>
            <div className="page">
                <h1>Public Feed</h1>
                <main>
                    <Pagination totalNumberOfPosts={props.countFeed} numberOfPostsPerPage={10} query={query}></Pagination>
                </main>
            </div>
        </Layout>
    );
};

export default Blog;
