import { Button } from "@/components/ui/button"

interface HeaderProps {
  memberName?: string;
  memberImage?: string;
  onClick?:() => void;
}

export const Header = ({ memberName = "Member", memberImage, onClick }: HeaderProps) => {
  const avatarFallback = memberName.charAt(0).toUpperCase();

  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden ">
      <Button></Button>
    </div>
  )
}