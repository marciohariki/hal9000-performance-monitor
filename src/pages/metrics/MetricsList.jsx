import { Skeleton, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BaseLayout } from "../../components";
import { useListMetrics } from "../../services";
import { ROUTE_PATH } from "../../routes";

const MetricsListData = ({ data }) => {
  if (data.length === 0) {
    return <p>Não há métricas cadastradas</p>;
  }
  return (
    <ul>
      {data.map((i) => (
        <li>{i.name}</li>
      ))}
    </ul>
  );
};

const MetricsList = () => {
  const { data, loading } = useListMetrics();
  const history = useHistory();
  return (
    <BaseLayout>
      <S.Title>
        <h1>Métricas criadas</h1>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => history.push(ROUTE_PATH.METRICS.CREATE)}
        />
      </S.Title>
      {loading ? <Skeleton active /> : <MetricsListData data={data} />}
    </BaseLayout>
  );
};

const S = {
  Title: styled.div`
    display: flex;
    max-width: 250px;
    justify-content: space-between;
  `,
};
export default MetricsList;
