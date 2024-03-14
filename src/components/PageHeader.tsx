export const PageHeader = (props: { title: string }) => {
    return <div className="pt-20 pb-4">
        <h1 className="text-4xl font-bold text-cyan-800 dark:text-cyan-50">{props.title}</h1>
        <div
            className="h-1 w-10 bg-cyan-800 rounded dark:bg-cyan-50"></div>
    </div>
}