'use strict'

const OWNER_USER = 'USER'
const OWNER_BOT = 'BOT'

function getDate() {
	return new Date().toLocaleString('ru-RU', {
		hour: 'numeric', minute: 'numeric', second: 'numeric'
	})
}

Vue.use(Vuebar);

var vm = new Vue({
	el: '#app',
	data: {
		title: 'Изичат',
		expanded: true,
		question: null,
		OWNER_USER,
		OWNER_BOT,
		dialogs: [
			{
				owner: OWNER_BOT,
				text: 'Привет! Ты можешь задать мне любой вопрос, не стесняйся!',
				time: getDate()
			},
		]
	},
	methods: {
		toggleChat() {
			this.expanded = !this.expanded
		},

		addDialog(dialog) {
			this.dialogs.push(dialog)
			$(window).trigger("resize.scrollBox");
		},

		sendRequest() {
			this.addDialog({
				owner: OWNER_USER,
				text: this.question,
				time: getDate()
			})

			$.post('/api/get-answer', {q: this.question}).done(resp => {
				this.addDialog({
					owner: OWNER_BOT,
					text: resp.a.trim(),
					time: getDate()
				})
			})

			this.question = null
		}
	},
	computed: {
		toggleState() {
			return this.expanded ? 'Открыть' : 'Закрыть'
		}
	}
})