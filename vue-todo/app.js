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
		todo:""
	},
	methods:{
		/*addTodo:function() {
			// add task

		}*/
		addTodo(ev){
			//es6
			// add task
			this.list.push({
				title:this.todo,
				isChecked:false
			});
			this.todo = "";
		},
		deleteTodo(todo){
			//delete task
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		}
	}
});