// 读取 ./data 目录下的所有csv文件, 文件名格式为：YYYYMM.csv，并返回一个对象，对象的key是文件名，value是文件内容
// 文件内容是csv格式，第一行是标题，第二行开始是数据
// 数据格式是：资产,月度收益率,年化收益率,年初至今收益率,当前价值
// 返回的对象格式是：{ 文件名: { 资产名: { monthlyReturn:xxx, annualReturn:xxx, ytdReturn:xxx, currentValue:xxx } } }

interface AssetData {
  monthlyReturn: number; // 月度收益率
  annualReturn: number; // 年化收益率
  ytdReturn: number; // 年初至今收益率
  currentValue: number; // 当前价值
}

interface FileData {
  [assetName: string]: AssetData;
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
    const assetName = values[0];

    if (assetName) {
      data[assetName] = {
        monthlyReturn: parseFloat(values[1]) || 0, // 月度收益率
        annualReturn: parseFloat(values[2]) || 0, // 年化收益率
        ytdReturn: parseFloat(values[3]) || 0, // 年初至今收益率
        currentValue: 0,
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

    let prevData: Record<string, { currentValue: number }> = baseData200001;

    for (const [filePath, importFn] of sortedFiles) {
      const fileName = filePath.split("/").pop() || "";
      const csvString = (await importFn()) as string;
      const fileData = parseCSV(csvString);

      Object.keys(fileData).forEach((asset) => {
        if (prevData[asset]) {
          // 根据月度收益率计算当前价值
          const monthlyReturnDecimal = fileData[asset].monthlyReturn / 100;
          fileData[asset].currentValue = Number(
            (prevData[asset].currentValue * (1 + monthlyReturnDecimal)).toFixed(2)
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

// 2000年1月基准数据，每种资产初始投资$2,500（总投资$10,000的25%）
const baseData200001 = {
  股票: { currentValue: 2500 },
  国债: { currentValue: 2500 },
  现金: { currentValue: 2500 },
  黄金: { currentValue: 2500 },
};

export const assets = [
  "股票",
  "国债", 
  "现金",
  "黄金",
];