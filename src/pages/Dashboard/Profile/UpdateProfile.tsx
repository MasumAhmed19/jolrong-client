import { useState } from "react";
import { useUpdateProfileMutation, useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SOCIAL_PLATFORMS = [
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Instagram",
    "GitHub",
    "Website",
    "YouTube",
    "TikTok",
    "Pinterest",
    "Behance",
    "Dribbble",
];

const UpdateProfile = () => {
    const { data: userInfo } = useUserInfoQuery({});
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const user = userInfo?.data;

    const [formData, setFormData] = useState<{
        name: string;
        profilePic: string;
        aboutMe: string;
        education: string;
        socialLinks: { platform: string; url: string }[];
    }>({
        name: user?.name || "",
        profilePic: user?.profilePic || "",
        aboutMe: user?.aboutMe || "",
        education: user?.education || "",
        socialLinks: user?.socialLinks || [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddSocialLink = () => {
        setFormData((prev) => ({
            ...prev,
            socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
        }));
    };

    const handleRemoveSocialLink = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            socialLinks: prev.socialLinks.filter((_, i) => i !== index),
        }));
    };

    const handleSocialLinkChange = (index: number, field: "platform" | "url", value: string) => {
        setFormData((prev) => ({
            ...prev,
            socialLinks: prev.socialLinks.map((link, i) =>
                i === index ? { ...link, [field]: value } : link
            ),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Filter out empty social links
        const filteredSocialLinks = formData.socialLinks.filter(
            (link) => link.platform && link.url
        );

        try {
            await updateProfile({
                ...formData,
                socialLinks: filteredSocialLinks,
            }).unwrap();
            toast.success("Profile updated successfully");
        } catch (err: any) {
            // console.error(err);
            toast.error(err?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Update Profile</h1>
                <p className="text-muted-foreground">
                    Update your personal information and social links.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Your name and profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profilePic">Profile Picture URL</Label>
                            <Input
                                id="profilePic"
                                name="profilePic"
                                type="url"
                                placeholder="https://example.com/profile.jpg"
                                value={formData.profilePic}
                                onChange={handleInputChange}
                            />
                            {formData.profilePic && (
                                <div className="mt-2">
                                    <img
                                        src={formData.profilePic}
                                        alt="Profile preview"
                                        className="h-24 w-24 rounded-full object-cover border"
                                        onError={() => toast.error("Invalid image URL")}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="aboutMe">About Me</Label>
                            <Textarea
                                id="aboutMe"
                                name="aboutMe"
                                placeholder="Tell us about yourself..."
                                rows={4}
                                value={formData.aboutMe}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="education">Education</Label>
                            <Input
                                id="education"
                                name="education"
                                type="text"
                                placeholder="Your education background"
                                value={formData.education}
                                onChange={handleInputChange}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Social Links</CardTitle>
                                <CardDescription>Your social media profiles</CardDescription>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddSocialLink}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Link
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {formData.socialLinks.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No social links added yet. Click "Add Link" to get started.
                            </p>
                        ) : (
                            formData.socialLinks.map((link, index) => (
                                <div key={index} className="flex gap-3 items-start">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor={`platform-${index}`}>Platform</Label>
                                            <Select
                                                value={link.platform}
                                                onValueChange={(value) =>
                                                    handleSocialLinkChange(index, "platform", value)
                                                }
                                            >
                                                <SelectTrigger id={`platform-${index}`}>
                                                    <SelectValue placeholder="Select platform" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {SOCIAL_PLATFORMS.map((platform) => (
                                                        <SelectItem key={platform} value={platform}>
                                                            {platform}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`url-${index}`}>URL</Label>
                                            <Input
                                                id={`url-${index}`}
                                                type="url"
                                                placeholder="https://example.com/profile"
                                                value={link.url}
                                                onChange={(e) =>
                                                    handleSocialLinkChange(index, "url", e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveSocialLink(index)}
                                        className="mt-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Updating..." : "Update Profile"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;