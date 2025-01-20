import config from '@/config/index.config';
import {request} from '@/utils/request/request2';

export function customFetchList(mappingName, tableName, query) {
    return request({
        url: config.baseUrl + '/' + mappingName + '/custom_api/page_' + tableName,
        method: 'get',
        params: query
    })
}
export function customDownloadExcel(mappingName, tableName, query) {
    return request({
        url: config.baseUrl + '/' + mappingName + '/custom_api/write_excel_' + tableName,
        method: 'post',
        params: query,
        responseType: 'blob'
    })
}
export function fetchList(mTableName, query) {
    return request({
        url: config.baseUrl + mTableName + '/page',
        method: 'get',
        params: query
    })
}
export function countList(mTableName, query) {
    return request({
        url: config.baseUrl + mTableName + '/count',
        method: 'get',
        params: query
    })
}
export function getRichCols(mTableName, record) {
    return request({
        url: config.baseUrl + mTableName + '/get_rich_cols',
        method: 'post',
        data: record
    })
}
export function getChildren(mTableName, record) {
    return request({
        url: config.baseUrl + mTableName + '/children',
        method: 'post',
        data: record
    })
}
export function uniqueObjCheck(mTableName, record) {
    return request({
        url: config.baseUrl + mTableName + '/unique',
        method: 'post',
        data: record
    })
}
export function getDefaultAuditUsers(mTableName, record) {
    return request({
        url: config.baseUrl + mTableName + '/auditors',
        method: 'post',
        data: record
    })
}
export function addObj(mTableName, record) {
    return config.baseUrl + request({
        url: mTableName + '/add',
        method: 'post',
        data: record
    })
}
export function putObj(mTableName, record) {
    return config.baseUrl + request({
        url: mTableName + '/edit',
        method: 'put',
        data: record
    })
}
export function putObjNotNull(mTableName, record) {
    return request({
        url: config.baseUrl + mTableName + '/edit_not_null',
        method: 'put',
        data: record
    })
}
export function putObjNotNullBatch(mTableName, records) {
    return request({
        url: config.baseUrl + mTableName + '/edit_not_null_batch',
        method: 'put',
        data: records
    })
}
export function addBatchObjs(mTableName, records) {
    return request({
        url: config.baseUrl + mTableName + '/batch',
        method: 'post',
        data: records
    })
}
export function delObj(mTableName, record) {
    return request({
        url: config.baseUrl + mTableName + '/del',
        method: 'delete',
        data: record
    })
}
export function delMultiObj(mTableName, records) {
    return request({
        url: config.baseUrl + mTableName + '/del_by_ids',
        method: 'post',
        data:  records
    })
}
export function downloadExcelTemp(mTableName) {
    return request({
        url: config.baseUrl + mTableName + '/download_excel_template',
        method: 'post'
    })
}
export function downloadExcel(mTableName, query) {
    return request({
        url: config.baseUrl + mTableName + '/write_excel',
        method: 'post',
        params: query,
        responseType: 'blob'
    })
}
