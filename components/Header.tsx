import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {signOut, useSession} from "next-auth/react";
import Cookies from 'js-cookie';

const Header: React.FC = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    const {data: session, status} = useSession();
    const [currentUser, setCurrentUser] = useState();
    const [isCurrentUserSet, setIsCurrentUserSet] = useState(false);
    useEffect(() => {
        if (!isCurrentUserSet) {
            const user = Cookies.get('CurrentUser');
            setCurrentUser(user !== undefined ? JSON.parse(user) : user);
            setIsCurrentUserSet(true);
        }
    });


    let left = (
        <div className="left">
            <Link href="/" legacyBehavior>
                <a className="bold" data-active={isActive("/")}>
                    Feed
                </a>
            </Link>
            <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
        </div>
    );

    let right = null;

    if (status === 'loading') {
        left = (
            <div className="left">
                <Link href="/" legacyBehavior>
                    <a className="bold" data-active={isActive("/")}>
                        Feed
                    </a>
                </Link>
                <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
            </div>
        );
        right = (
            <div className="right">
                <p>Validating session ...</p>
                <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
            </div>
        );
    }
    if (!currentUser) {
        right = (
            <div className="right">
                <Link href="/login" legacyBehavior>
                    <a data-active={isActive("/signup")}>Log in</a>
                </Link>
                <Link href="/signup" legacyBehavior>
                    <a data-active={isActive("/signup")}>Sign Up</a>
                </Link>
                <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
            </div>
        );
    }
    if (currentUser) {
        left = (
            <div className="left">
                <Link href="/" legacyBehavior>
                    <a className="bold" data-active={isActive("/")}>
                        Feed
                    </a>
                </Link>
                <Link href="/drafts" legacyBehavior>
                    <a data-active={isActive("/drafts")}>My drafts</a>
                </Link>
                <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
            </div>
        );
        right = (
            <div className="right">
                <p>
                    {currentUser.user?.username} ({currentUser.user?.email})
                </p>
                <Link href="/create" legacyBehavior>
                    <button>
                        <a>New post</a>
                    </button>
                </Link>
                <button onClick={() => Cookies.remove("CurrentUser")}>
                    <a>Log out</a>
                </button>
                <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
            </div>
        );
    }

    return (
        <nav>
            {left}
            {right}
            <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
        </nav>
    );
};

export default Header;
