import { Table } from "antd";
import { useContext, useEffect } from "react";

import { ModalContext } from "@cytology/core/contexts";
import { BETHESDA_CATEGORIES, getHighestProbIndex } from "@cytology/core/functions/highestProb";

import "./ViewProbs.css";

interface ViewProbsProps {
    probs: number[];
}

const ViewProbs: React.FC<ViewProbsProps> = ({ probs }) => {
    const { changeModalProps } = useContext(ModalContext);
    const highestIndex = getHighestProbIndex(probs);

    useEffect(() => {
        changeModalProps({
            title: "Новообразования",
            footer: [],
            centered: true,
        });
    }, []);

    return (
        <Table
            rowKey="key"
            rowHoverable={false}
            pagination={false}
            dataSource={probs.map((prob, index) => ({
                key: `Bethesda ${BETHESDA_CATEGORIES[index]}`,
                value: prob,
                title: `Bethesda ${BETHESDA_CATEGORIES[index]}`,
            }))}
            columns={[
                { title: "Категория", dataIndex: "title", key: "title" },
                { title: "Значение", dataIndex: "value", key: "value" },
            ]}
            rowClassName={(record) => (record.title === highestIndex ? "highlight-row" : "")}
        />
    );
};

export default ViewProbs;
