import {getImageUrl} from "@admin/lib";
import Image, {ImageProps} from "next/image";

const Logo = (props: Partial<ImageProps>) => {
    return <Image width={props.width ?? '70'} height={props.height ?? '10'} className="h-auto"
                  src={getImageUrl('/images/bright-logo.jpg')}
                  alt="logo"/>
}
export default Logo;