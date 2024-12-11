import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../app/features/product/productSlice";

export const RtkQuery = () => {
    const dispatch = useDispatch();

    // Access the correct state slice
    const storeInfo = useSelector((state) => state.storeInfo);

    // Ensure storeInfo exists before destructuring
    const { isLoading, posts, error } = storeInfo || {};

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Search state
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch posts on component mount
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // Filtered posts based on search query
    const filteredPosts = posts?.filter((post) =>
        post.brandName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate total pages based on filtered posts
    const totalPages = Math.ceil((filteredPosts?.length || 0) / itemsPerPage);

    // Get current page products
    const currentProducts = filteredPosts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle pagination change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-9">
            {/* Search Input */}
            <div className="mb-6 flex justify-start py-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by product name..."
                    className="border border-gray-300 rounded-md px-4 py-2 w-full lg:w-1/3"
                />
            </div>

            {isLoading && <h2>Loading...</h2>}
            {error && <h2>Error: {error}</h2>}

            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {currentProducts?.map((post) => (
                    <div key={post._id}>
                        <a href="#" className="relative block rounded-tr-3xl border border-gray-100 ">
                            <span
                                className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white"
                            >
                                Price {post.price}
                            </span>

                            <img
                                src={post.productImage}
                                alt=""
                                className="-ml-6 -mt-6 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
                            />

                            <div className="p-4 text-center">
                                <div className="flex justify-between items-center">
                                    <strong className="text-xl font-medium text-gray-900">{post.brandName}</strong>
                                    <strong className="text-xl font-medium text-gray-900">{post.category}</strong>
                                </div>
                                <p className="mt-2 text-pretty text-gray-700">
                                    {post.description.slice(0,50    )}....
                                </p>

                                <span
                                    className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
                                >
                                    Learn More
                                </span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === index + 1
                                ? "bg-indigo-900 text-white"
                                : "bg-gray-200 text-gray-900"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
