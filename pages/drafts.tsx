import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from '../lib/prisma'
import Pagination from "./pagination";


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let session = await getSession({ req });
  session = {"user":{"name":"alons9911","email":"alons9911@gmail.com","image":"https://avatars.githubusercontent.com/u/68388056?v=4"},"expires":"2023-07-03T10:50:31.620Z"};
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  let {data: session}= useSession();

  session = {"user":{"name":"alons9911","email":"alons9911@gmail.com","image":"https://avatars.githubusercontent.com/u/68388056?v=4"},"expires":"2023-07-03T10:50:31.620Z"};

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          <Pagination feed={props.drafts} numberOfPostsPerPage={10}></Pagination>
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
