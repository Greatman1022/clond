var editorLocalStorage = {
	name: '',
	judge(key) {
		if (window.localStorage) {

		} else {
			alert("浏览暂不支持localStorage")
		}
	},
	set(key, value = '') {
		var _this = this
		if(this.name == ''){
			this.name = key	
		}
		localStorage.setItem(_this.name, JSON.stringify(value?value:key))
	},
	get(type, curpage, cindex, data) {
		// let val = localStorage.getItem(this.name)
		// let dataObj = JSON.parse(val)
		// console.log(data)
		// console.log(dataObj[curpage].children[cindex].items[data.name])
		// switch (type) {
		// 	case 'updateTxt':
		// 		dataObj[curpage].children[cindex].items[data.name] = data.value
		// 	case 'upSilderPicSrc':
		// 		da
		// }
		// this.set('key', dataObj)
	},
	backt() {
		return JSON.parse(localStorage.getItem(this.name))
	},
	localPages() {

	}
}
export default {
	editorLocalStorage
}