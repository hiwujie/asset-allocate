import { Card, Col, Flex, Row, Typography } from "antd";
import Link from "antd/es/typography/Link";

const { Text } = Typography;

export const AboutPage = () => {
  return (
    <Flex vertical gap={16}>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="我是谁？">
            <Row>
              <Text>一个全栈开发工程师，</Text>
            </Row>
            <Row>
              <Text>因为有购房需求，所以有了这个网站，</Text>
            </Row>
            <Row>
              <Text>有一个公众号用来记录一些日常生活，欢迎关注。</Text>
            </Row>
            <Row className="mt-4">
              <Text>Respect!</Text>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="在哪可以找到我？">
            <Row>
              <Text>公众号:</Text>
              <Text className="ml-2">
                <Link
                  target="_blank"
                  href="https://mp.weixin.qq.com/s/MjdggDE-R3B4HqjXzfw91Q"
                >
                  2040
                </Link>
              </Text>
            </Row>
            <Row>
              <Text>Github:</Text>
              <Text className="ml-2">
                <Link target="_blank" href="https://github.com/851235550">
                  yulu
                </Link>
              </Text>
            </Row>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
