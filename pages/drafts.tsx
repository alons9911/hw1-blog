import React from "react";
import {GetServerSideProps} from "next";
import Layout from "../components/Layout";
import {useSession, getSession} from "next-auth/react";
import prisma from '../lib/prisma'
import Pagination from "./pagination";



export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});
    if (!session) {
        res.statusCode = 403;
        return {props: {drafts: []}};
    }

    let countDrafts = await prisma.post.count({
        where: {
            author: {email: session.user?.email},
            published: false,
        }
    });
    return {
        props: {countDrafts},
    };
};

type Props = {
    countDrafts: number;
};

const Drafts: React.FC<Props> = (props) => {
    const {data: session} = useSession();

    if (!session) {
        return (
            <Layout>
                <h1>My Drafts</h1>
                <div>You need to be authenticated to view this page.</div>
            </Layout>
        );
    }
    const query = {
        where: {
            author: {email: session.user?.email},
            published: false,
        },
        include: {
            author: {
                select: {name: true},
            },
        },
    };

    return (
        <Layout>
            <div className="page">
                <h1>My Drafts</h1>
                <main>
                    <Pagination totalNumberOfPosts={props.countDrafts} numberOfPostsPerPage={10} query={query}></Pagination>
                </main>
            </div>
            <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
        </Layout>
    );
};

export default Drafts;
