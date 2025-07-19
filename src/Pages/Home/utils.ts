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
  const lines = csvString.trim().split('\n');
  const data: FileData = {};

  // 从第二行开始解析数据（跳过标题行）
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const cityName = values[0];
    
    if (cityName) {
      data[cityName] = {
        hb: parseFloat(values[1]) || 0,  // 环比
        tb: parseFloat(values[2]) || 0,  // 同比
        cur: parseFloat(values[4]) || 0, // 实际房价（第5列）
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
    const csvFiles = import.meta.glob('./data/*.csv', { 
      query: '?raw',
      import: 'default'
    });
    
    for (const [filePath, importFn] of Object.entries(csvFiles)) {
      const fileName = filePath.split('/').pop() || '';
      if (fileName.match(/^\d{6}\.csv$/)) { // 匹配 YYYYMM.csv 格式
        const csvString = await importFn() as string;
        const fileData = parseCSV(csvString);
        const key = fileName.split('.')[0];
        if (Object.keys(fileData).length > 0) {
          allData[key] = fileData;
        }
      }
    }

    return allData;
  } catch (error) {
    console.error('Error reading CSV files:', error);
    return {};
  }
}

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
  "大理"
]
