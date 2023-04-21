import { Radio, Space } from "antd";

const OptionBox = ({ extendList, onChange }) => {

    return (
        <div>
            <p>The following extensions are provided for keywords: </p><br />
            <Radio.Group onChange={onChange}>
                <Space direction="vertical">
                    <Radio value={extendList.prompt_res_1}>
                        <p>1: {extendList.prompt_res_1}</p>
                    </Radio>
                    <Radio value={extendList.prompt_res_2}>
                        <p>2: {extendList.prompt_res_2}</p>
                    </Radio>
                    <Radio value={extendList.prompt_res_3}>
                        <p>3: {extendList.prompt_res_3}</p>
                    </Radio>
                    <Radio value={extendList.prompt_res_4}>
                        <p>4: {extendList.prompt_res_4}</p>
                    </Radio>
                    <Radio value={extendList.prompt_res_5}>
                        <p>5: {extendList.prompt_res_5}</p>
                    </Radio>
                </Space>
            </Radio.Group>
            <p>You can choose the option described above.</p>
        </div>
    )
}

export default OptionBox;