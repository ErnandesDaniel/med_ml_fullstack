import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Flex, Typography, Button } from "antd";
import { EditOutlined, HistoryOutlined } from "@ant-design/icons";
import { skipToken } from "@reduxjs/toolkit/query";

import DiagnosisCard from "@cytology/common/DiagnosisCard/DiagnosisCard";

import { IGroupedSegments, SegmentType } from "@cytology/core/types/segments";
import { useGetCytologyHistoryQuery } from "@cytology/core/service/cytology";
import { useAppSelector } from "@cytology/core/hooks";
import { ModalContext } from "@cytology/core/contexts";

import CytologyInfo from "./CytologyInfo/CytologyInfo";

import "./CytologyDiagnosis.css";
import CytologyHistory from "./CytologyHistory/CytologyHistory";

const { Text } = Typography;

interface ICytologyDiagnosisProps {
    segments: IGroupedSegments[];
    openEdit: () => void;
    onClickCard: (newValue: SegmentType) => void;
    currentSegment: SegmentType | null;
}

const CytologyDiagnosis: React.FC<ICytologyDiagnosisProps> = ({
    segments,
    openEdit,
    onClickCard,
    currentSegment,
}) => {
    const { open } = useContext(ModalContext);

    const cytologyId = useAppSelector((state) => state.cytology.cytologyId);
    const acessToken = useAppSelector((state) => state.auth.accessToken);

    const { data: historyData } = useGetCytologyHistoryQuery(acessToken ? cytologyId : skipToken);
    const historyDataRef = useRef(historyData);

    useEffect(() => {
        historyDataRef.current = historyData;
    }, [historyData]);

    const handleOpenHistory = useCallback(() => {
        if (historyDataRef.current) {
            open({
                content: <CytologyHistory history={historyDataRef.current} />,
            });
        }
    }, [historyDataRef]);

    return (
        <Flex vertical className="cytology-diagnosis-wrapper">
            <CytologyInfo />
            <Flex vertical gap={5} className="cytology-diagnosis-cards-wrapper">
                {segments.map((segment) => (
                    <DiagnosisCard
                        segmentType={segment.seg_type}
                        isActive={currentSegment === segment.seg_type}
                        onClick={() => onClickCard(segment.seg_type)}
                        needSpecialistTitle
                        key={segment.seg_type}
                    />
                ))}
            </Flex>
            <Button className="cytology-diagnosis-edit" type="default" onClick={handleOpenHistory}>
                <Flex gap={10} align="center">
                    <Text className="text-inherit">История изменений</Text>
                    <HistoryOutlined />
                </Flex>
            </Button>
            <Button className="cytology-diagnosis-edit" type="primary" onClick={openEdit}>
                <Flex gap={10} align="center">
                    <Text className="text-inherit">Редактировать</Text>
                    <EditOutlined />
                </Flex>
            </Button>
        </Flex>
    );
};

export default CytologyDiagnosis;
