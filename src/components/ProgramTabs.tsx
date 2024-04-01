'use client'
import {WithId} from "mongodb";
import {SchoolProgram, SchoolProgramsBlock} from "@admin/types";
import {Button} from "flowbite-react";
import {FaApple} from "react-icons/fa6";
import {GiBanana, GiCherry, GiGrapes, GiWatermelon} from "react-icons/gi";
import {FaEgg, FaFish, FaHamburger, FaIceCream, FaKiwiBird} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useSchoolProgramsPageStore} from "@admin/store";
import {API_PROGRAMS_GET} from "@admin/lib/constants";

type ProgramTabsProps = {
    programs: WithId<SchoolProgram>[]
}

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
    array.forEach((item, index) => {
        const j = Math.floor(Math.random() * (index + 1));
        [array[index], array[j]] = [array[j], array[index]];
    });
    return array;
}

const removeProgramText = (program: string) => {
    return program.replace('Program', '');
}

const icons = [
    <FaApple key="fa-apple" className="w-auto h-auto mr-1"/>,
    <GiBanana key="fa-banana" className="w-auto h-auto mr-1"/>,
    <GiCherry key="gi-cherry" className="w-auto h-auto mr-1"/>,
    <GiWatermelon key="gi-watermelon" className="w-auto h-auto mr-1"/>,
    <FaEgg key="fa-egg" className="w-auto h-auto mr-1"/>,
    <FaFish key="fa-fish" className="w-auto h-auto mr-1"/>,
    <GiGrapes key="gi-grapes" className="w-auto h-auto mr-1"/>,
    <FaHamburger key="fa-hamburger" className="w-auto h-auto mr-1"/>,
    <FaIceCream key="fa-ice-cream" className="w-auto h-auto mr-1"/>,
    <FaKiwiBird key="fa-kiwi-bird" className="w-auto h-auto mr-1"/>,
];

export const ProgramTabs = () => {
    const [randomIcons, setRandomIcons] = useState(icons);
    const {programs, setHeading, setPrograms} = useSchoolProgramsPageStore()
    useEffect(() => {
        if (!programs || programs.length === 0) {
            fetch(API_PROGRAMS_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json()).then((data) => {
                const block: WithId<SchoolProgramsBlock> = data.body as WithId<SchoolProgramsBlock>;
                setPrograms(block?.schoolPrograms ?? []);
                setHeading(block?.heading ?? '');
            }).catch((error) => {
                console.error('Error fetching programs', error);
            });
        }
        // Shuffle the array and select the first 7 icons
        setRandomIcons(shuffleArray(icons).slice(0, programs.length));
    }, [programs]);
    return <div className="flex justify-center">
        {programs?.map((program: SchoolProgram, index) => {
            return (<Button key={program.slug} href={`/programs/${program.slug}`} className='m-2' outline>
                {randomIcons[index]} {removeProgramText(program.name)}
            </Button>);
        })}
    </div>
}