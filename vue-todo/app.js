var list = [
	{
		title: "First task",
		isChecked:false
	},
	{
		title: "Second task",
		isChecked:true
	}
];

new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		edit:"",    //记录正在编辑的数据
		beforeTitle:""
	},
	computed:{
		noChecklength:function(){
			return this.list.filter(function(item){
				return !item.isChecked;
			}).length
		}
	},
	methods:{
		/*addTodo:function() {
			// add task

		}*/
		addTodo(ev){// add task
			this.list.push({
				title:this.todo,
				isChecked:false
			});
			this.todo = "";
		},
		deleteTodo(todo){//delete task
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		},
		editTodo(todo){//edit task
			this.beforeTitle = todo.title
			this.edit = todo;
		},
		editTodoed(todo){ //编辑任务成功
			this.edit = "";
		},
		cancelTodo(todo){//取消编辑任务
			todo.title = this.beforeTitle;
			this.edit = "";
		}

	},
	directives:{
		focus:{
			update(el,binding){
				if (binding.value) {
					el.focus();
				}
			}
		}
	}
});