const uploadImg = '/admin/sys-file/upload_customer'; //上传图片
const getAreaByScanning = '/pm/pm_site_area_check_detail/page'; // 扫码检查区域
const submitCheck = '/pm/pm_site_area_cycle_check'; // 提交巡检结果
const getCheckError = '/pm/pm_basic_area_ex/obtain_all_cycle_check_error_detail'; // 巡检异常
const getErrorDetail = '/pm/pm_site_area_cycle_check_detail/page'; // 巡检异常详情
const getHistoryRecord = '/pm/pm_basic_area_ex/obtain_all_cycle_check_history'; // 扫码记录
const getAreaHistoryRecord = '/pm/pm_site_area_cycle_check_detail/page';
const getDeviceHistoryRecord = '/pm/pm_device_exception_fix/page';
const getDetails = '/admin/user/details'; //获取个人信息 
const getSecurity = '/pm/pm_hidden_hazard_check_list/page'; // 安全概览
const getSecurityDetail = '/pm/pm_hidden_hazard_check_list_detail/page'; // 安全检查详情
const getExam = '/pm/exm_query/page_examinee_paper'; // 在线考试
const getProErrorList = '/pm/pm_basic_area_ex/obtain_cycle_check_error_detail_item';
const saveProErrorDetail = '/pm/pm_site_area_cycle_check_detail'; //区域异常处理
const saveDeviceProErrorDetail = '/pm/pm_site_check_record_device'; // 设备异常处理
const getQuestionList = '/pm/pm_basic_area_ex/obtain_hidden_hazard_check_Detail'; //检查问题一览
const getQuestionDetail = '/pm/pm_basic_area_ex/hidden_hazard_check_Detail_by_id';
const getPromiseList = '/pm/pm_risk_assess_group/page'; //班组安全承诺一览
const savePromise = '/pm/pm_risk_assess_group'; //保存安全承诺
const getDangerList = '/pm/pm_hidden_hazard_rectify_list/page';
const getDepartment = '/admin/category/tree?type=dept'; //获取部门
const saveDanger = '/pm/pm_hidden_hazard_rectify_list'; //保存隐患
const putDanger = '/pm/pm_hidden_hazard_rectify_list'; //修改隐患
const getDangerDetail = '/pm/pm_hidden_hazard_rectify_list'; //隐患详情
const getExamDetial = '/pm/exm_query/paper_questions'; //获取考试详情
const addHiddenDetail = '/pm/pm_hidden_hazard_check_list_detail'; //新增隐患排查详情

export {
	uploadImg,
	getAreaByScanning,
	submitCheck,
	getCheckError,
	getErrorDetail,
	getHistoryRecord,
	getAreaHistoryRecord,
	getDeviceHistoryRecord,
	getDetails,
	getSecurity,
	getSecurityDetail,
	getExam,
	getProErrorList,
	saveProErrorDetail,
	getQuestionList,
	getQuestionDetail,
	getPromiseList,
	savePromise,
	getDangerList,
	getDepartment,
	saveDanger,
	putDanger,
	getDangerDetail,
	getExamDetial,
	addHiddenDetail,
	saveDeviceProErrorDetail
};
