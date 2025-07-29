import { Card, Col, Flex, Row, Typography } from "antd";
import Link from "antd/es/typography/Link";

const { Text } = Typography;

export const AboutPage = () => {
  return (
    <Flex vertical gap={16}>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="关于投资组合分析">
            <Row>
              <Text>这是一个投资组合表现分析工具，</Text>
            </Row>
            <Row>
              <Text>帮助投资者了解多元化投资组合的长期表现，</Text>
            </Row>
            <Row>
              <Text>基于历史数据分析股票、国债、现金和黄金的投资回报。</Text>
            </Row>
            <Row className="mt-4">
              <Text>理性投资，长期持有！</Text>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="投资理念">
            <Row>
              <Text>多元化投资:</Text>
              <Text className="ml-2">分散投资于不同资产类别，降低整体风险</Text>
            </Row>
            <Row>
              <Text>长期持有:</Text>
              <Text className="ml-2">时间是投资者最好的朋友，复利的力量不可小觑</Text>
            </Row>
            <Row>
              <Text>风险管理:</Text>
              <Text className="ml-2">了解各资产的风险收益特征，做出明智决策</Text>
            </Row>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
