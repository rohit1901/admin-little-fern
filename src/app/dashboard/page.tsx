import {getHomePageData} from "@admin/lib/homePage";
import {Fragment} from "react";
import {Button} from "flowbite-react";
import {HomePageData} from "@admin/types";
import {WithoutId} from "mongodb";

const Dashboard = async () => {
    const homePageData: WithoutId<HomePageData> = await getHomePageData()
    return (
        <Fragment>
            <Button href="/dashboard"
                    className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'>Welcome
                to your Dashboard, bitch!</Button>
        </Fragment>
    )
}
export default Dashboard