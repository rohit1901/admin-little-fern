export const PageHeader = (props: { title: string }) => {
    return <div className="pt-20 pb-4">
        <h1 className="text-4xl font-bold text-cyan-700 dark:text-white">{props.title}</h1>
        <div
            className="h-1 w-10 bg-cyan-700 rounded hover:bg-cyan-500 dark:bg-cyan-50 dark:hover:bg-cyan-500"></div>
    </div>
}