"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignIn: React.FC = () => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center text-4xl">Sign In</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SignIn;
