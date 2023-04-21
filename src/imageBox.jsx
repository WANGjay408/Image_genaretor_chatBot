import { Image } from "antd";

const ImageBox = ({ value }) => {
    // console.log(value);
    return (
        <div>
            <Image
                src={value}
                width= "200px"
                height= "200px"
                alt='respone'
            />
        </div>
    )
}

export default ImageBox;