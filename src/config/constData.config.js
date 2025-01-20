export default {
	// app应用名称
	appName: '优安通',

	// 验证码发送间隔
	sendCodeTime: 60,

	//应用
	appTitle: [{
			text: "任务待办管理",
			icon: 'iconzongjie'
		},
		// {
		// 	text: "疫情专栏",
		// 	icon: 'iconrizhi'
		// },
		{
			text: "设备保养检查",
			icon: 'iconfenxiaozhongxin'
		},
		{
			text: "消防器材检查",
			icon: 'iconicon-test21'
		},
		{
			text: "应急物资检查",
			icon: 'iconfenxiaozhongxin'
		},
		{
			text: "隐患排查",
			icon: 'iconliebiaoqiehuan'
		},
		{
			text: "特殊作业",
			icon: 'iconzongjie'
		},
		{
			text: "供应商作业",
			icon: 'iconrizhi'
		},
		{
			text: "教育培训",
			icon: 'iconfenlei'
		},
		// {
		// 	text: "风险研判",
		// 	icon: 'iconyingyong'
		// },
		{
			text: "设备管理",
			icon: 'iconyingyong'
		},
		{
			text: "人员管理",
			icon: 'icon-renyuanguanli'
		},
		{
			text: "会议签到",
			icon: 'iconricheng'
		},
		{
			text: "外来登记",
			icon: 'icon-wailaidengji'
		},
		{
			text: "明厨亮灶",
			icon: 'icon-wailaidengji'
		}
		// {
		// 	text: "三维地图",
		// 	icon: 'iconyingyong'
		// },
	],
	shortcuts: {
		任务待办管理: [{
				title: '待办审批',
				icon: 'sic-daibanshenpi',
				url: '/pages/special_work/workApproval/index',
				product: 'all'
			},
			{
				title: '已发任务',
				icon: 'sic-yifarenwu',
				url: '/pages/special_work/eventSubmited/index',
				product: 'all'
			},
			{
				title: '已办任务',
				icon: 'sic-yibanrenwu',
				url: '/pages/special_work/eventDone/index',
				product: 'all'
			},
			{
				title: '办结任务',
				icon: 'sic-banjierenwu',
				url: '/pages/special_work/eventFinished/index',
				product: 'all'
			},
		],
		设备保养检查: [
			// {
			// 	title: '设备巡检计划',
			// 	icon: 'icontuandui',
			// 	url: '/pages/intelligent_patrol/searchTask/index' + '?type=device',
			// 	product: 'pm_pm_site_check_std_device_view'
			// },
			// {
			// 	title: '设备扫码',
			// 	icon: 'iconziliaoguanli',
			// 	url: '/pages/intelligent_patrol/scanning/index',
			// 	product: 'pm_pm_device_check_record_view'
			// },
			{
				title: '设备检查任务',
				icon: 'sic-jiancharenwu',
				url: '/pages/intelligent_patrol/currentTask/indexCheck',
				product: 'pm_pm_device_check_record_view'
			},
			{
				title: '设备保养任务',
				icon: 'sic-shebeibaoyang',
				url: '/pages/intelligent_patrol/currentTask/indexMaintain',
				product: 'pm_pm_device_mtn_record_view'
			},
			{
				title: '设备保养记录',
				icon: 'sic-baoyangjilu',
				url: '/pages/intelligent_patrol/maintainRecord/index',
				product: 'pm_pm_device_mtn_record_view'
			},
			{
				title: '设备检查记录',
				icon: 'sic-jianchajilu',
				url: '/pages/intelligent_patrol/scanningRecord/index',
				product: 'pm_pm_device_check_record_view'
			},
			{
				title: '设备异常维修',
				icon: 'sic-yichangweixiu',
				url: '/pages/intelligent_patrol/inspection/index',
				product: 'pm_pm_device_exception_fix_view'
			},
			// {
			// 	title: '处理异常',
			// 	icon: 'iconqia',
			// 	url: '/pages/intelligent_patrol/processError/index'
			// },
			// {
			// 	title: '风险点巡检计划',
			// 	icon: 'iconanquan',
			// 	url: '/pages/intelligent_patrol/riskPointCheck/index'
			// },
			// {
			// 	title: '应急物资扫码',
			// 	icon: 'iconshenpijieshu',
			// 	url: '/pages/intelligent_patrol/riskScanning/index',
			// 	product: 'pm_pm_emergency_material_check_record_view'
			// },
			// {
			// 	title: '应急物资巡检记录',
			// 	icon: 'iconguizhangzhidu',
			// 	url: '/pages/intelligent_patrol/riskPointRecord/index',
			// 	product: 'pm_pm_emergency_material_check_record_view'
			// },
			// {
			// 	title: '应急物资巡检计划',
			// 	icon: 'iconricheng',
			// 	url: '/pages/intelligent_patrol/emergencyCheck/index'
			// },
		],
		消防器材检查: [{
				title: '消防检查任务',
				icon: 'sic-xiaofangjiancharenwu',
				url: '/pages/fire_manage/currentTask/index',
				product: 'pm_pm_fire_check_record_view'
			},
			{
				title: '消防检查记录',
				icon: 'sic-xiaofangjianchajilu',
				url: '/pages/fire_manage/scanningRecord/index',
				product: 'all'
			},
			{
				title: '消防检查计划',
				icon: 'sic-xiaofangjianchajihua',
				url: '/pages/fire_manage/checkPlan/index',
				product: 'pm_pm_fire_check_plan_view'
			},
			// {
			// 	title: '消防器材异常维修',
			// 	icon: 'icon-a-38-xiaofangqicaiyichangweixiu',
			// 	url: '/pages/fire_manage/inspection/index',
			// 	product: 'all'
			// },
		],
		应急物资检查: [{
				title: '物资检查任务',
				icon: 'sic-wuzijiancharenwu',
				url: '/pages/emergency_material/currentTask/index',
				product: 'pm_pm_emergency_material_check_record_view'
			},
			{
				title: '物资检查记录',
				icon: 'sic-wuzijianchajilu',
				url: '/pages/emergency_material/scanningRecord/index',
				product: 'pm_pm_emergency_material_check_plan_view'
			},
			{
				title: '物资检查计划',
				icon: 'sic-wuzijianchajihua',
				url: '/pages/emergency_material/checkPlan/index',
				product: 'pm_pm_emergency_material_check_plan_view'
			},
			// {
			// 	title: '应急物资异常维修',
			// 	icon: 'icon-a-40-yingjiwuziyichangweixiu',
			// 	url: '/pages/emergency_material/inspection/index',
			// 	product: 'pm_pm_emergency_material_check_plan_view'
			// },
		],
		隐患排查: [
			// {
			// 	title: '随手拍',
			// 	icon: 'iconicon-test21',
			// 	url: '/pages/hidden_check/handPic/index'
			// },
			{
				title: '隐患上报',
				icon: 'sic-yinhuanshangbao',
				url: '/pages/hidden_check/riskReport/index',
				product: 'pm_pm_hidden_hazard_view'
			},
			{
				title: '安全检查记录',
				icon: 'sic-anquanjianchajilu',
				url: '/pages/hidden_check/scanningRecord/index',
				product: 'pm_pm_hidden_hazard_check_list_view'
			},
			{
				title: '检查任务',
				icon: 'sic-anquanjiancharenwu',
				url: '/pages/hidden_check/safetyCheckRecord/index',
				product: 'pm_pm_hidden_hazard_check_list_view'
			},
			{
				title: '安全检查计划',
				icon: 'sic-anquanjianchajihua',
				url: '/pages/hidden_check/dangerCheckPlan/index',
				product: 'pm_pm_hidden_hazard_check_plan_view'
			},
			// {
			// 	title: '隐患排查异常维修',
			// 	icon: 'icon-a-42-yinhuanpaichayichangweixiu',
			// 	url: '/pages/hidden_check/inspection/index',
			// 	product: 'pm_pm_hidden_hazard_check_plan_view'
			// },
			// {
			// 	title: '隐患排查',
			// 	icon: 'iconshouye',
			// 	url: '/pages/hidden_check/hiddenCheck/index'
			// },
			// {
			// 	title: '隐患整改',
			// 	icon: 'iconqia',
			// 	url: '/pages/hidden_check/hiddenRectify/index'
			// },
			// {
			// 	title: '隐患绩效',
			// 	icon: 'iconxinwen',
			// 	url: '/pages/tenant/index'
			// },
		],
		特殊作业: [{
				title: '我的作业许可证',
				icon: 'sic-zuoyexukezheng',
				url: '/pages/special_work/myWork/index',
				product: 'all'
			},
			{
				title: '作业许可证查询',
				icon: 'sic-zuoyexukezhengchaxun',
				url: '/pages/special_work/workSearch/index',
				product: 'all'
			},
			{
				title: '特殊作业巡检',
				icon: 'sic-teshuzuoyexunjian',
				url: '/pages/special_work/workCheck/index',
				product: 'pm_pm_safety_work_check_content_view'
			},
			{
				title: '创建特殊作业',
				icon: 'sic-chuangjianteshuzuoye',
				url: '/pages/special_work/myWork/add/index',
				product: 'all'
			}
		],
		供应商作业: [{
				title: '作业申请',
				icon: 'sic-zuoyeshenqing',
				url: '/pages/contractor_work/workManage/index',
				product: 'all'
			},
			{
				title: '我的作业',
				icon: 'sic-wodezuoye',
				url: '/pages/contractor_work/workProcess/index',
				product: 'pm_pm_site_contractor_logist_view'
			},
		],
		疫情专栏: [{
				title: '疫苗接种',
				icon: 'icon-yimiaojiezhong',
				url: '/pages/epidemic_manage/epidemic_dose/index',
				product: 'all'
			},
			{
				title: '核酸检测',
				icon: 'icon-hesuanjiance',
				url: '/pages/epidemic_manage/epidemic_test/index',
				product: 'all'
			},
			{
				title: '核酸检测上报',
				icon: 'icon-hesuanjianceshangbao',
				url: '/pages/epidemic_manage/epidemic_test/add/epidemicTestDetail',
				product: 'all'
			},
			{
				title: '疫情外出申请',
				icon: 'icon-yiqingwaichushenqing',
				url: '/pages/epidemic_manage/epidemic_out_apply/index',
				product: 'all'
			},
			{
				title: '健康日报',
				icon: 'icon-jiankangribao',
				url: '/pages/epidemic_manage/epidemic_health_daily/index',
				product: 'all'
			}
		],
		教育培训: [{
				icon: 'sic-wodepeixun',
				url: '/pages/education_training/myTrain/index',
				title: '我的培训',
				color: '#ff6b81',
				product: 'all'
			},
			{
				icon: 'sic-zaixiankaoshi',
				url: '/pages/education_training/examination/index',
				title: '在线考试',
				color: '#ff6b81',
				product: 'all'
			},
			{
				icon: 'sic-zaixianxuexi',
				url: '/pages/education_training/study/index',
				title: '在线学习',
				color: '#ff6b81',
				product: 'all'
			},
			{
				icon: 'sic-wodeziliao',
				url: '/pages/education_training/trainingMaterial/index',
				title: '我的资料',
				color: '#ff6b81',
				product: 'all'
			},
			{
				icon: 'sic-anquanjiancharenwu',
				url: '/pages/education_training/digitalTransformationAssessment/index',
				title: '数字化转型考核',
				color: '#ff6b81',
				product: 'all'
			},
		],
		// 风险研判: [
		// 	// {
		// 	// 	icon: 'iconjiabanshixiang',
		// 	// 	url: '/pages/risk_judgment/news/index',
		// 	// 	title: '最新公告',
		// 	// 	color: '#ff6b81'
		// 	// },
		// 	{
		// 		icon: 'iconziyuan208',
		// 		url: '/pages/risk_judgment/promise/index',
		// 		title: '班组安全承诺',
		// 		color: '#ff6b81'
		// 	},
		// 	{
		// 		icon: 'iconricheng',
		// 		url: '/pages/risk_judgment/workshopSummary/index',
		// 		title: '班组汇总车间',
		// 		color: '#ff6b81'
		// 	},
		// 	{
		// 		icon: 'iconshenpijieshu',
		// 		url: '/pages/risk_judgment/companySummary/index',
		// 		title: '车间汇总公司',
		// 		color: '#ff6b81'
		// 	},
		// ],
		设备管理: [{
			icon: 'sic-shebeixinxiguanli',
			url: '/pages/device_management/deviceInfo/index',
			title: '设备信息管理',
			color: '#ff6b81',
			product: 'pm_pm_basic_device_view'
		}],
		人员管理: [{
				icon: 'sic-renyuanxinxi',
				url: '/pages/person_management/personManage/index',
				title: '人员信息',
				color: '#ff6b81',
				product: 'pm_pm_basic_emplyee_view'
			},
			{
				icon: 'sic-xiangguanfang',
				url: '/pages/person_management/contractor/index',
				title: '相关方',
				color: '#ff6b81',
				product: 'pm_pm_site_contractor_view'
			},
			{
				icon: 'sic-xiangguanfangrenyuan',
				url: '/pages/person_management/outPeople/index',
				title: '相关方人员',
				color: '#ff6b81',
				product: 'pm_pm_site_contractor_worker_view'
			},
		],
		会议签到: [{
			icon: 'sic-huiyiqiandao',
			url: '/pages/sign_meetings/index',
			title: '会议签到',
			color: '#ff6b81',
			product: 'pm_pm_rule_meeting_regular_view'
		}],
		外来登记: [{
				icon: 'sic-wailairenyuandengji',
				url: '/pages/external_registration/RegistrationPerson/index',
				title: '外来人员登记',
				color: '#ff6b81',
				product: 'all'
			},
			{
				icon: 'sic-wailaicheliangdengji',
				url: '/pages/external_registration/RegistrationCar/index',
				title: '外来车辆登记',
				color: '#ff6b81',
				product: 'all'
			},
			{
				icon: 'sic-wailaidengjizonglan',
				url: '/pages/external_registration/index',
				title: '外来登记总览',
				color: '#ff6b81',
				product: 'all'
			},
		],
		明厨亮灶: [{
				icon: 'sic-jinricaidan',
				url: '/pages/bright_kitchen/menu/index',
				title: '今日菜单',
				color: '#ff6b81',
				product: 'ml_ml_menu_his_view'
			},
			{
				icon: 'sic-wenshidujiance',
				url: '/pages/bright_kitchen/temperature/index',
				title: '温湿度监测',
				color: '#ff6b81',
				product: 'ml_ml_monitor_env_view'
			}
		]
		// 三维地图: [{		
		// 	icon: 'iconquyudaili',
		// 	url: '/pages/tabs/works/repair/index',
		// 	title: '三维地图',
		// 	color: '#ff6b81',
		// }]
	},
	// 应用 - 权限管理
	adminList: [{
			title: '设备巡检计划',
			icon: 'icontuandui',
			url: '/pages/admin/user/index'
		},
		{
			title: '区域巡检计划',
			icon: 'iconfenlei3',
			url: '/pages/admin/menu/index'
		},
		{
			title: '设备区域扫码',
			icon: 'iconziliaoguanli',
			url: '/pages/admin/role/index'
		},
		{
			title: '巡检记录',
			icon: 'icongongzuoliucheng01',
			url: '/pages/admin/dept/index'
		},
		{
			title: '巡检异常',
			icon: 'iconxiatubiao--copy',
			url: '/pages/admin/tenant/index'
		},
		{
			title: '处理异常',
			icon: 'iconxiatubiao--copy',
			url: '/pages/admin/tenant/index'
		},
		{
			title: '风险点扫码',
			icon: 'iconxiatubiao--copy',
			url: '/pages/admin/tenant/index'
		},
		{
			title: '风险点巡检计划',
			icon: 'iconxiatubiao--copy',
			url: '/pages/admin/tenant/index'
		},
		{
			title: '风险点巡检记录',
			icon: 'iconxiatubiao--copy',
			url: '/pages/admin/tenant/index'
		},
		{
			title: '应急物资巡检计划',
			icon: 'iconxiatubiao--copy',
			url: '/pages/admin/tenant/index'
		},
	],
	// 应用 - 系统管理
	systemList: [{
			title: '日志管理',
			icon: 'iconicon-test21',
			url: '/pages/system/user/index'
		},
		{
			title: '字典管理',
			icon: 'iconguizhangzhidu',
			url: '/pages/menu/index'
		},
		{
			title: '文件管理',
			icon: 'iconqianbao',
			url: '/pages/role/index'
		},
		{
			title: '参数管理',
			icon: 'iconshouye',
			url: '/pages/dept/index'
		},
		{
			title: 'Quartz管理',
			icon: 'iconqia',
			url: '/pages/tenant/index'
		},
		{
			title: '终端管理',
			icon: 'iconxinwen',
			url: '/pages/tenant/index'
		},
		{
			title: '密钥管理',
			icon: 'iconjianpanshuru',
			url: '/pages/tenant/index'
		},
		{
			title: '令牌管理',
			icon: 'iconanquan',
			url: '/pages/tenant/index'
		},
		{
			title: '动态路由',
			icon: 'iconquyudaili',
			url: '/pages/tenant/index'
		}
	],
	// 应用 - 开发平台（数据源管理、代码生成、表当设计、表单管理）
	genList: [{
			title: '数据源管理',
			icon: 'icontuiguangzhuanqian',
			url: '/pages/user/index'
		},
		{
			title: '代码生成',
			icon: 'iconmimazhongzhi',
			url: '/pages/menu/index'
		},
		{
			title: '表当设计',
			icon: 'iconrili',
			url: '/pages/role/index'
		},
		{
			title: '表单管理',
			icon: 'iconricheng',
			url: '/pages/dept/index'
		}
	],

	// 设置-设置中心
	setList: [{
		title: '个人资料',
		url: '/pages/user/userinfo/userinfo',
		content: ''
	},
	// {
	// 	title: '找回密码',
	// 	url: '/pages/public/password?type=1',
	// 	content: ''
	// },
	{
		title: '导出记录',
		url: '/pages/public/passwordEdit',
		content: ''
	}, {
		title: '导入模板',
		url: '/pages/public/passwordEdit',
		content: ''
	}, {
		title: '导入供货商',
		url: '/pages/public/passwordEdit',
		content: ''
	},
	{
		title: '修改密码',
		url: '/pages/public/passwordEdit',
		content: ''
	}, {
		title: '日志管理',
		url: '/pages/public/passwordEdit',
		content: ''
	},
	{
		title: '关于我们',
		url: '/pages/set/about/about',
		content: '',
		class: 'mT'
	},
],

	//应用中心-工作流
	worksList: [{
			icon: 'iconbaoxiu',
			url: '/pages/tabs/works/repair/index',
			title: '报修',
			color: '#ff6b81'
		},
		{
			icon: 'iconbangongyongpin',
			url: '/pages/tabs/works/repair/index',
			title: '申领',
			color: '#ff6b81'
		},
		{
			icon: 'icongoumai',
			url: '/pages/tabs/works/repair/index',
			title: '申购',
			color: '#ff6b81'
		},
		{
			icon: 'iconcheliang',
			url: '/pages/tabs/works/repair/index',
			title: '用车',
			color: '#ff6b81'
		},
		{
			icon: 'iconjiabanshixiang',
			url: '/pages/tabs/works/overtime/index',
			title: '加班',
			color: '#ff6b81'
		},
		{
			icon: 'iconziyuan208',
			url: '/pages/tabs/works/repair/index',
			title: '出差',
			color: '#ff6b81'
		},
		{
			icon: 'iconricheng',
			url: '/pages/tabs/works/repair/index',
			title: '请假',
			color: '#ff6b81'
		},
		{
			icon: 'iconshenpijieshu',
			url: '/pages/tabs/works/repair/index',
			title: '报销',
			color: '#ff6b81'
		},
	],
	// 我的-个人中心
	mycenterList: [{
			title: '我的日志',
			icon: 'sic-woderizhi',
			url: '/pages/mycenter/log/index',
			num: null
		},
		{
			title: '我的日程',
			icon: 'sic-wodericheng',
			url: '/pages/mycenter/calendar/index',
			num: null
		},
		{
			title: '我的总结',
			icon: 'sic-wodezongjie',
			url: '/pages/mycenter/summary/index',
			num: null
		}
	],
	// 日常应用
	manageSectionList: [{
			icon: 'iconzichan',
			url: '',
			title: '资产',
			color: '#ff6b81'
		},
		{
			icon: 'iconcheliang',
			url: '',
			title: '车辆',
			color: '#ff6b81'
		},
		{
			icon: 'icondangan',
			url: '',
			title: '档案',
			color: '#ff6b81'
		},
		{
			icon: 'iconyuangong',
			url: '',
			title: '员工',
			color: '#ff6b81'
		},
		{
			icon: 'iconhetong',
			url: '',
			title: '合同',
			color: '#ff6b81'
		},
		{
			icon: 'iconjiangcheng',
			url: '',
			title: '奖惩',
			color: '#ff6b81'
		},
		{
			icon: 'iconshebao',
			url: '',
			title: '社保',
			color: '#ff6b81'
		},


	],
	// 其他应用
	otherSectionList: [{
			title: '就餐',
			icon: 'iconcanyin',
			url: '',
			color: '#ff6b81'
		},
		{
			title: '采购',
			icon: 'icongoumai1',
			url: '',
			color: '#ff6b81'
		},
		{
			title: '巡更',
			icon: 'iconxungeng',
			url: '',
			color: '#ff6b81'
		},
		{
			icon: 'iconkaoqin',
			url: '/pages/attend/plan',
			title: '考勤',
			color: '#ff6b81'
		},
		{
			title: '通讯录',
			icon: 'icontongxunlu',
			url: '',
			color: '#ff6b81'
		},
	],
	// 消息类型 1:公告;2:提醒;3:私信
	notifyTypeList: [{
			type: 0,
			content: ''
		},
		{
			type: 1,
			content: '公告'
		},
		{
			type: 2,
			content: '提醒'
		},
		{
			type: 3,
			content: '私信'
		}
	],
	// 主题列表
	themeList: [{
			title: '官方',
			name: 'rf',
			color: '#fa436a',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/notify-cl.png',
				'/static/tab/cate-cl.png',
				'/static/tab/my-cl.png'
			]
		},
		{
			title: '嫣红',
			name: 'red',
			color: '#e54d42',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '桔橙',
			name: 'orange',
			color: '#f37b1d',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '明黄',
			name: 'yellow',
			color: '#fbbd08',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '橄榄',
			name: 'olive',
			color: '#8dc63f',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '森绿',
			name: 'green',
			color: '#39b54a',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '天青',
			name: 'cyan',
			color: '#1cbbb4',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '海蓝',
			name: 'blue',
			color: '#0081ff',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '姹紫',
			name: 'purple',
			color: '#6739b6',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '木槿',
			name: 'mauve',
			color: '#9c26b0',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '桃粉',
			name: 'pink',
			color: '#e03997',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '棕褐',
			name: 'brown',
			color: '#a5673f',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '玄灰',
			name: 'grey',
			color: '#8799a3',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '草灰',
			name: 'gray',
			color: '#aaaaaa',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		},
		{
			title: '墨黑',
			name: 'black',
			color: '#333333',
			tabList: [
				'/static/tab/sic-home-cl.png',
				'/static/tab/sic-notify-cl.png',
				'/static/tab/sic-cate-cl.png',
				'/static/tab/sic-my-cl.png'
			]
		}
	],

};
