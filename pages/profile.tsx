import React, {useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import Layout from "../components/Layout";
import prisma from '../lib/prisma'
import Cookies from 'js-cookie';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from 'react-avatar';

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    let currentUser = req.cookies.CurrentUser;

    if (!currentUser) {
        res.statusCode = 403;
        return {props: {countDrafts: 0}};
    } else {
        currentUser = JSON.parse(currentUser);
    }

    let user = await prisma.user.findUniqueOrThrow({
        where: {
            username: currentUser.user?.username,
        }
    });
    return {
        props: {
            username: user.username,
            name: user.name,
            email: user.email
        }
    };
};

type Props = {
    username: string;
    name: string;
    email: string;
};

const Profile: React.FC<Props> = (props) => {
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
                <h1>My Profile</h1>
                <div>You need to be authenticated to view this page.</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="page">
                <h1>My Profile</h1>
                <main>
                    <section className="vh-100" style={{backgroundColor: '#f4f5f7'}}>
                        <TableContainer sx={{width: 400}} component={Paper}>
                            <Table  size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell component="th" align="center">Information<br/>
                                            <Avatar src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"></Avatar>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">Username</TableCell>
                                        <TableCell align="right">{props.username}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">Name</TableCell>
                                        <TableCell align="right">{props.name}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">Email</TableCell>
                                        <TableCell align="right">{props.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </section>
                </main>
            </div>
        </Layout>
    );
};

export default Profile;
