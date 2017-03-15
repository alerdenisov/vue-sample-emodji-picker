<template>
  <el-autocomplete 
    class="emoji-picker__input"
    v-model="rawText"
    :fetch-suggestions="findEmoji"
    custom-item='suggestion-item'
    placeholder="Type to search.."
    icon="search"
    popper-class="emoji-suggestion"
    @select="handleSelect"
    size="large" />
</template>
<script>
  import EmojiLib from 'emojilib'
  import { Search } from 'js-search'
  import Vue from 'vue'

  
  Vue.component('suggestion-item', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('span', { attrs: { class: 'emoji-suggestion__icon' } }, [item.value]),
        h('span', { attrs: { class: 'emoji-suggestion__key' } }, [item.id])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });

  export default {
    name: 'emoji-picker',

    data() {
      return {
        rawText: ''
      }
    },

    computed: {
      search() {
        return this.createSearch(EmojiLib.lib)
      }
    },

    methods: {
      handleSelect(suggestion) {
        this.$emit('picked', suggestion.value)
        this.rawText = '';
      },
      createSearch(library) {
        const search = new Search('id')
        search.addIndex('keywords')
        search.addIndex('category')
        search.addIndex('id')
        search.addDocuments(Object.keys(library).map(key => {
          return {
            id: key,
            value: library[key].char,
            keywords: library[key].keywords,
            category: library[key].category
          }
        }));

        return search;
      },

      findEmoji(inputString, cb) {
        const result = this.search.search(inputString)
        cb(result)
      }
    }
  }    
</script>

<style lang="css">
  .emoji-picker__input { width: 100% }
  .emoji-suggestion__icon { margin-right: 0.2em; }
</style>