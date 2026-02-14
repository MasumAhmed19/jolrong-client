import { useState } from "react";
import { Link } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus, Search, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAllCreativePostsQuery, useDeleteCreativePostMutation } from "@/redux/api/creative/creative.api";
import PaginationModule from "@/components/Modules/Gallery/PaginationModule";

const PAGE_LIMIT = 10;

const AllCreativeDashboard = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const { data: creativeData, isLoading } = useAllCreativePostsQuery({
        page,
        limit: PAGE_LIMIT,
        search: debouncedSearch,
    });

    const [deleteCreativePost] = useDeleteCreativePostMutation();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        // Simple debounce logic could be improved with a custom hook
        setTimeout(() => {
            setDebouncedSearch(e.target.value);
            setPage(1);
        }, 500);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCreativePost(id).unwrap();
            toast.success("Post deleted successfully");
        } catch (err) {
            console.error(err)
            toast.error("Failed to delete post");
        }
    };

    const meta = creativeData?.meta;
    const totalPages = meta?.totalPages || 1;

    // Calculate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Creative Posts</h1>
                    <p className="text-muted-foreground">
                        Manage your art and craft portfolio items.
                    </p>
                </div>
                <Link to="/dashboard/creative/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New Post
                    </Button>
                </Link>
            </div>

            {/* Search Filter */}
            {/* <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search posts..."
                    value={search}
                    onChange={handleSearch}
                    className="border-0 focus-visible:ring-0"
                />
            </div> */}

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : creativeData?.data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No creative posts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            creativeData?.data.map((post) => (
                                <TableRow key={post._id}>
                                    <TableCell>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-12 w-12 rounded object-cover"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags?.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {post.isPublic ? (
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-green-100 text-green-800">
                                                Public
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-yellow-100 text-yellow-800">
                                                Draft
                                            </span>
                                        )}
                                        {post.isFeatured && (
                                            <span className="ml-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-blue-100 text-blue-800">
                                                Featured
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/art-and-craft`} target="_blank">
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link to={`/dashboard/creative/edit/${post._id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the post
                                                            "{post.title}" and remove it from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(post._id)}
                                                            className="bg-red-500 hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <PaginationModule
                page={page}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                setPage={setPage}
            />
        </div>
    );
};

export default AllCreativeDashboard;
