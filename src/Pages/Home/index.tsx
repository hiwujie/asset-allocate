import {
  Row,
  Typography,
  Card,
  Col,
  Statistic,
  Progress,
  Flex,
  Select,
  Spin,
} from "antd";
import { HomeOutlined, DollarOutlined, RiseOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";
import { useState, useEffect } from "react";
import { readAllCSVFiles } from "./utils";

const { Text } = Typography;

export const HomePage = () => {
  const [allData, setAllData] = useState<
    Record<string, Record<string, { hb: number; tb: number; cur: number }>>
  >({});
  const [selectedCity, setSelectedCity] = useState<string>("北京");
  const [loading, setLoading] = useState<boolean>(true);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await readAllCSVFiles();
        console.log("加载的数据:", data);
        setAllData(data);

        // 从数据中提取城市列表
        const firstFile = Object.values(data)[0];
        if (firstFile) {
          setCities(Object.keys(firstFile));
        }
      } catch (error) {
        console.error("加载数据失败:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 生成图表数据
  const generateChartData = () => {
    const chartData: any[] = [];

    Object.entries(allData).forEach(([fileName, fileData]: [string, any]) => {
      const month = fileName;
      const cityData = fileData[selectedCity];

      if (cityData && cityData.cur > 0) {
        // 确保有有效数据
        chartData.push({
          month,
          price: cityData.cur,
          hb: cityData.hb,
          tb: cityData.tb,
        });
      }
    });

    // 按月份排序
    return chartData.sort((a, b) => {
      const monthA = parseInt(a.month);
      const monthB = parseInt(b.month);
      return monthA - monthB;
    });
  };

  const chartData = generateChartData();
  console.log("chartData", chartData);
  console.log("allData keys:", Object.keys(allData));
  console.log("selectedCity:", selectedCity);
  console.log("cities:", cities);

  const lineConfig = {
    data: chartData,
    xField: "month",
    yField: "price",
    shapeField: "smooth",
    scale: {
      y: {
        domainMin: 70, // 纵轴起始值
        domainMax: 120, // 纵轴最大值
        nice: true, // 自动调整刻度为美观的数值
      },
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={16}>
        {/* 页面标题 */}
        <Row gutter={{ xs: 8 }} align="middle">
          <HomeOutlined className="text-2xl" />
          <Text strong className="text-2xl ml-2">
            购房指南
          </Text>
          <div className="ml-auto">
            <Select
              value={selectedCity}
              onChange={setSelectedCity}
              style={{ width: 120 }}
              placeholder="选择城市"
              options={cities.map((city) => ({ label: city, value: city }))}
            />
          </div>
        </Row>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="当前房价"
                value={
                  (allData && Object.values(allData)[0]?.[selectedCity]?.cur) ||
                  0
                }
                prefix={<DollarOutlined />}
                suffix="元/㎡"
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="环比涨幅"
                value={
                  (allData && Object.values(allData)[0]?.[selectedCity]?.hb) ||
                  0
                }
                prefix={<RiseOutlined />}
                suffix="%"
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="同比涨幅"
                value={
                  (allData && Object.values(allData)[0]?.[selectedCity]?.tb) ||
                  0
                }
                prefix={<RiseOutlined />}
                suffix="%"
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          {/* <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="数据月份"
                value={Object.keys(allData)[0]?.replace(".csv", "") || "-"}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col> */}
        </Row>

        {/* 主要内容区域 */}
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card title="房价走势图">
              <Line {...lineConfig} />
            </Card>
          </Col>
        </Row>

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
    </Spin>
  );
};
