<template>
  <div id="app">
    <div class="picker">
      <section class="picker__input">
        <emoji-picker @picked="onEmojiPicked" />
      </section>
      <section class="picker__preview">
        <transition-group name="emoji" v-if="emojies.length" tag="div" key="have">
          <span class="picker__preview__emoji" v-for="(emoji, index) in emojies" :key="emoji.key" @click="onRemoveEmoji(index)">{{ emoji.emoji }}</span>
        </transition-group>
      </section>
      <transition name="none-emojies" mode="out-in">
        <el-button type="text" size="large" v-if="emojies.length" v-clipboard="emojiesString" @success="copySuccess" @error="copyError" key="true">Copy All</el-button>
        <el-button type="text" size="large" disabled v-else key="false">Select at least one</el-button>
      </transition>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import EmojiPicker from './components/EmojiPicker'
  import { Notification } from 'element-ui';

  export default {
    name: 'app',
    data() {
      return {
        emojies: []
      }
    },

    computed: {
      emojiesString() {
        return this.emojies.map(emoji => emoji.emoji).join('');
      }
    },

    methods: {
      onEmojiPicked(emoji) {
        console.log(emoji)
        this.emojies.push({
          emoji,
          key: this.emojies.length + "_" + emoji
        })
      },
      copySuccess(e) {
        Notification.success({
          title: 'Copied!',
          message: e.text + ' in your clipboard!'
        })

        console.log(e)
      },
      copyError(e) {
        Notification.error({
          title: 'Copy is failed',
          message: e
        })

        console.log(e)
      },
      onRemoveEmoji(index) {
        this.emojies.splice(index, 1)
      },
      randomIndex() {
        return Math.floor(Math.random() * this.emojies.length)
      },
      removeRandom() {
        this.onRemoveEmoji(this.randomIndex())
      },
    },
    components: {
      'emoji-picker': EmojiPicker
    }
  }
</script>

<style lang="css">
  html,
  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 32px;
    line-height: 1.55em;
  }
  
  #app {
    background-color: #97d4de;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .picker {
    width: 100%;
    min-height: 14rem;
    max-width: 21rem;
    background-color: white;
    padding: 1.2rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .picker__input {
    margin-bottom: 1rem;
  }
  
  .picker__preview {
    position: relative;
    font-size: 2rem;
    line-height: 1.5em;
    text-align: center;
    margin-bottom: 1rem;
    flex-grow: 1;
  }
  
  .picker__preview__none {
    color: #99A9BF;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
  }
  
  .picker__preview__emoji {
    cursor: pointer;
    position: relative;
    display: inline-block;
    border: 1px solid transparent;
    padding: 0.2rem;
    min-width: 2.8rem;
    z-index: 0;
  }
  
  .picker__preview__emoji:hover {
    border: 1px solid #C0CCDA;
    z-index: 1;
  }
  
  .picker__preview__emoji::after {
    content: "remove";
    display: none;
    position: absolute;
    background-color: #FF4949;
    border: 1px solid #FF4949;
    color: white;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
  }
  
  .picker__preview__emoji:hover::after {
    display: block;
  }
  
  .picker {
    background: white;
    box-shadow: /* inset 0 7em 10em -5em rgba(255,255,255,0.6), */
    0 0.3em 0.5em -0.2em rgba(47, 131, 189, 1), /* 1 */
    0 1em 2em -0.75em rgba(47, 131, 189, 0.75), /* 2 */
    0 1em 3em -0.5em rgba(47, 131, 189, 0.5), /* 3 */
    0 3em 3em -0.25em rgba(47, 131, 189, 0.2);
    /* 4 */
  }
    
  .none-emojies-enter-active,
  .none-emojies-leave-active,
  .emoji-enter-active,
  .emoji-leave-active {
    transition: all 0.4s ease;
  }
  
  .none-emojies-enter,
  .none-emojies-leave-to,
  .emoji-enter,
  .emoji-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>