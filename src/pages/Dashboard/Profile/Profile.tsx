import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import {
    Edit,
    Mail,
    GraduationCap,
    Shield,
    CheckCircle,
    XCircle,
    ExternalLink,
    Lock
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
    const { data: userInfo, isLoading } = useUserInfoQuery({});

    const user = userInfo?.data;

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Unable to load profile information.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                    <p className="text-muted-foreground">
                        View and manage your account information
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link to="/dashboard/change-password">
                        <Button variant="outline">
                            <Lock className="mr-2 h-4 w-4" />
                            Change Password
                        </Button>
                    </Link>
                    <Link to="/dashboard/profile/edit">
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Profile Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your personal details and account status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Avatar and Basic Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.profilePic} alt={user.name} className="object-cover" />
                            <AvatarFallback className="text-2xl">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-2xl font-semibold">{user.name}</h2>
                                {user.isVerified ? (
                                    <Badge variant="default" className="flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" />
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        <XCircle className="h-3 w-3" />
                                        Not Verified
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <Badge variant="outline">{user.role || "USER"}</Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Additional Information */}
                    <div className="grid gap-6">
                        {/* Education */}
                        {user.education && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <GraduationCap className="h-4 w-4" />
                                    Education
                                </div>
                                <p className="text-muted-foreground pl-6">{user.education}</p>
                            </div>
                        )}

                        {/* About Me */}
                        {user.aboutMe && (
                            <div className="space-y-2">
                                <div className="text-sm font-medium">About Me</div>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {user.aboutMe}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Social Links */}
            {user.socialLinks && user.socialLinks.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Social Links</CardTitle>
                        <CardDescription>Your connected social profiles</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.socialLinks.map((link: { platform: string; url: string }, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                            {link.platform[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium">{link.platform}</p>
                                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                {link.url}
                                            </p>
                                        </div>
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Account Settings Quick Links */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common account management tasks</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/dashboard/profile/edit">
                            <Button variant="outline" className="w-full justify-start">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </Link>
                        <Link to="/dashboard/change-password">
                            <Button variant="outline" className="w-full justify-start">
                                <Lock className="mr-2 h-4 w-4" />
                                Change Password
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;