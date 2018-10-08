import { fetch, apiFormat } from '@/services/baseService';

const driveReportDetailApi = '/api/app/drivingBehavior/getAnalysis/{vin}/{date}';   // 获取驾驶行为分析数据 method 'POST'

export const driveReportDetail = (opt) => fetch.post(apiFormat(driveReportDetailApi, opt));
