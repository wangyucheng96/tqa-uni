/*
 * 应用表单校验相关配置
 * 依赖：graceChecker.js 进行校验
 *
 * 使用：引入该js到页面，let res = graceChecker.check({phoneNo:"",code:""},formRule.loginRule)
 */

export default {
	/* 用户密码登录 */
	loginByPassRule: [{
		name: 'mobile',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '手机号不能为空'
	}, {
		name: 'mobile',
		checkType: 'phoneno',
		checkRule: '',
		errorMsg: '手机号格式不正确'
	}, {
		name: 'password',
		checkType: 'string',
		checkRule: '6,18',
		errorMsg: '请输入6-18位密码'
	}, ],
	loginByPwd: [{
			name: 'username',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '用户名不能为空'
		},
		{
			name: 'password',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '密码不能为空'
		},
	],
	/* 用户验证码登录 */
	loginByCodeRule: [{
		name: 'mobile',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '手机号不能为空'
	}, {
		name: 'mobile',
		checkType: 'phoneno',
		checkRule: '',
		errorMsg: '手机号格式不正确'
	}, {
		name: 'code',
		checkType: 'string',
		checkRule: '4',
		errorMsg: '请输入4位验证码'
	}],

	/* 发送验证码验证手机号 */
	sendCodeRule: [{
		name: 'mobile',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '手机号不能为空'
	}, {
		name: 'mobile',
		checkType: 'phoneno',
		checkRule: '',
		errorMsg: '手机号格式不正确'
	}],


	/* 用户注册 */
	registerRule: [{
		name: 'username',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '用户名不能为空'
	}, {
		name: 'password',
		checkType: 'string',
		checkRule: '6,18',
		errorMsg: '请输入6-18位密码'
	}],

	/* 密码重置 */
	resetPasswordRule: [{
		name: 'mobile',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '手机号不能为空'
	}, {
		name: 'mobile',
		checkType: 'phoneno',
		checkRule: '',
		errorMsg: '手机号格式不正确'
	}, {
		name: 'code',
		checkType: 'string',
		checkRule: '4',
		errorMsg: '请输入4位验证码'
	}, {
		name: 'password',
		checkType: 'string',
		checkRule: '6,18',
		errorMsg: '请输入6-18位密码'
	}],
	//隐患整改
	hiddenCheck: [{
			name: 'rectifyCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '整改单编号不能为空'
		},
		{
			name: 'rectifyTitle',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '整改标题不能为空'
		},
		{
			name: 'rectifySource',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '整改来源不能为空'
		},
		{
			name: 'rectifyObject',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '整改对象不能为空'
		},
		{
			name: 'dangerLocation',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '隐患位置不能为空'
		},
		{
			name: 'unqualifiedFactor',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '整改对象不能为空'
		},
		{
			name: 'rectifyObject',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '不合格因素不能为空'
		},
		{
			name: 'dangerLevel',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '隐患级别不能为空'
		},
		{
			name: 'majorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '专业分类不能为空'
		},
		{
			name: 'originType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查来源分类不能为空'
		},
		{
			name: 'figureType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '人物管理分类不能为空'
		},
		{
			name: 'hazardCatalog',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '隐患类型不能为空'
		},
		{
			name: 'dutyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '责任部门不能为空'
		},
		{
			name: 'happenSegment',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '发生环节不能为空'
		},


	],
	//隐患排查
	hiddenIdentification: [{
			name: 'hazardCheckNo',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查单号不能为空'
		},
		{
			name: 'hazardCheckType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查类型不能为空'
		},
		{
			name: 'fillPerson',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '记录人员不能为空'
		},
		{
			name: 'checkDate',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查日期不能为空'
		},
		{
			name: 'checkGroupMember',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查组成员不能为空'
		},
		{
			name: 'checkedDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '受检部门不能为空'
		},
		{
			name: 'checkTitle',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查标题不能为空'
		},
	],
	//隐患整改验收
	hiddenAccept: [{
			name: 'verifyDate',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验收时间不能为空'
		},
		{
			name: 'verifyResultStatus',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '验证状态不能为空'
		}
	],
	riskReport: [{
			name: 'hazardCheckCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '隐患编号不能为空'
		},
		{
			name: 'hazardCheckOrg',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查单位不能为空'
		},
		{
			name: 'checkResultDesc',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '问题描述不能为空'
		},
		{
			name: 'hazardCheckAccord',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查依据不能为空'
		},
		{
			name: 'hazardLocation',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '隐患位置不能为空'
		},
		{
			name: 'belongDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '所属部门不能为空'
		},
		{
			name: 'reporter',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '上报人称不能为空'
		},
		{
			name: 'reportTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '上报时间不能为空'
		},
		{
			name: 'isRectifyDirectly',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '是否随手改不能为空'
		},
	],
	handPic: [{
			name: 'checkTitle',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查标题不能为空'
		},
		{
			name: 'hazardCheckNo',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查单编号不能为空'
		},
		{
			name: 'hazardCheckCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '隐患排查编码不能为空'
		},
		{
			name: 'checkItem',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查项目不能为空'
		},
		{
			name: 'checkContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查内容不能为空'
		},
		{
			name: 'checkResult',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检测结果不能为空'
		},
		{
			name: 'fillPerson',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '记录人员不能为空'
		},
	],
	//动火作业
	workFire: [{
			name: 'applyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请部门不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'workCertiCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业编号不能为空'
		},
		{
			name: 'workCertiName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业证名称不能为空'
		},
		{
			name: 'workContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业内容不能为空'
		},
		{
			name: 'areaName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '动火区域不能为空'
		},
		{
			name: 'workCertiType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业等级不能为空'
		},
		{
			name: 'beginTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '开始时间不能为空'
		},
		{
			name: 'endTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '结束时间不能为空'
		},
		{
			name: 'fireWorkMethod',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '动火方式不能为空'
		},
		{
			name: 'applicantLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '生产单位（现场）负责人不能为空'
		},
		{
			name: 'operatorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业（施工）方类型不能为空'
		},
		{
			name: 'operatorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '动火人不能为空'
		},
		{
			name: 'operatorLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '动火负责人不能为空'
		},
		{
			name: 'monitorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监火单位类型不能为空'
		},
		{
			name: 'monitorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监火人不能为空'
		},
		{
			name: 'trainingName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业相关培训不能为空'
		},
	],
	//高处作业
	highPlace: [{
			name: 'applyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请部门不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'workCertiCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业编号不能为空'
		},
		{
			name: 'workCertiName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业证名称不能为空'
		},
		{
			name: 'workContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业内容不能为空'
		},
		{
			name: 'areaName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业区域不能为空'
		},
		{
			name: 'workCertiType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业等级不能为空'
		},
		{
			name: 'beginTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '开始时间不能为空'
		},
		{
			name: 'endTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '结束时间不能为空'
		},
		{
			name: 'applicantLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '生产单位（现场）负责人不能为空'
		},
		{
			name: 'operatorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业（施工）方类型不能为空'
		},
		{
			name: 'operatorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业人不能为空'
		},
		{
			name: 'operatorLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业负责人不能为空'
		},
		{
			name: 'monitorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护单位类型不能为空'
		},
		{
			name: 'monitorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护人不能为空'
		},
		{
			name: 'trainingName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业相关培训不能为空'
		},
		{
			name: 'workHeight',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业高度不能为空'
		},
	],
	//受限空间作业
	limitSpace: [{
			name: 'applyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请部门不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'workCertiCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业编号不能为空'
		},
		{
			name: 'workCertiName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业证名称不能为空'
		},
		{
			name: 'workContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业内容不能为空'
		},
		{
			name: 'areaName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业区域不能为空'
		},
		{
			name: 'beginTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '开始时间不能为空'
		},
		{
			name: 'endTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '结束时间不能为空'
		},
		{
			name: 'applicantLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '生产单位（现场）负责人不能为空'
		},
		{
			name: 'operatorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业（施工）方类型不能为空'
		},
		{
			name: 'operatorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业人不能为空'
		},
		{
			name: 'operatorLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业负责人不能为空'
		},
		{
			name: 'monitorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护单位类型不能为空'
		},
		{
			name: 'monitorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护人不能为空'
		},
		{
			name: 'trainingName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业相关培训不能为空'
		},
		{
			name: 'deviceMaterial',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '原有介质名称不能为空'
		},
	],
	temporaryElectricity: [{
			name: 'applyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请部门不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'workCertiCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业编号不能为空'
		},
		{
			name: 'workCertiName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业证名称不能为空'
		},
		{
			name: 'workContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业内容不能为空'
		},
		{
			name: 'areaName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业区域不能为空'
		},
		{
			name: 'beginTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '开始时间不能为空'
		},
		{
			name: 'endTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '结束时间不能为空'
		},
		{
			name: 'applicantLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '生产单位（现场）负责人不能为空'
		},
		{
			name: 'operatorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业（施工）方类型不能为空'
		},
		{
			name: 'operatorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业人不能为空'
		},
		{
			name: 'operatorLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业负责人不能为空'
		},
		{
			name: 'monitorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护单位类型不能为空'
		},
		{
			name: 'monitorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护人不能为空'
		},
		{
			name: 'trainingName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业相关培训不能为空'
		},
		{
			name: 'linkDevice',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '电源接入点不能为空'
		},
		{
			name: 'workVoltage',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '工作电压不能为空'
		},
		{
			name: 'devicePower',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '用电设备及功率不能为空'
		},
	],
	workBreak: [{
			name: 'applyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请部门不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'workCertiCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业编号不能为空'
		},
		{
			name: 'workCertiName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业证名称不能为空'
		},
		{
			name: 'workContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业内容不能为空'
		},
		{
			name: 'areaName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业区域不能为空'
		},
		{
			name: 'beginTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '开始时间不能为空'
		},
		{
			name: 'endTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '结束时间不能为空'
		},
		{
			name: 'applicantLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '生产单位（现场）负责人不能为空'
		},
		{
			name: 'operatorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业（施工）方类型不能为空'
		},
		{
			name: 'operatorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业人不能为空'
		},
		{
			name: 'operatorLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业负责人不能为空'
		},
		{
			name: 'monitorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护单位类型不能为空'
		},
		{
			name: 'monitorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护人不能为空'
		},
		{
			name: 'trainingName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业相关培训不能为空'
		},
		{
			name: 'blockRoadReason',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '断路原因不能为空'
		},
	],
	//盲板
	workDredge: [{
			name: 'applyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请部门不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'workCertiCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业编号不能为空'
		},
		{
			name: 'workCertiName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业证名称不能为空'
		},
		{
			name: 'workContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业内容不能为空'
		},
		{
			name: 'areaName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业区域不能为空'
		},
		// {
		// 	name: 'dredgeBeginTime',
		// 	checkType: 'notnull',
		// 	checkRule: '',
		// 	errorMsg: '抽开始时间不能为空'
		// },
		// {
		// 	name: 'dredgeEndTime',
		// 	checkType: 'notnull',
		// 	checkRule: '',
		// 	errorMsg: '抽结束时间不能为空'
		// },
		// {
		// 	name: 'blockBeginTime',
		// 	checkType: 'notnull',
		// 	checkRule: '',
		// 	errorMsg: '堵开始时间不能为空'
		// },
		// {
		// 	name: 'blockEndTime',
		// 	checkType: 'notnull',
		// 	checkRule: '',
		// 	errorMsg: '堵结束时间不能为空'
		// },
		{
			name: 'applicantLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '生产单位（现场）负责人不能为空'
		},
		{
			name: 'operatorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业（施工）方类型不能为空'
		},
		{
			name: 'operatorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业人不能为空'
		},
		{
			name: 'operatorLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业负责人不能为空'
		},
		{
			name: 'monitorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护单位类型不能为空'
		},
		{
			name: 'monitorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护人不能为空'
		},
		{
			name: 'trainingName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业相关培训不能为空'
		},
		{
			name: 'workDeviceLineName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '设备管线名称不能为空'
		},
		{
			name: 'mainMedium',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '主要介质不能为空'
		},
		{
			name: 'temperature',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '温度不能为空'
		},
		{
			name: 'pressure',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '压力不能为空'
		},
		{
			name: 'wellMaterial',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '盲板材质不能为空'
		},
		{
			name: 'wellType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '盲板规格不能为空'
		},
		{
			name: 'wellCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '盲板编号不能为空'
		},
	],
	workGround: [{
			name: 'applyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请部门不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'workCertiCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业编号不能为空'
		},
		{
			name: 'workCertiName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业证名称不能为空'
		},
		{
			name: 'workContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业内容不能为空'
		},
		{
			name: 'areaName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业区域不能为空'
		},
		{
			name: 'beginTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '开始时间不能为空'
		},
		{
			name: 'endTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '结束时间不能为空'
		},
		{
			name: 'applicantLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '生产单位（现场）负责人不能为空'
		},
		{
			name: 'operatorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业（施工）方类型不能为空'
		},
		{
			name: 'operatorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业人不能为空'
		},
		{
			name: 'operatorLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业负责人不能为空'
		},
		{
			name: 'monitorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护单位类型不能为空'
		},
		{
			name: 'monitorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护人不能为空'
		},
		{
			name: 'trainingName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业相关培训不能为空'
		},
	],
	//吊装
	workHoisting: [{
			name: 'applyDepart',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请部门不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'workCertiCode',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业编号不能为空'
		},
		{
			name: 'workCertiName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业证名称不能为空'
		},
		{
			name: 'workContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业内容不能为空'
		},
		{
			name: 'areaName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业区域不能为空'
		},
		{
			name: 'workCertiType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业等级不能为空'
		},
		{
			name: 'beginTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '开始时间不能为空'
		},
		{
			name: 'endTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '结束时间不能为空'
		},
		{
			name: 'applicantLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '生产单位（现场）负责人不能为空'
		},
		{
			name: 'operatorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业（施工）方类型不能为空'
		},
		{
			name: 'operatorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业人不能为空'
		},
		{
			name: 'operatorLeader',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业负责人不能为空'
		},
		{
			name: 'monitorType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护单位类型不能为空'
		},
		{
			name: 'monitorPeople',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '监护人不能为空'
		},
		{
			name: 'trainingName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '作业相关培训不能为空'
		},
		{
			name: 'operatorSpecialCerti',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '吊装人员及特殊工种作业证号不能为空'
		},
		{
			name: 'commandSpecialCerti',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '吊装指挥及特殊工种作业证号不能为空'
		},
	],
	//流程审批
	approveWork: [{
		name: 'processInstanceName',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '流程实例名称不能为空'
	}, {
		name: 'processName',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '模型名称不能为空'
	}],
	// 班组安全承诺
	promise: [{
			name: 'groupName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '班组不能为空'
		},
		{
			name: 'reporter',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '班组负责人不能为空'
		},
		{
			name: 'reportTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '上报日期不能为空'
		}
	],
	// 班组汇总车间
	workshopSummary: [{
		name: 'shopFloorName',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '所属车间不能为空'
	}],
	// 车间汇总公司
	companySummary: [{
			name: 'entprName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '企业名称不能为空'
		},
		{
			name: 'reporter',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '上报人不能为空'
		},
		{
			name: 'fillTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '填写时间不能为空'
		},
		{
			name: 'reportTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '上报日期不能为空'
		}
	],
	processError: [{
		name: 'checkStatus',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '检查状态不能为空'
	}],
	pwdEdit: [{
		name: 'password',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '原密码不能为空'
	},
	{
		name: 'newpassword1',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '新密码不能为空'
	},
	{
		name: 'newpassword2',
		checkType: 'notnull',
		checkRule: '',
		errorMsg: '确认密码不能为空'
	}],
	//疫苗接种
	epidemicDose:[
		{
			name:'employeeName',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'姓名不能为空'
		},
		{
			name:'employeeNo',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'工号不能为空'
		},
		{
			name:'department',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'所属部门不能为空'
		},
	],
	//核酸检测
	epidemicTestDetail:[
		{
			name:'epidemicTestCode',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'核酸检测编号不能为空'
		},
		// {
		// 	name:'epidemicTestRound',
		// 	checkType:'notnull',
		// 	checkRule: '',
		// 	errorMsg:'检测轮次不能为空'
		// },
		{
			name:'epidemicTestTime',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'检测时间不能为空'
		},
		{
			name:'epidemicTestAddress',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'检测地点不能为空'
		},
	],
	epidemicTest:[
		{
			name:'employeeName',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'姓名不能为空'
		},
		{
			name:'employeeNo',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'工号不能为空'
		},
		{
			name:'department',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'所属部门不能为空'
		},
		// {
		// 	name:'epidemicTestTime',
		// 	checkType:'notnull',
		// 	checkRule: '',
		// 	errorMsg:'检测时间不能为空'
		// },
		// {
		// 	name:'epidemicTestAddress',
		// 	checkType:'notnull',
		// 	checkRule: '',
		// 	errorMsg:'检测地点不能为空'
		// },
	],
	// 物流场地申请
	logist:[
		{
			name:'contractorName',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'相关单位名称不能为空'
		},
		{
			name:'applyDate',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'申请日期不能为空'
		},
		{
			name:'logistWorkTime',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'作业时间不能为空'
		},
		{
			name:'contractorApplyer',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'相关方申请人不能为空'
		},
		{
			name:'crrcNo',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'车组号不能为空'
		},
		{
			name:'personCount',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'入场人数不能为空'
		},
		{
			name:'bringDept',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'引进单位不能为空'
		},
		{
			name:'bringDeptRespor',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'引进单位责任人不能为空'
		},
		{
			name:'phone',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'联系电话不能为空'
		},
		{
			name:'workReason',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'作业原因不能为空'
		},
	],
	// 进调作业申请
	debug:[
		{
			name:'contractorDebugDept',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'作业单位/部门不能为空'
		},
		{
			name:'contractorDebugInnerDept',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'引进单位不能为空'
		},
		{
			name:'applyDate',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'申请日期不能为空'
		},
		{
			name:'ctrWorkerName',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'相关方人员姓名不能为空'
		},
		{
			name:'logistWorkStartTime',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'作业开始时间不能为空'
		},
		{
			name:'logistWorkEndTime',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'作业结束时间不能为空'
		},
		{
			name:'phone',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'联系电话不能为空'
		},
		{
			name:'projectName',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'项目名称不能为空'
		},
		{
			name:'workArea',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'工作区域不能为空'
		},
	],
	//车间作业申请
	workApply:[
		{
			name:'contractorName',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'相关方单位名称不能为空'
		},
		{
			name:'contractorApplyInnerDept',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'引进单位不能为空'
		},
		{
			name:'applyDate',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'申请日期不能为空'
		},
		{
			name:'ctrWorkerName',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'相关方人员姓名不能为空'
		},
		{
			name:'logistWorkStartTime',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'作业开始时间不能为空'
		},
		{
			name:'logistWorkEndTime',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'作业结束时间不能为空'
		},
		{
			name:'phone',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'联系电话不能为空'
		},
		{
			name:'projectName',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'项目名称不能为空'
		},
		{
			name:'workArea',
			checkType:'notnull',
			checkRule: '',
			errorMsg:'工作区域不能为空',
		}
		// 	name: 'password',
		// 	checkType: 'notnull',
		// 	checkRule: '',
		// 	errorMsg: '原密码不能为空'
		// },
		// {
		// 	name: 'newpassword1',
		// 	checkType: 'notnull',
		// 	checkRule: '',
		// 	errorMsg: '新密码不能为空'
		// },
		// {
		// 	name: 'newpassword2',
		// 	checkType: 'notnull',
		// 	checkRule: '',
		// 	errorMsg: '确认密码不能为空'
		// }
	],
	//设备巡检计划
	searchTask: [{
			name: 'devicePos',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '设备编号不能为空'
		},
		{
			name: 'deviceCheckTypeDis',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查类型不能为空'
		},
		{
			name: 'checkItem',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查项目不能为空'
		},
		{
			name: 'deviceCheckMethod',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查方法不能为空'
		},
		{
			name: 'checkContent',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查内容不能为空'
		},
		{
			name: 'checkCycleTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查周期不能为空'
		},
		{
			name: 'checkCycleTimeTypeDis',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查周期类型不能为空'
		}
	],
	//修改设备巡检记录
	scanningRecordEdit: [{
			name: 'deviceCheckStartTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查开始时间不能为空'
		},
		{
			name: 'checkPerson',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '检查人不能为空'
		}
	],
	//报修设备巡检记录
	scanningRecordRepair: [{
			name: 'deviceExceptFixStatusDis',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '异常维修状态不能为空'
		},
		{
			name: 'deviceRegcheckType',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '维修类型不能为空'
		},
		{
			name: 'devicePos',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '设备编号不能为空'
		}, {
			name: 'requesttor',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '提报人不能为空'
		},
		{
			name: 'requestDate',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '提报时间不能为空'
		}, {
			name: 'deviceExceptPhenom',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '故障现象不能为空'
		},
	],
	//维修
	inspectionRepair: [],
	//疫情外出申请
	epidemicOutApply: [
		{
			name: 'applyTime',
			checkType: 'checked',
			checkRule: '',
			errorMsg: '申请时间不能为空'
		},
		{
			name: 'applicant',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '申请人不能为空'
		},
		{
			name: 'epidemicOutReason',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '外出事由不能为空'
		},
		{
			name: 'outLoc',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '外出地点不能为空'
		},
		{
			name: 'outVehicle',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '交通工具不能为空'
		},
		{
			name: 'planOutDate',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '计划外出时间不能为空'
		},
		{
			name: 'planBackDate',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '计划返回时间不能为空'
		},
	],
	mtnRecordEdit: [{
			name: 'deviceMtnStartTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '开始保养时间不能为空'
		}
	],
	//外来人员
	registrationPerson: [
		{
			name: 'personName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '人员姓名不能为空'
		},
		{
			name: 'mobile',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '移动电话不能为空'
		},
		{
			name: 'inTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '进入时间不能为空'
		},
	],
	registrationCar:[
		{
			name: 'inTime',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '进入时间不能为空'
		},
		{
			name: 'vehiclePlateNum',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '车牌号不能为空'
		},
		{
			name: 'vehiclePcardNum',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '车辆定位卡号不能为空'
		},
		{
			name: 'driverName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '驾驶员姓名不能为空'
		},
		{
			name: 'mobile',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '移动电话不能为空'
		},
		{
			name: 'driverPcardNum',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '驾驶员定位卡号不能为空'
		},
	],
	epidemicHealthDaily:[
		{
			name: 'fillDate',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '填报日期不能为空'
		},
		{
			name: 'employeeName',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '姓名不能为空'
		},
		{
			name: 'currentLoc',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '当前所在位置(省/市/区)不能为空'
		},
		{
			name: 'currentLocDetail',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '居住地址(街道门牌号或小区楼号)不能为空'
		},
		{
			name: 'todayTemperature',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '当日体温(摄氏度)不能为空'
		},
		{
			name: 'mobile',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '手机号不能为空'
		},
	],
	// 设备异常维修
	inspectionAdd:[
		{
			name: 'devicePos',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '设备编号不能为空'
		},
		{
			name: 'requesttor',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '提报人不能为空'
		},
		{
			name: 'requestDate',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '提报时间不能为空'
		},
		{
			name: 'deviceExceptPhenom',
			checkType: 'notnull',
			checkRule: '',
			errorMsg: '故障现象不能为空'
		},
	]
};
