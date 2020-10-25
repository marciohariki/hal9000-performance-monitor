import { Form, Input, Button } from "antd";
import { BaseLayout } from "../../components";
import { useCreateMetric } from "../../services";
import { useHistory } from "react-router-dom";
import { ROUTE_PATH } from "../../routes";

const MetricsCreate = () => {
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 8 },
  };
  const { createMetric, loading } = useCreateMetric();
  const history = useHistory();
  const onFinish = async (values) => {
    await createMetric(values);
    history.push(ROUTE_PATH.METRICS.LIST);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <BaseLayout>
      <h1>Criação de Métricas</h1>
      <Form
        {...layout}
        layout="horizontal"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nome da Métrica"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </BaseLayout>
  );
};

export default MetricsCreate;
