import {Fragment} from "react";
import {Button} from "flowbite-react";

const Dashboard = async () => {
    return (
        <Fragment>
            <Button href="/dashboard"
                    className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'>Welcome
                to your Dashboard, bitch!</Button>
        </Fragment>
    )
}
export default Dashboard