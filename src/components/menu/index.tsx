"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface MenuProps {
  hello?: boolean;
}

const Menu: React.FC<MenuProps> = () => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center">Music Quiz</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        <Button variant={"ghost"} asChild>
          <Link href={"/play"}>Play</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={"/leaderboard"}>Leaderboard</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={"/how-to-play"}>How to Play</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Menu;
