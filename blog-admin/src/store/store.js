export var store = {
    debug: true,
    state: {   /*需要管理的状态*/
        count: 0,
        id: '',
		preRouter:''
    },
	setNewPreRouter(newVal){
		this.state.preRouter=newVal
	},
    setNewCount(newVal) {   /*修改状态的方法*/
        this.state.count = newVal;
    },
    setNewId(newVal) {    /*修改状态的方法*/
        this.state.id = newVal;
		console.log('store set new id:'+this.state.id)
    }
}