<template>
	<nav class="pagination" role="navigation" aria-label="pagination">
		  <a class="pagination-previous" :disabled="current_page === 1" @click="getPage(current_page - 1)">Previous</a>
		  <a class="pagination-next" :disabled="current_page === pages" @click="getPage(current_page + 1)">Next page</a>
		  <ul class="pagination-list">
		    <li>
		      <a class="pagination-link" aria-label="Goto page 1" :class="{'is-current': (1 === current_page) }" @click="getPage(1)">1</a>
		    </li>
		    <li v-if="renderPages.length && 2 < renderPages[0]">
		      <span class="pagination-ellipsis">&hellip;</span>
		    </li>
		    <li v-for="page in renderPages" :key="'page-' + page">
		      <a class="pagination-link" aria-label="Goto page" :class="{'is-current': (page === current_page) }" @click="getPage(page)">{{ page }}</a>
		    </li>
		    <li v-if="pages > renderPages[renderPages.length - 1] + 1">
		      <span class="pagination-ellipsis">&hellip;</span>
		    </li>
		    <li v-if="pages > 1">
		      <a class="pagination-link" aria-label="Goto page" :class="{'is-current': (pages === current_page) }" @click="getPage(pages)">{{ pages }}</a>
		    </li>
		  </ul>
		</nav>
</template>

<script>
	export default {
    	name: 'paginator',
    	props: ['pages', 'current_page'],
    	computed: {
    		renderPages(){
    			let pages = [];
		    	for (var i = this.current_page - 1; i <= this.current_page + 1; i++) {
		    		if (i > 1 && i < this.pages){
		    			pages.push(i);
		    		}
		    	}
		    	return pages
    		}
    	},
    	methods: {
    		getPage(page){
    			this.$emit("getPage", page);
    			this.$router.push({query: {page}})
    		}
    	}
  	}
</script>

<style>
	
</style>