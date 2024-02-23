import {getHomePageData} from "@admin/lib/homePage";
import {Fragment} from "react";
import HomePageComponent from "@admin/components/HomePageComponent";
import {Button} from "flowbite-react";

const Dashboard = async () => {
    const homePageData: HomePageComponent = await getHomePageData()
    // Convert homePageData to a plain object
    const plainHomePageData: HomePageComponent = JSON.parse(JSON.stringify(homePageData));
    return (
        <Fragment>
            <Button href="/dashboard"
                    className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'>Welcome
                to your Dashboard, bitch!</Button>
        </Fragment>
    )
}
export default Dashboard