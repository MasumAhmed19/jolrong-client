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
import { Trash2, Plus, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { useGetAllSlidersQuery, useDeleteSliderMutation, useUpdateSliderMutation } from "@/redux/api/slider/slider.api";
import { Switch } from "@/components/ui/switch";

const AllSlider = () => {
    const { data: sliderData, isLoading } = useGetAllSlidersQuery();
    const [deleteSlider] = useDeleteSliderMutation();
    const [updateSlider] = useUpdateSliderMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteSlider(id).unwrap();
            toast.success("Slider deleted successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete slider");
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await updateSlider({ id, data: { isActive: !currentStatus } }).unwrap();
            toast.success(`Slider ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update slider status");
        }
    };

    // Sort sliders by order
    const sortedSliders = sliderData?.data ? [...sliderData.data].sort((a, b) => a.order - b.order) : [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sliders</h1>
                    <p className="text-muted-foreground">
                        Manage your homepage slider images.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link to="/dashboard/slider/reorder">
                        <Button variant="outline">
                            <ArrowUpDown className="mr-2 h-4 w-4" /> Reorder
                        </Button>
                    </Link>
                    <Link to="/dashboard/slider/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Slider
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
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
                        ) : sortedSliders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No sliders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedSliders.map((slider) => (
                                <TableRow key={slider._id}>
                                    <TableCell className="font-medium">{slider.order}</TableCell>
                                    <TableCell>
                                        <img
                                            src={slider.imageUrl}
                                            alt={`Slider ${slider.order}`}
                                            className="h-16 w-28 rounded object-cover"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={slider.isActive}
                                                onCheckedChange={() => handleToggleActive(slider._id, slider.isActive)}
                                            />
                                            <span className="text-sm">
                                                {slider.isActive ? (
                                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-gray-100 text-gray-800">
                                                        Inactive
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(slider.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
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
                                                            This action cannot be undone. This will permanently delete the slider
                                                            and remove it from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(slider._id)}
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
        </div>
    );
};

export default AllSlider;