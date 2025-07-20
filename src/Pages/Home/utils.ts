// 读取 ./data 目录下的所有csv文件, 文件名格式为：YYYYMM.csv，并返回一个对象，对象的key是文件名，value是文件内容
// 文件内容是csv格式，第一行是标题，第二行开始是数据
// 数据格式是：城市,环比,同比,实际值
// 返回的对象格式是：{ 文件名: { 城市名: { hb:xxx, tb:xxx, cur:xxx } } }

interface CityData {
  hb: number; // 环比
  tb: number; // 同比
  cur: number; // 实际值
}

interface FileData {
  [cityName: string]: CityData;
}

interface AllData {
  [fileName: string]: FileData;
}

/**
 * 解析 CSV 字符串
 * @param csvString CSV 字符串内容
 * @returns 解析后的数据对象
 */
function parseCSV(csvString: string): FileData {
  const lines = csvString.trim().split("\n");
  const data: FileData = {};

  // 从第二行开始解析数据（跳过标题行）
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const cityName = values[0];

    if (cityName) {
      data[cityName] = {
        hb: parseFloat(values[1]) || 0, // 环比
        tb: parseFloat(values[2]) || 0, // 同比
        cur: 0,
      };
    }
  }

  return data;
}

/**
 * 读取 ./data 目录下的所有 CSV 文件
 * 文件名格式为：YYYYMM.csv
 * @returns Promise<AllData>
 */
export async function readAllCSVFiles(): Promise<AllData> {
  const allData: AllData = {};

  try {
    // 导入所有 CSV 文件
    const csvFiles = import.meta.glob("./data/*.csv", {
      query: "?raw",
      import: "default",
    });

    // 获取所有匹配的文件并排序
    const sortedFiles = Object.entries(csvFiles)
      .filter(([filePath]) => {
        const fileName = filePath.split("/").pop() || "";
        return fileName.match(/^\d{6}\.csv$/);
      })
      .sort(([filePathA], [filePathB]) => {
        const fileNameA = filePathA.split("/").pop() || "";
        const fileNameB = filePathB.split("/").pop() || "";
        return fileNameA.localeCompare(fileNameB);
      });

    let prevData: Record<string, { cur: number }> = baseData202205;

    for (const [filePath, importFn] of sortedFiles) {
      const fileName = filePath.split("/").pop() || "";
      const csvString = (await importFn()) as string;
      const fileData = parseCSV(csvString);

      Object.keys(fileData).forEach((city) => {
        if (prevData[city]) {
          fileData[city].cur = Number(
            ((prevData[city].cur * fileData[city].hb) / 100).toFixed(3)
          );
        }
      });
      prevData = fileData;

      const key = fileName.split(".")[0];
      if (Object.keys(fileData).length > 0) {
        allData[key] = fileData;
      }
    }

    return allData;
  } catch (error) {
    console.error("Error reading CSV files:", error);
    return {};
  }
}

const baseData202205 = {
  北京: { cur: 100 },
  唐山: { cur: 100 },
  天津: { cur: 100 },
  秦皇岛: { cur: 100 },
  石家庄: { cur: 100 },
  包头: { cur: 100 },
  太原: { cur: 100 },
  丹东: { cur: 100 },
  呼和浩特: { cur: 100 },
  锦州: { cur: 100 },
  沈阳: { cur: 100 },
  吉林: { cur: 100 },
  大连: { cur: 100 },
  牡丹江: { cur: 100 },
  长春: { cur: 100 },
  无锡: { cur: 100 },
  哈尔滨: { cur: 100 },
  徐州: { cur: 100 },
  上海: { cur: 100 },
  扬州: { cur: 100 },
  南京: { cur: 100 },
  温州: { cur: 100 },
  杭州: { cur: 100 },
  金华: { cur: 100 },
  宁波: { cur: 100 },
  蚌埠: { cur: 100 },
  合肥: { cur: 100 },
  安庆: { cur: 100 },
  福州: { cur: 100 },
  泉州: { cur: 100 },
  厦门: { cur: 100 },
  九江: { cur: 100 },
  南昌: { cur: 100 },
  赣州: { cur: 100 },
  济南: { cur: 100 },
  烟台: { cur: 100 },
  青岛: { cur: 100 },
  济宁: { cur: 100 },
  郑州: { cur: 100 },
  洛阳: { cur: 100 },
  武汉: { cur: 100 },
  平顶山: { cur: 100 },
  长沙: { cur: 100 },
  宜昌: { cur: 100 },
  广州: { cur: 100 },
  襄阳: { cur: 100 },
  深圳: { cur: 100 },
  岳阳: { cur: 100 },
  南宁: { cur: 100 },
  常德: { cur: 100 },
  海口: { cur: 100 },
  韶关: { cur: 100 },
  重庆: { cur: 100 },
  湛江: { cur: 100 },
  成都: { cur: 100 },
  惠州: { cur: 100 },
  贵阳: { cur: 100 },
  桂林: { cur: 100 },
  昆明: { cur: 100 },
  北海: { cur: 100 },
  西安: { cur: 100 },
  三亚: { cur: 100 },
  兰州: { cur: 100 },
  泸州: { cur: 100 },
  西宁: { cur: 100 },
  南充: { cur: 100 },
  银川: { cur: 100 },
  遵义: { cur: 100 },
  乌鲁木齐: { cur: 100 },
  大理: { cur: 100 },
};

export const citys = [
  "北京",
  "唐山",
  "天津",
  "秦皇岛",
  "石家庄",
  "包头",
  "太原",
  "丹东",
  "呼和浩特",
  "锦州",
  "沈阳",
  "吉林",
  "大连",
  "牡丹江",
  "长春",
  "无锡",
  "哈尔滨",
  "徐州",
  "上海",
  "扬州",
  "南京",
  "温州",
  "杭州",
  "金华",
  "宁波",
  "蚌埠",
  "合肥",
  "安庆",
  "福州",
  "泉州",
  "厦门",
  "九江",
  "南昌",
  "赣州",
  "济南",
  "烟台",
  "青岛",
  "济宁",
  "郑州",
  "洛阳",
  "武汉",
  "平顶山",
  "长沙",
  "宜昌",
  "广州",
  "襄阳",
  "深圳",
  "岳阳",
  "南宁",
  "常德",
  "海口",
  "韶关",
  "重庆",
  "湛江",
  "成都",
  "惠州",
  "贵阳",
  "桂林",
  "昆明",
  "北海",
  "西安",
  "三亚",
  "兰州",
  "泸州",
  "西宁",
  "南充",
  "银川",
  "遵义",
  "乌鲁木齐",
  "大理",
];
