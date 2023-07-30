import Link from "next/link";


const AddButton = () => {
    return (
        <div>
            <Link href={'/addform'} className="flex items-center justify-end">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-28  rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Add +
                </button>
            </Link>
        </div>
    )
}

export default AddButton;