import {
  Row,
  Typography,
  Card,
  Col,
  Flex,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
  Divider,
} from "antd";
import { LineChartOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";
import { useState, useEffect } from "react";
import { readAllCSVFiles, assets } from "./utils";
import dayjs from "dayjs";

const { Text } = Typography;

const columns = [
  {
    title: "资产",
    dataIndex: "asset",
  },
  {
    title: "最新月份",
    dataIndex: "month",
  },
  {
    title: "月度收益率(%)",
    dataIndex: "monthlyReturn",
    render: (value: number) => {
      const color = value >= 0 ? "green" : "red";
      return <Tag color={color}>{value.toFixed(2)}%</Tag>;
    },
  },
  {
    title: "年化收益率(%)",
    dataIndex: "annualReturn",
    render: (value: number) => {
      const color = value >= 0 ? "green" : "red";
      return <Tag color={color}>{value.toFixed(2)}%</Tag>;
    },
  },
  {
    title: "今年以来收益率(%)",
    dataIndex: "ytdReturn",
    render: (value: number) => {
      const color = value >= 0 ? "green" : "red";
      return <Tag color={color}>{value.toFixed(2)}%</Tag>;
    },
  },
  {
    title: "当前价值($)",
    dataIndex: "currentValue",
    render: (value: number) => `$${value.toLocaleString()}`,
  },
];

const performanceColumns = [
  {
    title: "资产",
    dataIndex: "asset",
  },
  {
    title: (
      <>
        <Text className="mr-2">当前价值 / 初始投资</Text>
        <Tooltip title="当前价值 / $2,500 (初始25%配置)">
          <QuestionCircleOutlined className="text-sm" />
        </Tooltip>
      </>
    ),
    dataIndex: "currentValue",
    render: (value: number) => `$${value.toLocaleString()} / $2,500`,
  },
  {
    title: "总收益率",
    dataIndex: "totalReturn",
    render: (value: number) => {
      const color = value >= 0 ? "green" : "red";
      return <Tag color={color}>{value.toFixed(2)}%</Tag>;
    },
  },
];

export const HomePage = () => {
  const [allData, setAllData] = useState<
    Record<
      string,
      Record<string, { monthlyReturn: number; annualReturn: number; ytdReturn: number; currentValue: number }>
    >
  >({});
  const [selectedAssets, setSelectedAssets] = useState<string[]>([
    "股票",
    "国债",
    "现金",
    "黄金",
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await readAllCSVFiles();
        setAllData(data);
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

      // 为每个选中的资产生成数据
      selectedAssets.forEach((assetName) => {
        const assetData = fileData[assetName];

        if (assetData && assetData.currentValue > 0) {
          chartData.push({
            month,
            asset: assetName,
            value: assetData.currentValue,
            monthlyReturn: assetData.monthlyReturn,
            annualReturn: assetData.annualReturn,
            ytdReturn: assetData.ytdReturn,
          });
        }
      });
    });

    // 按月份排序
    return chartData.sort((a, b) => {
      const monthA = parseInt(a.month);
      const monthB = parseInt(b.month);
      return monthA - monthB;
    });
  };

  const chartData = generateChartData();

  // 生成表格数据 - 选中资产的最新数据
  const generateTableData = () => {
    const tableData: any[] = [];

    // 获取最新的数据文件（按文件名排序后的最后一个）
    const latestMonth = Object.keys(allData).sort().pop();

    if (latestMonth) {
      const latestData = allData[latestMonth];

      selectedAssets.forEach((assetName) => {
        const assetData = latestData[assetName];
        if (assetData) {
          tableData.push({
            key: assetName,
            asset: assetName,
            month: dayjs(latestMonth).format("YYYY年MM月"),
            monthlyReturn: assetData.monthlyReturn,
            annualReturn: assetData.annualReturn,
            ytdReturn: assetData.ytdReturn,
            currentValue: assetData.currentValue,
          });
        }
      });
    }

    return tableData;
  };

  const generatePerformanceData = () => {
    const performanceData: any[] = [];
    const latestMonth = Object.keys(allData).sort().pop();
    if (latestMonth) {
      const latestData = allData[latestMonth];
      // 只显示4类投资资产，按当前价值排序
      const investmentAssets = assets.filter(asset => latestData[asset]);
      const sortedAssets = investmentAssets
        .map(asset => [asset, latestData[asset]])
        .sort((a, b) => b[1].currentValue - a[1].currentValue);
      
      sortedAssets.forEach(([asset, data]) => {
        const totalReturn = ((data.currentValue - 2500) / 2500) * 100;
        performanceData.push({
          key: asset,
          asset,
          currentValue: data.currentValue,
          totalReturn,
        });
      });
    }
    return performanceData;
  };

  const tableData = generateTableData();
  const performanceData = generatePerformanceData();

  const lineConfig = {
    data: chartData,
    xField: "month",
    yField: "value",
    colorField: "asset", // 按资产区分颜色
    shapeField: "smooth",
    scale: {
      y: {
        domainMin: 1000, // 纵轴起始值
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
    animate: { enter: { type: "pathIn", duration: 1000 } },
  };

  return (
    <Spin spinning={loading}>
      <Flex vertical gap={16}>
        {/* 页面标题 */}
        <Row gutter={{ xs: 8 }} align="middle">
          <LineChartOutlined className="text-2xl" />
          <Text strong className="text-2xl ml-2">
            投资组合分析
          </Text>
          <Text className="text-sm ml-2 text-blue-500 font-normal">
            (
            {`多元化投资组合表现追踪，起始投资$10,000，每种资产配置25%，数据从2000年1月开始`}
            )
          </Text>
        </Row>

        {/* 主要内容区域 */}
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card
              title={
                <Flex justify="space-between" align="center">
                  <Text strong className="text-lg">
                    投资组合价值走势
                  </Text>
                  <Select
                    mode="multiple"
                    value={selectedAssets}
                    onChange={(values) => {
                      // 限制最多选择4个资产
                      if (values.length <= 4) {
                        setSelectedAssets(values);
                      } else {
                        // 如果超过4个，则移除第一个，并添加新的
                        const newValues = values.slice(1, 4);
                        newValues.push(values[values.length - 1]);
                        setSelectedAssets(newValues);
                      }
                    }}
                    style={{ width: 350 }}
                    placeholder="选择资产（最多4个）"
                    maxTagCount={4}
                    maxTagTextLength={5}
                    options={assets.map((asset) => ({
                      label: asset,
                      value: asset,
                    }))}
                  />
                </Flex>
              }
            >
              <Line {...lineConfig} />
              <Divider />
              <Table
                dataSource={tableData}
                columns={columns}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={24}>
            <Card title="投资组合整体表现">
              <Table
                dataSource={performanceData}
                columns={performanceColumns}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </Flex>
    </Spin>
  );
};