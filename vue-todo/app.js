//存取localStorage中的数据
var storage = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

/*var list = [
	{
		title: "First task",
		isChecked:false
	},
	{
		title: "Second task",
		isChecked:true
	}
];*/
var filter = {
				all:function(list){
					return list;
				},
				finished:function(list){
					return list.filter(function(item){
						return item.isChecked;
					})
				},
				unfinished:function(list){
					return list.filter(function(item){
						return !item.isChecked;
					})
				}
			}

var list = storage.fetch("maiduo");

var vm = new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		edit:"",    //记录正在编辑的数据
		beforeTitle:"",
		visibility: 'all'
	},
	computed:{
		noChecklength:function(){
			return this.list.filter(function(item){
				return !item.isChecked;
			}).length
		},
		filterList:function(){
			return filter[this.visibility] ? filter[this.visibility](list) : list;
		}
	},
	watch:{
		/*list:function(){
			storage.save("maiduo",this.list);
		}*/
		list:{
			handler:function(){
				storage.save("maiduo",this.list);
			},
			deep:true
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

function watchHashChange(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
}
watchHashChange();
window.addEventListener("hashchange",watchHashChange);