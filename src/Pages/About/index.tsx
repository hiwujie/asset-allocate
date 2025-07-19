import { Typography, Card, Row, Col, Timeline } from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export const AboutPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <Title level={2} className="mb-2">
          关于我们
        </Title>
        <Text type="secondary">专业的购房指导平台</Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="平台介绍" className="h-full">
            <Paragraph>
              我们是一个专注于购房指导的专业平台，致力于为用户提供最准确、
              最及时的房价信息和购房建议。通过数据分析和市场研究，
              我们帮助购房者做出明智的决策。
            </Paragraph>
            <Paragraph>
              我们的团队由房地产专家、数据分析师和金融顾问组成，
              拥有丰富的行业经验和专业知识。
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="核心服务" className="h-full">
            <Timeline
              items={[
                {
                  color: "green",
                  children: "房价走势分析",
                },
                {
                  color: "blue",
                  children: "购房政策解读",
                },
                {
                  color: "red",
                  children: "贷款计算器",
                },
                {
                  color: "gray",
                  children: "专家咨询服务",
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <div className="text-center">
              <ClockCircleOutlined
                style={{ fontSize: "48px", color: "#1890ff" }}
              />
              <Title level={4} className="mt-4">
                实时更新
              </Title>
              <Text type="secondary">房价数据实时更新，确保信息准确性</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div className="text-center">
              <UserOutlined style={{ fontSize: "48px", color: "#52c41a" }} />
              <Title level={4} className="mt-4">
                专业团队
              </Title>
              <Text type="secondary">资深专家团队，提供专业购房建议</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div className="text-center">
              <BookOutlined style={{ fontSize: "48px", color: "#faad14" }} />
              <Title level={4} className="mt-4">
                知识库
              </Title>
              <Text type="secondary">丰富的购房知识库，助您了解市场</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
