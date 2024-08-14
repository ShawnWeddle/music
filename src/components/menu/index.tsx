"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MenuProps {
  hello?: boolean;
}

const Menu: React.FC<MenuProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Music Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div>PLAY</div>
        <div>Leaderboard</div>
        <div>How to Play</div>
        <div>SIGN IN</div>
      </CardContent>
    </Card>
  );
};

export default Menu;
