import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGetAllSlidersQuery, useReorderSlidersMutation, type ISlider } from "@/redux/api/slider/slider.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GripVertical } from "lucide-react";
import { Link } from "react-router";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableSliderItemProps {
    slider: ISlider;
    index: number;
}

function SortableSliderItem({ slider, index }: SortableSliderItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: slider._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-4 p-4 bg-white border rounded-lg hover:bg-gray-50"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing"
            >
                <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium">
                    {index + 1}
                </div>
                <img
                    src={slider.imageUrl}
                    alt={`Slider ${slider.order}`}
                    className="h-16 w-28 rounded object-cover"
                />
                <div className="flex-1">
                    <p className="text-sm font-medium">Order: {slider.order}</p>
                    <p className="text-xs text-muted-foreground">
                        {slider.isActive ? (
                            <span className="text-green-600">Active</span>
                        ) : (
                            <span className="text-gray-600">Inactive</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

const ReorderSlider = () => {
    const navigate = useNavigate();
    const { data: sliderData, isLoading } = useGetAllSlidersQuery();
    const [reorderSliders, { isLoading: isReordering }] = useReorderSlidersMutation();

    const [sliders, setSliders] = useState<ISlider[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (sliderData?.data) {
            // Sort by current order
            const sorted = [...sliderData.data].sort((a, b) => a.order - b.order);
            setSliders(sorted);
        }
    }, [sliderData]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSliders((items) => {
                const oldIndex = items.findIndex((item) => item._id === active.id);
                const newIndex = items.findIndex((item) => item._id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSave = async () => {
        try {
            // Extract IDs in new order
            const ids = sliders.map((slider) => slider._id);

            await reorderSliders({ ids }).unwrap();
            toast.success("Sliders reordered successfully");
            navigate("/dashboard/slider");
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to reorder sliders");
        }
    };

    const hasChanges = sliderData?.data
        ? JSON.stringify(sliders.map(s => s._id)) !==
        JSON.stringify([...sliderData.data].sort((a, b) => a.order - b.order).map(s => s._id))
        : false;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/slider">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Reorder Sliders</h1>
                    <p className="text-muted-foreground">
                        Drag and drop to change the order of sliders.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Slider Order</CardTitle>
                    <CardDescription>
                        Drag the sliders to rearrange them. The order will be reflected on your homepage.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : sliders.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No sliders found. Create one first.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={sliders.map((s) => s._id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-2">
                                        {sliders.map((slider, index) => (
                                            <SortableSliderItem
                                                key={slider._id}
                                                slider={slider}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    onClick={handleSave}
                                    disabled={isReordering || !hasChanges}
                                >
                                    {isReordering ? "Saving..." : "Save Order"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/dashboard/slider")}
                                >
                                    Cancel
                                </Button>
                            </div>

                            {hasChanges && (
                                <p className="text-sm text-amber-600">
                                    You have unsaved changes. Click "Save Order" to apply them.
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ReorderSlider;