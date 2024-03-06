import {WithId} from "mongodb";
import {SchoolProgram} from "@admin/types";
import {Button} from "flowbite-react";
import {FaApple} from "react-icons/fa6";
import {GiBanana, GiCherry, GiGrapes, GiWatermelon} from "react-icons/gi";
import {FaEgg, FaFish, FaHamburger, FaIceCream, FaKiwiBird} from "react-icons/fa";

type ProgramTabsProps = {
    programs: WithId<SchoolProgram>[]
}

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const removeProgramText = (program: string) => {
    return program.replace('Program', '');
}

const icons = [<FaApple key="fa-apple" className="w-auto h-auto mr-1"/>, <GiBanana key="fa-banana" className="w-auto h-auto mr-1"/>,
    <GiCherry key="gi-cherry" className="w-auto h-auto mr-1"/>, <GiWatermelon key="gi-watermelon" className="w-auto h-auto mr-1"/>,
    <FaEgg key="fa-egg" className="w-auto h-auto mr-1"/>, <FaFish key="fa-fish" className="w-auto h-auto mr-1"/>,
    <GiGrapes key="gi-grapes" className="w-auto h-auto mr-1"/>, <FaHamburger key="fa-hamburger" className="w-auto h-auto mr-1"/>,
    <FaIceCream key="fa-ice-cream" className="w-auto h-auto mr-1"/>, <FaKiwiBird key="fa-kiwi-bird" className="w-auto h-auto mr-1"/>,];

export const ProgramTabs = ({programs}: ProgramTabsProps) => {
    // Shuffle the array and select the first 7 icons
    const randomIcons = shuffleArray(icons).slice(0, 7);
    return <div className="flex justify-center">
        {programs?.map((program: SchoolProgram, index) => {
            return (<Button key={program.slug} href={`/programs/${program.slug}`} className='m-2 dark:bg-cyan-50' outline>
                {randomIcons[index]} {removeProgramText(program.name)}
            </Button>);
        })}
    </div>
}