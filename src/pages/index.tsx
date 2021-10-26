import CardList from '@/components/CardList/CardList';
import MainLayout from '@/components/MainLayout/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import cookie from 'cookie';
import { getSession, useSession } from 'next-auth/client';

const Index: NextPage = ({ postsData }) => {
    console.log(`postsData `, postsData);
    return (
        <MainLayout>
            {postsData && <h3>{postsData[0].data.title}</h3>}
            <CardList />
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const session = await getSession(ctx);
    // console.log(`index `, session);

    if (session) {
        const resp = await fetch('https://oauth.reddit.com/best.json?limit=7&sr_detail=true', {
            headers: {
                Authorization: `bearer ${session.accessToken}`,
            },
        });
        const postsData = await resp.json();
        console.log(2);
        return {
            props: { postsData: postsData.data.children },
        };
    }

    return {
        props: { postsData: null },
    };
};

// const basicAuth = Buffer.from(`${process.env.USER_ID}:sNGEj6X7Uxevyrbf8nuvVTfXVHx22g`).toString('base64');

// export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
//     const response = await fetch('https://www.reddit.com/api/v1/access_token', {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Basic ' + basicAuth,
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `grant_type=authorization_code&code=${query.code}&redirect_uri=http://localhost:8080`,
//     });

//     const tk = await response.json();

//     if (tk.access_token) {
//         res.setHeader(
//             'Set-Cookie',
//             cookie.serialize('access_token', tk.access_token, {
//                 // httpOnly: true,
//                 secure: process.env.NODE_ENV !== 'development',
//                 maxAge: 3600,
//                 sameSite: 'strict',
//                 path: './',
//             })
//         );
//     }

//     return {
//         props: { token: tk.access_token || null },
//     };
// };

export default Index;
