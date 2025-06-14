import Image from "next/image";
import directionIcon from "../assets/directions-transit.png";

export default function TransitIcon() {
  return (
    <div>
      <Image src={directionIcon} width={24} height={24} alt="transit" />
    </div>
  );
}
