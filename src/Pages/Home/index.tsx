import { Row, Typography, Card, Col, Statistic, Progress, Flex } from "antd";
import { HomeOutlined, DollarOutlined, RiseOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const HomePage = () => {
  return (
    <Flex vertical gap={16}>
      {/* 页面标题 */}
      <Row>
        <Text strong className="text-2xl">
          购房指南
        </Text>
      </Row>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均房价"
              value={8500}
              prefix={<DollarOutlined />}
              suffix="元/㎡"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="月涨幅"
              value={2.3}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="可售房源"
              value={1250}
              prefix={<HomeOutlined />}
              suffix="套"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="成交率"
              value={68.5}
              suffix="%"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容区域 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="房价走势分析" className="h-full">
            <div className="space-y-4">
              <div>
                <Text strong>当前市场趋势</Text>
                <Progress
                  percent={75}
                  status="active"
                  strokeColor="#52c41a"
                  className="mt-2"
                />
              </div>
              <div>
                <Text type="secondary">
                  根据最新数据显示，本地区房价呈现稳定上涨趋势，
                  建议购房者关注市场动态，合理规划购房时机。
                </Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="购房建议" className="h-full">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <Text>关注政策变化</Text>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <Text>评估个人经济能力</Text>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <Text>选择合适地段</Text>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <Text>考虑未来发展规划</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
