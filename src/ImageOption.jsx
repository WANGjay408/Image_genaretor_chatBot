import { Radio, Space } from "antd";

const ImageOption = ({onChange}) => {
    return (
        <div>
            <p>Please choose the picture you like: </p><br />
            <Radio.Group onChange={onChange}>
                <Space direction="vertical">
                    <Radio value={1}>
                        <p>Top Left Picture</p><br />
                    </Radio>
                    <Radio value={2}>
                        <p>Top Right Picture</p><br />
                    </Radio>
                    <Radio value={3}>
                        <p>Bottom Left Picture</p><br />
                    </Radio>
                    <Radio value={4}>
                        <p>Bottom Right Picture</p><br />
                    </Radio>
                    <Radio value={5}>
                        <p>Not satisfied, Create a new picture group</p><br />
                    </Radio>
                </Space>
            </Radio.Group>
            <p>You can choose the option above.</p>
        </div>
    )
}

export default ImageOption;