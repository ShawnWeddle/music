"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <CardContent className="flex flex-col items-center">
        <button className="whitespace-nowrap rounded-md w-min p-1 m-1 font-bold text-2xl hover:bg-accent hover:text-accent-foreground disabled:text-accent/50">
          <Link href={"/practice"}>Practice</Link>
        </button>
        <button
          disabled
          className="whitespace-nowrap rounded-md w-min p-1 m-1 font-bold text-2xl disabled:text-foreground/50"
        >
          Quiz
        </button>
        <button className="whitespace-nowrap rounded-md w-min p-1 m-1 font-bold text-2xl hover:bg-accent hover:text-accent-foreground disabled:text-accent/50">
          <Link href={"/leaderboard"}>Leaderboard</Link>
        </button>
        <button className="whitespace-nowrap rounded-md w-min p-1 m-1 font-bold text-2xl hover:bg-accent hover:text-accent-foreground disabled:text-accent/50">
          <Link href={"/how-to-play"}>How to Play</Link>
        </button>
        <button className="whitespace-nowrap rounded-md w-min p-1 m-1 font-bold text-2xl hover:bg-accent hover:text-accent-foreground disabled:text-accent/50">
          <Link href={"/sign-in"}>Sign In</Link>
        </button>
      </CardContent>
    </Card>
  );
};

export default Menu;
