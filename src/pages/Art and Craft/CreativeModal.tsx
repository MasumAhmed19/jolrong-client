
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCreativePostByIdentifierQuery } from "@/redux/api/creative/creative.api";
import { useEffect } from "react";

const CreativeModal = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // console.log("CreativeModal mounted. Slug:", slug);

    const { data: creativeData, isLoading } = useCreativePostByIdentifierQuery(slug as string, {
        skip: !slug,
    });

    // console.log("CreativeModal Data:", creativeData, "IsLoading:", isLoading, "Error:", error);

    const creative = creativeData?.data;

    const handleClose = () => {
        navigate("/art-and-craft");
    };

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    if (isLoading) {
        return <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 text-white backdrop-blur-sm">Loading...</div>;
    }

    if (!creative) {
        // console.log("No creative found for slug:", slug);
        return null; // Or show error
    }

    const { title, image, tags, content } = creative;
    const displayTag = tags && tags.length > 0 ? tags[0] : "Art";

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
            >
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] p-2 sm:p-3 bg-gray-900 hover:bg-gray-800 rounded-full transition-colors shadow-lg cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                    aria-label="Close preview"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>

                {/* Modal Content */}
                <motion.div
                    className="relative w-full h-full max-w-6xl flex flex-col items-center justify-center overflow-hidden"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image Container - Constraint Height */}
                    <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                        <img
                            src={image}
                            alt={title || "Creative Work"}
                            className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                        />
                    </div>

                    {/* Image details below - Fixed Height if needed or minimal */}
                    <div className="mt-4 sm:mt-6 text-center max-w-2xl flex-shrink-0">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full uppercase tracking-wide">
                                {displayTag}
                            </span>
                        </div>
                        <h3 className="text-gray-900 text-xl sm:text-2xl font-bold mb-2 line-clamp-2">
                            {title}
                        </h3>
                        {content && (
                            <div className="text-gray-600 text-sm max-h-20 overflow-y-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CreativeModal;
