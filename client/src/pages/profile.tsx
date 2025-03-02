import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
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
} from "@/src/components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { passwordFormSchema, profileFormSchema } from "../schemas";
import { User as UserType } from "../@types";
import { formatDate } from "../lib/utils";

// Mock user data for demonstration
const mockUser = {
  id: "user-123",
  name: "John Appleseed",
  password: "hashedpassword123",
  avatar: "/api/placeholder/64/64",
  verified: false, // Set to false for testing verification UI
  email: "john.appleseed@example.com",
  isAdmin: false, // Set to true to test admin badge
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2024-02-20"),
};

// Form validation schemas

export default function ProfilePage() {
  const [user, setUser] = useState<UserType>(mockUser);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const profileForm = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUser = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setUser(mockUser);
          profileForm.reset({
            name: mockUser.name,
            email: mockUser.email,
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [profileForm]);

  const onProfileSubmit = async (data: { name: string; email: string }) => {
    try {
      // Simulate API call to update profile
      setLoading(true);

      // In a real app, this would be an API call
      setTimeout(() => {
        setUser({
          ...user,
          name: data.name,
          email: data.email,
          updatedAt: new Date(),
        });
        setLoading(false);
        setIsEditMode(false);
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      console.log(data);
      setTimeout(() => {
        setUser({
          ...user,
          password: "newhashpassword123",
          updatedAt: new Date(),
        });
        setLoading(false);
        passwordForm.reset({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }, 1000);
    } catch (error) {
      console.error("Error updating password:", error);
      setLoading(false);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      setIsVerifying(true);

      // Simulate API call to send verification email
      setTimeout(() => {
        setIsVerifying(false);
        setVerificationSent(true);
      }, 1500);
    } catch (error) {
      console.error("Error sending verification email:", error);
      setIsVerifying(false);
    }
  };

  // Loading state
  if (loading && !user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-6">
            <div className="h-8 w-40 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Updating...</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Apple ID</h1>
        <p className="text-gray-500">
          Manage your Apple ID and account settings
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
            <AvatarImage
              src={user?.avatar || "/api/placeholder/64/64"}
              alt={user?.name}
            />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          {user?.isAdmin && (
            <div className="absolute -bottom-2 -right-2">
              <Badge className="bg-blue-600">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            </div>
          )}
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-medium">{user?.name}</h2>
          <div className="flex flex-col md:flex-row md:items-center text-gray-500 space-y-1 md:space-y-0 md:space-x-2">
            <span>{user?.email}</span>
            {user?.verified ? (
              <Badge
                variant="outline"
                className="text-green-600 border-green-200 bg-green-50"
              >
                <CheckCircle className="h-3 w-3 mr-1" /> Verified
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-amber-600 border-amber-200 bg-amber-50"
              >
                <AlertCircle className="h-3 w-3 mr-1" /> Unverified
              </Badge>
            )}
          </div>
          <div className="text-gray-400 text-sm mt-1">
            Member since {formatDate(user?.createdAt)}
          </div>
        </div>
      </div>

      {!user?.verified && (
        <Card className="mb-8 border-amber-200">
          <CardHeader className="bg-amber-50">
            <CardTitle className="text-amber-800 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-amber-700">
              Please verify your email address to gain full access to all
              features.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {verificationSent ? (
              <div className="text-gray-700">
                <p className="mb-2">
                  A verification email has been sent to{" "}
                  <strong>{user?.email}</strong>.
                </p>
                <p>
                  Please check your inbox and follow the instructions to
                  complete verification.
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-4">
                  We'll send a verification link to your email address{" "}
                  {user?.email}.
                </p>
                <Button
                  onClick={sendVerificationEmail}
                  disabled={isVerifying}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isVerifying ? "Sending..." : "Send Verification Email"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="text-sm">
            Profile Information
          </TabsTrigger>
          <TabsTrigger value="security" className="text-sm">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Profile Information</CardTitle>
                {!isEditMode && (
                  <Button variant="outline" onClick={() => setIsEditMode(true)}>
                    Edit
                  </Button>
                )}
              </div>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditMode ? (
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email address"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Changing your email will require re-verification.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <User className="text-gray-400 h-5 w-5" />
                      <h3 className="text-sm font-medium text-gray-500">
                        Name
                      </h3>
                    </div>
                    <p className="text-gray-900 pl-8">{user?.name}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <Mail className="text-gray-400 h-5 w-5" />
                      <h3 className="text-sm font-medium text-gray-500">
                        Email
                      </h3>
                    </div>
                    <p className="text-gray-900 pl-8">{user?.email}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <Calendar className="text-gray-400 h-5 w-5" />
                      <h3 className="text-sm font-medium text-gray-500">
                        Account Created
                      </h3>
                    </div>
                    <p className="text-gray-900 pl-8">
                      {formatDate(user?.createdAt)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <Calendar className="text-gray-400 h-5 w-5" />
                      <h3 className="text-sm font-medium text-gray-500">
                        Last Updated
                      </h3>
                    </div>
                    <p className="text-gray-900 pl-8">
                      {formatDate(user?.updatedAt)}
                    </p>
                  </div>

                  {user?.isAdmin && (
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <Shield className="text-gray-400 h-5 w-5" />
                        <h3 className="text-sm font-medium text-gray-500">
                          Admin Status
                        </h3>
                      </div>
                      <div className="pl-8">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-600 border-blue-200"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Administrator
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Your current password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Your new password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters and include
                            uppercase, lowercase, numbers, and special
                            characters.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm your new password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Update Password
                    </Button>
                  </form>
                </Form>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                <div className="space-y-4 space-x-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Sign Out of All Devices
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Sign Out of All Devices?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will sign you out from all devices where you're
                          currently logged in. You'll need to sign in again on
                          each device.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Sign Out of All Devices
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
