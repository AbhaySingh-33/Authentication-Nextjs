export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl mt-4 mx-2">
                Profile 
                <span className="p-1 rounded bg-orange-500 text-black">
                    {params.id}
                </span>
            </p>
        </div>
    )
}