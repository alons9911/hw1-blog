import React, {useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import Layout from "../components/Layout";
import {useSession, getSession} from "next-auth/react";
import prisma from '../lib/prisma'
import Pagination from "./pagination";
import Cookies from 'js-cookie';
import {useLocation} from "react-router";

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    let currentUser = req.cookies.CurrentUser;

    if (!currentUser) {
        res.statusCode = 403;
        return {props: {countDrafts: 0}};
    }
    else{
        currentUser = JSON.parse(currentUser);
    }

    let countDrafts = await prisma.post.count({
        where: {
            author: {email: currentUser.user?.email},
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
    //const {data: session, status} = useSession();
    const [currentUser, setCurrentUser] = useState();
    const [isCurrentUserSet, setIsCurrentUserSet] = useState(false);
    useEffect(() => {
        if (!isCurrentUserSet) {
            const user = Cookies.get('CurrentUser');
            setCurrentUser(user !== undefined ? JSON.parse(user) : user);
            setIsCurrentUserSet(true);
        }
    });
    if (!currentUser) {
        return (
            <Layout>
                <h1>My Drafts</h1>
                <div>You need to be authenticated to view this page.</div>
            </Layout>
        );
    }
    // @ts-ignore
    const query = {
        where: {
            author: {email: currentUser.user?.email},
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
                    <Pagination totalNumberOfPosts={props.countDrafts} numberOfPostsPerPage={10}
                                query={query}></Pagination>
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
