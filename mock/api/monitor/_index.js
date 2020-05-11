/* jshint esversion: 6 */
/*
 * @Description: 
 * @version: 
 * @Author: 李继玄（lijixuan5@jd.com）
 * @Date: 2020-03-03 18:09:56
 * @LastEditors: 李继玄（lijixuan5@jd.com）
 * @LastEditTime: 2020-03-03 18:10:35
 * @FilePath: \api-gateway-web\mock\api\monitor\_index.js
 */

exports.apis = [
  {
    path_name: '/monitor/monitoringChart/getTimeGranularity',
    file_name: 'monitor/company.json',
  },
  {
    path_name: '/monitor/getApiId',
    file_name: 'monitor/test.json',
  },
  {
    path_name: '/monitor/getCompany',
    file_name: 'monitor/get-company.json',
  },
  {
    path_name: '/monitor/monitoringChart/getCharts',
    file_name: 'monitor/get-charts.json',
  },
  {
    path_name: '/monitor/warningRules/getList',
    file_name: 'monitor/warning-rules.json',
  },
  {
    path_name: '/monitor/warningRules/getWarningTime',
    file_name: 'monitor/get-warning-time.json',
  },
  {
    path_name: '/monitor/warningRules/getRuleMessage',
    file_name: 'monitor/get-rule-message.json',
  },
  {
    path_name: '/operationlog/getOperationLog',
    file_name: 'monitor/get-operation-log.json',
  },
];