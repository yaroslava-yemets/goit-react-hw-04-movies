import { Redirect } from 'react-router-dom';

export default function NoSuchPageView () {
    return (
        <>
            <p>404 Sorry but such page doesn't exist</p>
            <Redirect to={"/"} />
        </>
    )
};