import { useState } from "react";
import { useChangePasswordMutation } from "@/redux/api/auth/auth.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }

        if (formData.oldPassword === formData.newPassword) {
            toast.error("New password must be different from old password");
            return;
        }

        try {
            await changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            }).unwrap();

            toast.success("Password changed successfully");

            // Reset form
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (err: any) {
            // console.error(err);
            toast.error(err?.data?.message || "Failed to change password");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Change Password</h1>
                <p className="text-muted-foreground">
                    Update your password to keep your account secure.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Password Settings</CardTitle>
                    <CardDescription>
                        Enter your current password and choose a new one
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Old Password */}
                        <div className="space-y-2">
                            <Label htmlFor="oldPassword">Current Password *</Label>
                            <div className="relative">
                                <Input
                                    id="oldPassword"
                                    name="oldPassword"
                                    type={showPasswords.old ? "text" : "password"}
                                    placeholder="Enter your current password"
                                    value={formData.oldPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility("old")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.old ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password *</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPasswords.new ? "text" : "password"}
                                    placeholder="Enter your new password"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility("new")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.new ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Must be at least 6 characters
                            </p>
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPasswords.confirm ? "text" : "password"}
                                    placeholder="Confirm your new password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility("confirm")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.confirm ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password strength indicator */}
                        {formData.newPassword && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Password Strength:</p>
                                <div className="flex gap-1">
                                    <div
                                        className={`h-2 flex-1 rounded ${formData.newPassword.length >= 6
                                                ? "bg-green-500"
                                                : "bg-gray-200"
                                            }`}
                                    />
                                    <div
                                        className={`h-2 flex-1 rounded ${formData.newPassword.length >= 8
                                                ? "bg-green-500"
                                                : "bg-gray-200"
                                            }`}
                                    />
                                    <div
                                        className={`h-2 flex-1 rounded ${formData.newPassword.length >= 10 &&
                                                /[A-Z]/.test(formData.newPassword) &&
                                                /[0-9]/.test(formData.newPassword)
                                                ? "bg-green-500"
                                                : "bg-gray-200"
                                            }`}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Changing..." : "Change Password"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Security Tips */}
            <Card>
                <CardHeader>
                    <CardTitle>Security Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Use a strong, unique password for your account</li>
                        <li>• Include uppercase and lowercase letters, numbers, and symbols</li>
                        <li>• Avoid using personal information or common words</li>
                        <li>• Change your password regularly</li>
                        <li>• Never share your password with anyone</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePassword;